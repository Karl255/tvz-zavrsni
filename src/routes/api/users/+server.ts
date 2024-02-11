import { attemptLogin, createAuthHeaders, createToken, registerUser } from "$lib/server/service/auth.service";
import { createJsonResponse, createRequiredFieldsResponse, searchParamsToObject } from "$lib/util/api.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";

interface LoginQueryParams {
	email: string;
	password: string;
}

interface RegisterRequest {
	email: string;
	password: string;
}

export const GET: RequestHandler<Partial<LoginQueryParams>> = async ({ url }) => {
	const requiredParams: (keyof LoginQueryParams)[] = ["email", "password"];
	const params = parseFromPartial(searchParamsToObject<LoginQueryParams>(url.searchParams), requiredParams);

	if (!params) {
		return createRequiredFieldsResponse(requiredParams);
	}

	const user = await attemptLogin(params.email, params.password);

	if (user) {
		const token = await createToken(user.id);
		const headers = createAuthHeaders(token);

		return createJsonResponse({ user }, { headers });
	} else {
		return createJsonResponse({ message: "Invalid credentials" }, 400);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const requiredFields: (keyof RegisterRequest)[] = ["email", "password"];
	const payload = parseFromPartial<RegisterRequest>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const createdUser = await registerUser(payload.email, payload.password);

	if (createdUser) {
		const token = await createToken(createdUser.id);
		const headers = createAuthHeaders(token);

		return createJsonResponse({ user: createdUser }, { headers });
	} else {
		return createJsonResponse({ message: "Email is already registered" }, 400);
	}
};
