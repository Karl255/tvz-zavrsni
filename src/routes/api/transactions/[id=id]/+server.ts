import { DetailedTransaction } from "$lib/model/transaction.model";
import { transactionRepo } from "$lib/server/repo/transaction.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const transaction = await transactionRepo.getOne(locals.userId, getIdParam(params));
	return transaction ? createJsonResponse(transaction) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	const parsing = DetailedTransaction.partial().safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}
	await transactionRepo.update(
		locals.userId,
		getIdParam(params),
		parsing.data.amount ?? null,
		parsing.data.description ?? null,
		parsing.data.date ?? null,
		parsing.data.tags ?? null,
		parsing.data.attributes ?? null,
	);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await transactionRepo.delete(locals.userId, getIdParam(params));

	return createNoContentResponse();
};
