import type { Account, AccountType } from "$lib/model/account.model";
import { sql } from "$lib/server/query";

export const accountRepo = {
	create: async (userId: number, name: string, type: AccountType): Promise<Account> => {
		const accounts = await sql<Account[]>`
			INSERT INTO account (name, type, userId)
			VALUES (${name}, ${type}, ${userId})
			RETURNING id, name, type, userId
		`;

		console.info(`Created account "${accounts[0].id}" for user ${userId}`);

		return accounts[0];
	},

	getAll: async (userId: number): Promise<Account[]> => {
		return await sql<Account[]>`
			SELECT a.id, a.name, a.type, a.userId, SUM(COALESCE(t.amount, 0)) balance
			FROM account a
			LEFT JOIN transaction t ON a.id = t.accountId
			WHERE a.userId = ${userId}
			GROUP BY a.id, a.name, a.type, a.userId
		`;
	},

	getOne: async (userId: number, accountId: number): Promise<Account | null> => {
		const accounts = await sql<Account[]>`
			SELECT a.id, a.name, a.type, a.userId, SUM(COALESCE(t.amount, 0)) balance
			FROM account a
			LEFT JOIN transaction t ON a.id = t.accountId
			WHERE a.userId = ${userId} AND a.id = ${accountId}
			GROUP BY a.id, a.name, a.type, a.userId
		`;

		return accounts[0] ?? null;
	},

	update: async (userId: number, accountId: number, name: string | null, type: AccountType | null): Promise<Account | null> => {
		const accounts = await sql<Account[]>`
			UPDATE account
			SET name = COALESCE(${name}, name), type = COALESCE(${type}, type)
			WHERE userId = ${userId} AND id = ${accountId}
			RETURNING id, name, type, userId
		`;

		console.info(`Updated account ${accounts[0]?.id}`);

		return accounts[0] ?? null;
	},

	delete: async (userId: number, accountId: number): Promise<void> => {
		// TODO cascade?
		await sql`
			DELETE FROM account
			WHERE userId = ${userId} AND id = ${accountId}
		`;

		console.info(`Deleted account ${accountId}`);
	},
};