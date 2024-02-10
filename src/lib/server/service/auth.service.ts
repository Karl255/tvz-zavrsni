import type { User } from "$lib/model/user.model";
import { createUser, getUsersByEmailAndPasswordHash } from "$lib/server/repo/user.repo";

const { createHash } = await import("node:crypto");

function hashAsHex(password: string): string {
	return createHash("sha3-512").update(password).digest("hex");
}

export async function attemptLogin(email: string, password: string): Promise<User | null> {
	const passwordHash = hashAsHex(password);
	const users = await getUsersByEmailAndPasswordHash(email, passwordHash);

	if (users.length > 0) {
		return users[0];
	} else {
		return null;
	}
}

export async function registerUser(email: string, password: string): Promise<User | null> {
	const passwordHash = hashAsHex(password);
	const users = await getUsersByEmailAndPasswordHash(email, passwordHash);

	if (users.length === 0) {
		return await createUser(email, passwordHash);
	} else {
		return null;
	}
}
