import type { Transaction, TransactionWithLabels } from "$lib/model/transaction.model";
import { sql } from "$lib/server/query";
import { accountRepo } from "./account.repo";

interface JoinedTransaction extends Transaction {
	labelId: number | null;
	labelName: string | null;
}

function transformWithJoinedLabels(records: JoinedTransaction[], userId: number): TransactionWithLabels[] {
	const transactionIds = records.map((jt) => jt.id);

	const transactions = transactionIds.map<TransactionWithLabels>((transactionId) => {
		const relevantRecords = records.filter((jt) => jt.id === transactionId);
		console.log(relevantRecords);

		return {
			id: transactionId,
			amount: relevantRecords[0].amount,
			description: relevantRecords[0].description,
			accountId: relevantRecords[0].accountId,
			labels: relevantRecords
				.filter((record) => !!record.labelId)
				.map((record) => ({
					id: record.labelId as number,
					name: record.labelName as string,
					userId,
				})),
		};
	});

	return transactions;
}

export const transactionRepo = {
	create: async (userId: number, accountId: number, amount: number, description: string): Promise<Transaction | null> => {
		const account = accountRepo.getOne(userId, accountId);

		if (!account) {
			return null;
		}

		const transactions = await sql<Transaction[]>`
			INSERT INTO transaction (amount, description, account_id)
			VALUES (${amount}, ${description}, ${accountId})
			RETURNING id, amount, description, account_id
		`;

		console.info(`Created transaction "${transactions[0].id}" for user ${userId}`);

		return transactions[0];
	},

	getAll: async (userId: number, accountId: number | null): Promise<TransactionWithLabels[]> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT t.id, t.amount, t.description, l.id AS labelId, l.name AS label_name, a.id AS account_id
			FROM transaction t
			LEFT JOIN transaction_label tl ON t.id = tl.transaction_id
			LEFT JOIN label l ON tl.label_id = l.id
			JOIN account a ON t.account_id = a.id
			WHERE a.user_id = ${userId}
				AND (l.user_id = ${userId} OR l.user_id IS NULL)
				${accountId ? sql`AND t.account_id = ${accountId}` : sql``}
		`;

		console.log(records);

		return transformWithJoinedLabels(records, userId);
	},

	getOne: async (userId: number, transactionId: number): Promise<TransactionWithLabels | null> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT id, amount, description, user_id
			FROM transaction t
			JOIN transaction_label tl ON t.id = tl.transaction_id
			JOIN label l ON tl.label_id = l.id
			WHERE user_id = ${userId} AND id = ${transactionId}
		`;

		return transformWithJoinedLabels(records, userId)[0] ?? null;
	},

	update: async (userId: number, transactionId: number, amount: number | null, description: string | null): Promise<void> => {
		await sql`
			UPDATE transaction
			SET amount = COALESCE(${amount}, amount), description = COALESCE(${description}, description)
			WHERE user_id = ${userId} AND id = ${transactionId}
		`;

		console.info(`Updated transaction ${transactionId}`);
	},

	delete: async (userId: number, transactionId: number): Promise<void> => {
		// TODO: cascade?
		await sql`
			DELETE FROM transaction
			WHERE user_id = ${userId} AND id = ${transactionId}
		`;

		console.info(`Deleted transaction ${transactionId}`);
	},
};
