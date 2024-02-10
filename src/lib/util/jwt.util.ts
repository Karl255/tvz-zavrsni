import * as jose from "jose";

export async function createJwt(payload: jose.JWTPayload, alg: string, secret: Uint8Array) {
	return await new jose.SignJWT(payload).setProtectedHeader({ alg }).sign(secret);
}

// decode with
// await jose.jwtVerify(token, secret)
