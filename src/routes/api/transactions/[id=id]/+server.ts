import type { Transaction } from "$lib/model/transaction.model";
import { transactionRepo } from "$lib/server/repo/transaction.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, getIdParam } from "$lib/util/api.util";
import type { NoId } from "$lib/util/rest.util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "$hooks.server";

export const GET: RequestHandler = async ({ locals, params }) => {
	const transaction = await transactionRepo.getOne(getUserId(locals), getIdParam(params));
	return transaction ? createJsonResponse(transaction) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	type Payload = Partial<NoId<Transaction>>;

	const payload: Payload = await request.json();
	await transactionRepo.update(getUserId(locals), getIdParam(params), payload.amount ?? null, payload.description ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await transactionRepo.delete(getUserId(locals), getIdParam(params));

	return createNoContentResponse();
};
