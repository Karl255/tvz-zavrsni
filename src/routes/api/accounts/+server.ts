import { Account } from "$lib/model/account.model";
import { accountRepo } from "$lib/server/repo/account.repo";
import { createJsonResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await accountRepo.getAll(locals.userId));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const Payload = Account.omit({ id: true, userId: true });

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const account = await accountRepo.create(locals.userId, parsing.data.name, parsing.data.type);

	return createJsonResponse(account);
};
