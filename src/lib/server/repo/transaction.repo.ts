import type { IsoDate, Transaction, TransactionWithTags } from "$lib/model/transaction.model";
import { sql } from "$lib/server/sql";
import { accountRepo } from "./account.repo";

interface JoinedTransaction extends Transaction {
	tagId: number | null;
	tagName: string | null;
}

function transformWithJoinedTags(records: JoinedTransaction[], userId: number): TransactionWithTags[] {
	const transactionIds = [...new Set(records.map((jt) => jt.id))];

	const transactions = transactionIds.map<TransactionWithTags>((transactionId) => {
		const transactionRecords = records.filter((jt) => jt.id === transactionId);

		return {
			id: transactionId,
			amount: transactionRecords[0].amount,
			description: transactionRecords[0].description,
			date: transactionRecords[0].date,
			accountId: transactionRecords[0].accountId,
			tags: transactionRecords
				.filter((record) => record.tagId)
				.map((record) => ({
					id: record.tagId as number,
					name: record.tagName as string,
					userId,
				})),
		};
	});

	return transactions;
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

	getAll: async (userId: number, accountId: number | null): Promise<TransactionWithTags[]> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT t.id, t.amount, t.description, to_char(t.date, 'YYYY-MM-DD') as date, l.id AS tag_id, l.name AS tag_name, a.id AS account_id
			FROM transaction t
			LEFT JOIN transaction_tag tl ON t.id = tl.transaction_id
			LEFT JOIN tag l ON tl.tag_id = l.id
			JOIN account a ON t.account_id = a.id
			WHERE a.user_id = ${userId}
				AND (l.user_id = ${userId} OR l.user_id IS NULL)
				${accountId ? sql`AND t.account_id = ${accountId}` : sql``}
		`;

		return transformWithJoinedTags(records, userId);
	},

	getOne: async (userId: number, transactionId: number): Promise<TransactionWithTags | null> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT t.id, t.amount, t.description, to_char(t.date, 'YYYY-MM-DD') as date, l.id AS tag_id, l.name AS tag_name, a.id AS account_id
			FROM transaction t
			LEFT JOIN transaction_tag tl ON t.id = tl.transaction_id
			LEFT JOIN tag l ON tl.tag_id = l.id
			JOIN account a ON t.account_id = a.id
			WHERE a.user_id = ${userId} AND t.id = ${transactionId}
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
			DELETE FROM transaction_tag
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
