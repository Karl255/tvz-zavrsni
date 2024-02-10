import { attemptLogin, registerUser } from "$lib/server/service/auth.service";
import { createJsonResponse, searchParamsToObject } from "$lib/util/api.util";
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
		const message = "Required query params: " + requiredParams.join(", ");
		return createJsonResponse({ message }, 400);
	}

	const user = await attemptLogin(params.email, params.password);

	if (user) {
		return createJsonResponse({ user });
	} else {
		return createJsonResponse({ message: "Invalid credentials" }, 400);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const requiredFields: (keyof RegisterRequest)[] = ["email", "password"];
	const payload = parseFromPartial((await request.json()) as Partial<RegisterRequest>, requiredFields);

	if (!payload) {
		const message = "Required fields in body: " + requiredFields.join(", ");
		return createJsonResponse({ message }, 400);
	}

	const createdUser = await registerUser(payload.email, payload.password);

	if (createdUser) {
		return createJsonResponse({ user: createdUser });
	} else {
		return createJsonResponse({ message: "Email is already registered" }, 400);
	}
};
