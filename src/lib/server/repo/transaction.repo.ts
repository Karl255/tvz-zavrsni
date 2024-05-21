import type { Tag } from "$lib/model/tag.model";
import type { IsoDate, Transaction, DetailedTransaction } from "$lib/model/transaction.model";
import { sql } from "$lib/server/sql";
import { accountRepo } from "./account.repo";

interface JoinedTransaction extends Transaction {
	tagId: number | null;
	tagName: string | null;
	attributeId: number | null;
	attributeName: string | null;
	attributeValue: string | null;
}

function transformWithJoinedTags(rows: JoinedTransaction[], userId: number): DetailedTransaction[] {
	const transactionIds = [...new Set(rows.map((jt) => jt.id))];

	const transactions = transactionIds.map<DetailedTransaction>((transactionId) => {
		const transactionRows = rows.filter((jt) => jt.id === transactionId);

		return {
			id: transactionId,
			amount: transactionRows[0].amount,
			description: transactionRows[0].description,
			date: transactionRows[0].date,
			accountId: transactionRows[0].accountId,
			tags: extractTags(transactionRows),
			attributes: extractAttributes(transactionRows),
		};
	});

	return transactions;

	function extractTags(transactionRows: JoinedTransaction[]): Tag[] {
		return transactionRows
			.filter((row) => row.tagId && row.tagName)
			.map((row) => ({
				id: row.tagId as number,
				name: row.tagName as string,
				userId,
			}));
	}

	function extractAttributes(transactionRows: JoinedTransaction[]): Record<string, string> {
		const attributePairs = transactionRows
			.filter((row) => row.attributeName && row.attributeValue)
			.map((row) => <const>[row.attributeName as string, row.attributeValue as string]);

		return Object.fromEntries(attributePairs);
	}
}

export const transactionRepo = {
	create: async (userId: number, accountId: number, amount: number, description: string, date: IsoDate): Promise<Transaction | null> => {
		const account = accountRepo.getOne(userId, accountId);

		if (!account) {
			return null;
		}

		const transactions = await sql<Transaction[]>`
			INSERT INTO transaction (amount, description, date, account_id)
			VALUES (${amount}, ${description}, ${date}, ${accountId})
			RETURNING id, amount, description, to_char(date, 'YYYY-MM-DD') as date, account_id
		`;

		console.info(`Created transaction "${transactions[0].id}" for user ${userId}`);

		return transactions[0];
	},

	getAll: async (userId: number, accountId: number | null): Promise<DetailedTransaction[]> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT
				transaction.id, transaction.amount, transaction.description, to_char(transaction.date, 'YYYY-MM-DD') as date,
				tag.id AS tag_id, tag.name AS tag_name,
				attr.id AS attribute_id, attr.name AS attribute_name, attrv.value AS attribute_value,
				account.id AS account_id
			FROM transaction
			LEFT JOIN tagged ON transaction.id = tagged.transaction_id
			LEFT JOIN tag ON tagged.tag_id = tag.id
			LEFT JOIN attribute_value attrv ON transaction.id = attrv.transaction_id
			LEFT JOIN attribute attr ON attrv.attribute_id = attr.id
			JOIN account ON transaction.account_id = account.id
			WHERE account.user_id = ${userId}
				AND (tag.user_id = ${userId} OR tag.user_id IS NULL)
				AND (attr.user_id = ${userId} OR attr.user_id IS NULL)
				${accountId ? sql`AND transaction.account_id = ${accountId}` : sql``}
		`;

		return transformWithJoinedTags(records, userId);
	},

	getOne: async (userId: number, transactionId: number): Promise<DetailedTransaction | null> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT
				transaction.id, transaction.amount, transaction.description, to_char(transaction.date, 'YYYY-MM-DD') as date,
				tag.id AS tag_id, tag.name AS tag_name,
				attr.id AS attribute_id, attr.name AS attribute_name, attrv.value AS attribute_value,
				account.id AS account_id
			FROM transaction
			LEFT JOIN tagged ON transaction.id = tagged.transaction_id
			LEFT JOIN tag ON tagged.tag_id = tag.id
			LEFT JOIN attribute_value attrv ON transaction.id = attrv.transaction_id
			LEFT JOIN attribute attr ON attrv.attribute_id = attr.id
			JOIN account ON transaction.account_id = account.id
			WHERE account.user_id = ${userId} AND transaction.id = ${transactionId}
		`;

		return transformWithJoinedTags(records, userId)[0] ?? null;
	},

	update: async (userId: number, transactionId: number, amount: number | null, description: string | null, date: IsoDate | null): Promise<void> => {
		await sql`
			UPDATE transaction
			SET
				amount = COALESCE(${amount}, amount),
				description = COALESCE(${description}, description),
				date = COALESCE(${date}, date)
			WHERE id IN (
				SELECT t.id
				FROM transaction t
				JOIN account a ON t.account_id = a.id
				WHERE t.id = ${transactionId} AND a.user_id = ${userId}
			);
		`;

		console.info(`Updated transaction ${transactionId}`);
	},

	delete: async (userId: number, transactionId: number): Promise<void> => {
		await sql`
			DELETE FROM tagged
			WHERE transaction_id = ${transactionId}
		`;

		await sql`
			DELETE FROM transaction
			WHERE id IN (
				SELECT t.id
				FROM transaction t
				JOIN account a ON t.account_id = a.id
				WHERE t.id = ${transactionId} AND a.user_id = ${userId}
			);
		`;

		console.info(`Deleted transaction ${transactionId}`);
	},
};
