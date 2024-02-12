import { getLocals } from "$hooks.server";
import type { Transaction } from "$lib/model/transaction.model";
import { transactionRepo } from "$lib/server/repo/transaction.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, getIdParam } from "$lib/util/api.util";
import type { NoId } from "$lib/util/rest.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const transaction = await transactionRepo.getOne(getLocals(locals).userId, getIdParam(params));
	return transaction ? createJsonResponse(transaction) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	type Payload = Partial<NoId<Transaction>>;

	const payload: Payload = await request.json();
	await transactionRepo.update(getLocals(locals).userId, getIdParam(params), payload.amount ?? null, payload.description ?? null, payload.date ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await transactionRepo.delete(getLocals(locals).userId, getIdParam(params));

	return createNoContentResponse();
};
