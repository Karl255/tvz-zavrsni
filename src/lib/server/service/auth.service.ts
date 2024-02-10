import type { User } from "$lib/model/user.model";
import { createUser, getUsersByEmailAndPasswordHash } from "$lib/server/repo/user.repo";
import * as jose from "jose";

const { createHash } = await import("node:crypto");

function hashAsHex(password: string): string {
	return createHash("sha3-512").update(password).digest("hex");
}

// TODO: get from env
const secret = new Uint8Array([...atob("4XOj3bFVrVrZrCVC4HkQyV++43VUP7rxMgOKJ2ku630xNy3nWqMGCVyQK+lKcQb/xyLVXClzrz7G8AmdaC5G1A==")].map((x) => x.charCodeAt(0)));

export const AUTH_TOKEN_NAME = "authToken";

export interface AuthTokenPayload extends jose.JWTPayload {
	userId: number;
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

export async function createToken(userId: number): Promise<string> {
	// TODO: add expiration
	return await createAuthToken({ userId }, "HS512", secret);
}

export async function createAuthToken(payload: AuthTokenPayload, alg: string, secret: Uint8Array) {
	return await new jose.SignJWT(payload).setProtectedHeader({ alg }).sign(secret);
}

export async function verifyAuthToken(token: string): Promise<jose.JWTVerifyResult<AuthTokenPayload> | null> {
	try {
		return await jose.jwtVerify<AuthTokenPayload>(token, secret);
	} catch (error) {
		console.warn(`JWT verification failed for token ${token}`);
		return null;
	}
}

export function createAuthHeaders(token: string): Headers {
	const headers = new Headers();
	headers.set("Set-Cookie", `${AUTH_TOKEN_NAME}=${token}; Path=/; Secure`);
	return headers;
}
