import { createJsonResponse, createNoContentResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "../../../../hooks.server";
import { accountRepo } from "$lib/server/repo/account.repo";
import type { Account } from "$lib/model/account.model";
import type { NoId } from "$lib/util/rest.util";

// PATCH /accounts/:id
// DELETE /accounts/:id

export const GET: RequestHandler = async ({ locals, params }) => {
	return createJsonResponse(accountRepo.getOne(getUserId(locals), getIdParam(params)));
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	type Payload = Partial<NoId<Account>>;

	const payload: Payload = await request.json();
	await accountRepo.update(getUserId(locals), getIdParam(params), payload.name ?? null, payload.type ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await accountRepo.delete(getUserId(locals), getIdParam(params));

	return createNoContentResponse();
};
