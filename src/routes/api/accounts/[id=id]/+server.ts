import { Account } from "$lib/model/account.model";
import { accountRepo } from "$lib/server/repo/account.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const account = await accountRepo.getOne(locals.userId, getIdParam(params));
	return account ? createJsonResponse(account) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	const Payload = Account.omit({ id: true, userId: true }).partial();

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	await accountRepo.update(locals.userId, getIdParam(params), parsing.data.name ?? null, parsing.data.type ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await accountRepo.delete(locals.userId, getIdParam(params));

	return createNoContentResponse();
};
