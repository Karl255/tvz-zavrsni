import type { AuthError } from "$lib/model/AuthError.model";
import type { User } from "$lib/model/user.model";
import { attemptLogin, createAuthHeaders, createToken, registerUser } from "$lib/server/service/auth.service";
import { validateEmail, validatePassword } from "$lib/service/validation.service";
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

	const userOrError = await attemptLogin(params.email, params.password);

	if ((userOrError as User).email) {
		const user = userOrError as User;
		const token = await createToken(user.id);
		const headers = createAuthHeaders(token);

		return createJsonResponse({ user }, { headers });
	} else {
		const error = userOrError as AuthError;
		return createJsonResponse(error, 400);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const requiredFields: (keyof RegisterRequest)[] = ["email", "password"];
	const payload = parseFromPartial<RegisterRequest>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	if (!validateEmail(payload.email) || validatePassword(payload.password)) {
		return createJsonResponse({ message: "Invalid email or password" }, 400);
	}

	const createdUser = await registerUser(payload.email, payload.password);

	if (createdUser) {
		const token = await createToken(createdUser.id);
		const headers = createAuthHeaders(token);

		return createJsonResponse({ user: createdUser }, { headers });
	} else {
		return createJsonResponse({ message: "This email is already in use" }, 400);
	}
};
