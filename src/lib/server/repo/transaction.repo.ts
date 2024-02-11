import type { Transaction } from "$lib/model/transaction.model";
import { sql } from "$lib/server/query";

export const transactionRepo = {
	create: async (userId: number, amount: number, description: string): Promise<Transaction> => {
		const transactions = await sql<Transaction[]>`
			INSERT INTO transaction (amount, description, userId)
			VALUES (${amount}, ${description}, ${userId})
		`;

		console.info(`Created transaction "${transactions[0].id}" for user ${userId}`);

		return transactions[0];
	},

	getAll: async (userId: number): Promise<Transaction[]> => {
		return await sql<Transaction[]>`
			SELECT id, amount, description, userId
			FROM transaction
			WHERE userId = ${userId}
		`;
	},

	getOne: async (userId: number, transactionId: number): Promise<Transaction | null> => {
		const transactions = await sql<Transaction[]>`
			SELECT id, amount, description, userId
			FROM transaction
			WHERE userId = ${userId} AND id = ${transactionId}
		`;

		return transactions[0] ?? null;
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
		await sql`
			DELETE transaction
			WHERE userId = ${userId} AND id = ${transactionId}
		`;

		console.info(`Deleted transaction ${transactionId}`);
	},
};
