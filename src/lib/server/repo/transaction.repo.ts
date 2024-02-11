import type { Transaction, TransactionWithLabels } from "$lib/model/transaction.model";
import { sql } from "$lib/server/query";

interface JoinedTransaction extends Transaction {
	labelId: number;
	labelName: string;
}

function transformWithJoinedLabels(records: JoinedTransaction[]): TransactionWithLabels[] {
	const transactionIds = records.map((jt) => jt.id);

	const transactions = transactionIds.map<TransactionWithLabels>((transactionId) => {
		const relevantRecords = records.filter((jt) => jt.id === transactionId);

		return {
			id: transactionId,
			amount: relevantRecords[0].amount,
			description: relevantRecords[0].description,
			userId: relevantRecords[0].userId,
			labels: relevantRecords.map((record) => ({
				id: record.labelId,
				name: record.labelName,
				userId: record.userId,
			})),
		};
	});

	return transactions;
}

export const transactionRepo = {
	create: async (userId: number, amount: number, description: string): Promise<Transaction> => {
		const transactions = await sql<Transaction[]>`
			INSERT INTO transaction (amount, description, userId)
			VALUES (${amount}, ${description}, ${userId})
			RETURNING id, amount, description, userId
		`;

		console.info(`Created transaction "${transactions[0].id}" for user ${userId}`);

		return transactions[0];
	},

	getAll: async (userId: number): Promise<TransactionWithLabels[]> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT t.id, t.amount, t.description, t.userId, l.id labelId, l.name labelName
			FROM transaction t
			JOIN transactionLabel tl ON t.id = tl.transactionId
			JOIN label l ON tl.labelId = l.id
			WHERE t.userId = ${userId} AND l.userId = ${userId}
		`;

		return transformWithJoinedLabels(records);
	},

	getOne: async (userId: number, transactionId: number): Promise<TransactionWithLabels | null> => {
		const records = await sql<JoinedTransaction[]>`
			SELECT id, amount, description, userId
			FROM transaction t
			JOIN transactionLabel tl ON t.id = tl.transactionId
			JOIN label l ON tl.labelId = l.id
			WHERE userId = ${userId} AND id = ${transactionId}
		`;

		return transformWithJoinedLabels(records)[0] ?? null;
	},

	update: async (userId: number, transactionId: number, amount: number | null, description: string | null): Promise<void> => {
		await sql`
			UPDATE transaction
			SET amount = COALESCE(${amount}, amount), description = COALESCE(${description}, description)
			WHERE userId = ${userId} AND id = ${transactionId}
		`;

		console.info(`Updated transaction ${transactionId}`);
	},

	delete: async (userId: number, transactionId: number): Promise<void> => {
		// TODO: cascade?
		await sql`
			DELETE FROM transaction
			WHERE userId = ${userId} AND id = ${transactionId}
		`;

		console.info(`Deleted transaction ${transactionId}`);
	},
};
