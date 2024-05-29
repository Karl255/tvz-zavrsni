import type { User, UserEntity } from "$lib/model/user.model";
import { sql } from "$lib/server/sql";

export const userRepo = {
	getAll: async (): Promise<User[]> => {
		const users = await sql<UserEntity[]>`
			SELECT id, email
			FROM "user"
		`;

		return users;
	},

	getOneByEmail: async (email: string): Promise<UserEntity | null> => {
		const users = await sql<UserEntity[]>`
			SELECT id, email, password_hash
			FROM "user"
			WHERE email = ${email}
		`;

		return users[0] ?? null;
	},

	create: async (email: string, passwordHash: string): Promise<User> => {
		const users = await sql<User[]>`
			INSERT INTO "user" (email, password_hash)
			VALUES (${email}, ${passwordHash}, FALSE)
			RETURNING id, email
		`;

		console.info(`Created ${users.length} users with email ${email}`);

		return users[0];
	},

	delete: async (userId: number): Promise<void> => {
		type Id = { id: number };
		const toNumberArray = (ids: Id[]) => ids.map(({ id }) => id);

		const accountIds = toNumberArray(await sql<Id[]>`SELECT id FROM account WHERE user_id = ${userId}`);
		const tagIds = toNumberArray(await sql<Id[]>`SELECT id FROM tag WHERE user_id = ${userId}`);

		await sql`
			DELETE FROM tagged
			WHERE tag_id IN ${sql(tagIds)}
		`;

		await sql`
			DELETE FROM tag
			WHERE id IN ${sql(tagIds)}
		`;

		await sql`
			DELETE FROM transaction
			WHERE account_id IN ${sql(accountIds)}
		`;

		await sql`
			DELETE FROM account
			WHERE id IN ${sql(accountIds)}
		`;

		await sql`
			DELETE FROM "user"
			WHERE id = ${userId}
		`;
	},
};
