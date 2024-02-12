import { getLocals } from "$hooks.server";
import type { Account } from "$lib/model/account.model";
import { accountRepo } from "$lib/server/repo/account.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, getIdParam } from "$lib/util/api.util";
import type { NoId } from "$lib/util/rest.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const account = await accountRepo.getOne(getLocals(locals).userId, getIdParam(params));
	return account ? createJsonResponse(account) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	type Payload = Partial<NoId<Account>>;

	const payload: Payload = await request.json();
	await accountRepo.update(getLocals(locals).userId, getIdParam(params), payload.name ?? null, payload.type ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await accountRepo.delete(getLocals(locals).userId, getIdParam(params));

	return createNoContentResponse();
};
