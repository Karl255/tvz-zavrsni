import type { IsoDate, Transaction, DetailedTransaction } from "$lib/model/transaction.model";
import { sql } from "$lib/server/sql";
import { accountRepo } from "./account.repo";
import { attributeValueRepo } from "./attribute-value.repo";
import { taggedRepo } from "./tagged.repo";

interface JoinedTransaction extends Transaction {
	tagName: string | null;
	attributeId: number | null;
	attributeName: string | null;
	attributeValue: string | null;
}

function transformWithJoinedTags(rows: JoinedTransaction[]): DetailedTransaction[] {
	const transactionIds = [...new Set(rows.map((jt) => jt.id))];

	const transactions = transactionIds.map<DetailedTransaction>((transactionId) => {
		const transactionRows = rows.filter((jt) => jt.id === transactionId);

		return {
			id: transactionId,
			amount: transactionRows[0].amount,
			description: transactionRows[0].description,
			date: transactionRows[0].date,
			importedId: transactionRows[0].importedId,
			accountId: transactionRows[0].accountId,
			tags: extractTags(transactionRows),
			attributes: extractAttributes(transactionRows),
		};
	});

	return transactions;

	function extractTags(transactionRows: JoinedTransaction[]): string[] {
		const tags = transactionRows.map((row) => row.tagName).filter((name): name is string => !!name);

		return [...new Set(tags)];
	}

	function extractAttributes(transactionRows: JoinedTransaction[]): Record<string, string> {
		const attributePairs = transactionRows
			.filter((row) => row.attributeName && row.attributeValue)
			.map((row) => <const>[row.attributeName as string, row.attributeValue as string]);

		return Object.fromEntries(attributePairs);
	}
}

export const transactionRepo = {
	create: async (
		userId: number,
		accountId: number,
		amount: number,
		description: string,
		date: IsoDate,
		importedId: string | null,
		tags: string[],
		attributes: Record<string, string>,
	): Promise<Transaction | null> => {
		const account = accountRepo.getOne(userId, accountId);

		if (!account) {
			return null;
		}

		const transactions = await sql<Transaction[]>`
			INSERT INTO transaction (amount, description, date, imported_id, account_id)
			VALUES (${amount}, ${description}, ${date}, ${importedId}, ${accountId})
			ON CONFLICT (imported_id) DO NOTHING
			RETURNING id, amount, description, to_char(date, 'YYYY-MM-DD') as date, account_id
		`;

		await taggedRepo.setTagsForTransaction(userId, transactions[0].id, tags);
		await attributeValueRepo.setAttributesForTransaction(userId, transactions[0].id, attributes);

		console.info(`Created transaction "${transactions[0].id}" for user ${userId}`);

		return transactions[0];
	},

	createMany: async (userId: number, transactions: Omit<DetailedTransaction, "id">[]): Promise<number> => {
		let insertedCount = 0;

		for (const transaction of transactions) {
			const inserted = await transactionRepo.create(
				userId,
				transaction.accountId,
				transaction.amount,
				transaction.description,
				transaction.date,
				transaction.importedId,
				transaction.tags,
				transaction.attributes,
			);

			if (inserted) {
				insertedCount++;
			}
		}

		return insertedCount;
	},

	getAll: async (userId: number, accountId: number | null): Promise<DetailedTransaction[]> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT
				transaction.id, transaction.amount, transaction.description, to_char(transaction.date, 'YYYY-MM-DD') as date, transaction.imported_id,
				tag.name AS tag_name,
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

		return transformWithJoinedTags(records);
	},

	getOne: async (userId: number, transactionId: number): Promise<DetailedTransaction | null> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT
				transaction.id, transaction.amount, transaction.description, to_char(transaction.date, 'YYYY-MM-DD') as date, transaction.imported_id,
				tag.name AS tag_name,
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

		return transformWithJoinedTags(records)[0] ?? null;
	},

	update: async (
		userId: number,
		transactionId: number,
		amount: number | null,
		description: string | null,
		date: IsoDate | null,
		importedId: string | null | undefined,
		tags: string[] | null,
		attributes: Record<string, string> | null,
	): Promise<void> => {
		await sql`
			UPDATE transaction
			SET
				${importedId === undefined ? sql`` : sql`imported_id = ${importedId},`}
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

		if (tags) {
			await taggedRepo.setTagsForTransaction(userId, transactionId, tags);
		}

		if (attributes) {
			await attributeValueRepo.setAttributesForTransaction(userId, transactionId, attributes);
		}

		console.info(`Updated transaction ${transactionId}`);
	},

	delete: async (userId: number, transactionId: number): Promise<void> => {
		taggedRepo.deleteByTransactionId(transactionId);
		attributeValueRepo.deleteByTransactionId(transactionId);

		await sql`
			DELETE FROM transaction
			WHERE id IN (
				SELECT t.id
				FROM transaction t
				JOIN account a ON t.account_id = a.id
				WHERE t.id = ${transactionId} AND a.user_id = ${userId}
			)
		`;

		console.info(`Deleted transaction ${transactionId}`);
	},
};
