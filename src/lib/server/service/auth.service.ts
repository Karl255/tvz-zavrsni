import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants";
import type { AuthError } from "$lib/model/authError.model";
import type { User } from "$lib/model/user.model";
import { userRepo } from "$lib/server/repo/user.repo";
import { getSecondsSinceEpoch } from "$lib/util/time.util";
import * as jose from "jose";

const { createHash } = await import("node:crypto");

function hashAsHex(password: string): string {
	return createHash("sha3-512").update(password).digest("hex");
}

const secret = new Uint8Array(
	[
		...atob(
			process.env.JWT_SECRET ??
				((): never => {
					throw Error("");
				})(),
		),
	].map((x) => x.charCodeAt(0)),
);

const TOKEN_LIFETIME_SECONDS = 24 * 60 * 60; // 24h

export interface AuthTokenPayload extends jose.JWTPayload {
	userId: number;
	exp: number;
}

export async function attemptLogin(email: string, password: string): Promise<User | AuthError> {
	const passwordHash = hashAsHex(password);
	const userEntity = await userRepo.getOneByEmail(email);

	if (userEntity) {
		if (userEntity.passwordHash === passwordHash) {
			return {
				id: userEntity.id,
				email: userEntity.email,
			} satisfies User;
		} else {
			return {
				message: "Wrong password",
				field: "password",
			} satisfies AuthError;
		}
	} else {
		return {
			message: "No account with this email exists",
			field: "email",
		} satisfies AuthError;
	}
}

export async function registerUser(email: string, password: string): Promise<User | null> {
	const passwordHash = hashAsHex(password);
	const existingUser = await userRepo.getOneByEmail(email);

	if (existingUser) {
		return null;
	} else {
		return await userRepo.create(email, passwordHash);
	}
}

export async function createToken(userId: number): Promise<string> {
	const exp = getSecondsSinceEpoch() + TOKEN_LIFETIME_SECONDS;

	return await createAuthToken({ userId, exp }, "HS512", secret);
}

async function createAuthToken(payload: AuthTokenPayload, alg: string, secret: Uint8Array) {
	return await new jose.SignJWT(payload).setProtectedHeader({ alg }).sign(secret);
}

export async function verifyAuthToken(token: string): Promise<jose.JWTVerifyResult<AuthTokenPayload> | null> {
	try {
		const verificationResult = await jose.jwtVerify<AuthTokenPayload>(token, secret);
		const now = getSecondsSinceEpoch();

		if (now > verificationResult.payload.exp) {
			console.info(`JWT token expired ${token}`);
			return null;
		}

		return verificationResult;
	} catch (error) {
		console.warn(`JWT verification failed for token ${token}`);
		return null;
	}
}

export function createAuthHeaders(token: string): Headers {
	const headers = new Headers();
	headers.set("Set-Cookie", `${AUTH_TOKEN_COOKIE_NAME}=${token}; Path=/; Secure`);
	return headers;
}
