import type { User } from "$lib/model/user.model";
import { sql } from "../query";

export async function getUsersByEmailAndPasswordHash(email: string, passwordHash: string) {
	return await sql<User[]>`
		SELECT id, email
		FROM "user"
		WHERE email = ${email} AND passwordHash = ${passwordHash}
	`;
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
	const users = await sql<User[]>`
		INSERT INTO "user" (email, passwordHash)
		VALUES (${email}, ${passwordHash})
		RETURNING id, email
	`;

	console.info(`Created ${users.length} users with email ${email}`);

	return users[0];
}
