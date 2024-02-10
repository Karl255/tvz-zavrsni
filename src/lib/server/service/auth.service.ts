import type { User } from "$lib/model/user.model";
import { createUser, getUsersByEmailAndPasswordHash } from "$lib/server/repo/user.repo";
import { createJwt } from "$lib/util/jwt.util";

const { createHash } = await import("node:crypto");

function hashAsHex(password: string): string {
	return createHash("sha3-512").update(password).digest("hex");
}

// TODO: get from env
const secret = new Uint8Array([...atob("4XOj3bFVrVrZrCVC4HkQyV++43VUP7rxMgOKJ2ku630xNy3nWqMGCVyQK+lKcQb/xyLVXClzrz7G8AmdaC5G1A==")].map((x) => x.charCodeAt(0)));

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

export async function createToken(userId: number): Promise<string> {
	return await createJwt({ userId }, "HS512", secret);
}
