import type { User } from "$lib/model/user.model";
import { sql } from "$lib/server/query";

export const userRepo = {
	getOneByEmailAndPasswordHash: async (email: string, passwordHash: string): Promise<User | null> => {
		const users = await sql<User[]>`
			SELECT id, email
			FROM "user"
			WHERE email = ${email} AND passwordHash = ${passwordHash}
		`;

		return users[0] ?? null;
	},

	getOneByEmail: async (email: string): Promise<User | null> => {
		const users = await sql<User[]>`
			SELECT id, email
			FROM "user"
			WHERE email = ${email}
		`;

		return users[0] ?? null;
	},

	create: async (email: string, passwordHash: string): Promise<User> => {
		const users = await sql<User[]>`
			INSERT INTO "user" (email, passwordHash)
			VALUES (${email}, ${passwordHash})
			RETURNING id, email
		`;

		console.info(`Created ${users.length} users with email ${email}`);

		return users[0];
	},
};
