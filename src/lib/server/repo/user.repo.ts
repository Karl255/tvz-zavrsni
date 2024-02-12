import type { User, UserEntity } from "$lib/model/user.model";
import { sql } from "$lib/server/query";

export const userRepo = {
	getOneByEmail: async (email: string): Promise<UserEntity | null> => {
		const users = await sql<UserEntity[]>`
			SELECT id, email, password_hash, is_admin
			FROM "user"
			WHERE email = ${email}
		`;

		return users[0] ?? null;
	},

	create: async (email: string, passwordHash: string): Promise<User> => {
		const users = await sql<User[]>`
			INSERT INTO "user" (email, password_hash, is_admin)
			VALUES (${email}, ${passwordHash}, FALSE)
			RETURNING id, email, is_admin
		`;

		console.info(`Created ${users.length} users with email ${email}`);

		return users[0];
	},
};
