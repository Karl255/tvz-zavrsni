import { createJsonResponse, searchParamsHasAll } from "$lib/utils/api.utils";
import type { RequestHandler } from "@sveltejs/kit";

interface LoginQueryParams {
	email: string;
	password: string;
}

interface RegisterRequest {
	email: string;
	password: string;
}

export const GET: RequestHandler<Partial<LoginQueryParams>> = ({ url }) => {
	const requiredParams: (keyof LoginQueryParams)[] = ["email", "password"];

	if (!searchParamsHasAll(url.searchParams, requiredParams)) {
		const message = "Required query params: " + requiredParams.join(", ");
		return createJsonResponse({ message }, 400);
	}

	// TODO #4: login logic
	const loginSuccess = true;

	if (loginSuccess) {
		return createJsonResponse({ message: "TODO #4" });
	} else {
		return createJsonResponse({ message: "Invalid credentials" }, 400);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const requiredFields: (keyof RegisterRequest)[] = ["email", "password"];

	const body = (await request.json()) as Partial<RegisterRequest>;

	if (!requiredFields.every((prop) => !!body[prop])) {
		const message = "Required fields in body: " + requiredFields.join(", ");
		return createJsonResponse({ message }, 400);
	}

	const registerSuccess = true;

	if (registerSuccess) {
		return createJsonResponse({ message: "TODO #3" });
	} else {
		return createJsonResponse({ message: "Email is already registered" }, 400);
	}
};
