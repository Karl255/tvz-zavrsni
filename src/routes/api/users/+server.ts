import type { AuthError } from "$lib/model/authError.model";
import type { User } from "$lib/model/user.model";
import { attemptLogin, createAuthHeaders, createToken, registerUser } from "$lib/server/service/auth.service";
import { validateEmail, validatePassword } from "$lib/service/validation.service";
import { createJsonResponse, createValidationErrorResponse, searchParamsToObject } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const LoginQueryParams = z.object({
	email: z.string(),
	password: z.string(),
});

type LoginQueryParams = z.infer<typeof LoginQueryParams>;

const RegisterRequest = z.object({
	email: z.string(),
	password: z.string(),
});

type RegisterRequest = z.infer<typeof RegisterRequest>;

export const GET: RequestHandler<Partial<LoginQueryParams>> = async ({ url }) => {
	const parsing = LoginQueryParams.safeParse(searchParamsToObject<LoginQueryParams>(url.searchParams));

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const userOrError = await attemptLogin(parsing.data.email, parsing.data.password);

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
	const parsing = RegisterRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	if (!validateEmail(parsing.data.email) || !validatePassword(parsing.data.password)) {
		return createJsonResponse({ message: "Invalid email or password" }, 400);
	}

	const createdUser = await registerUser(parsing.data.email, parsing.data.password);

	if (createdUser) {
		const token = await createToken(createdUser.id);
		const headers = createAuthHeaders(token);

		return createJsonResponse({ user: createdUser }, { headers });
	} else {
		return createJsonResponse({ message: "This email is already in use" }, 400);
	}
};
