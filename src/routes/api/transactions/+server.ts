import { DetailedTransaction } from "$lib/model/transaction.model";
import { transactionRepo } from "$lib/server/repo/transaction.repo";
import { createJsonResponse, createUnauthorizedResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
	const accountId = url.searchParams.get("accountId");

	return createJsonResponse(await transactionRepo.getAll(locals.userId, accountId ? parseInt(accountId, 10) : null));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const Payload = DetailedTransaction.omit({ id: true });

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const transaction = await transactionRepo.create(
		locals.userId,
		parsing.data.accountId,
		parsing.data.amount,
		parsing.data.description,
		parsing.data.date,
		parsing.data.importedId,
		parsing.data.tags,
		parsing.data.attributes,
	);

	return transaction ? createJsonResponse(transaction) : createUnauthorizedResponse();
};
