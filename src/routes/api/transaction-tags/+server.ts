import { transactionTagRepo } from "$lib/server/repo/transactionTag.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const TransactionTagRequest = z.object({
	transactionId: z.number(),
	tagId: z.number(),
});

export const POST: RequestHandler = async ({ request, locals }) => {
	const parsing = TransactionTagRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await transactionTagRepo.create(locals.userId, parsing.data.transactionId, parsing.data.tagId);

	return createJsonResponse(success);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const parsing = TransactionTagRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await transactionTagRepo.delete(locals.userId, parsing.data.transactionId, parsing.data.tagId);

	return success ? createNoContentResponse() : createNotFoundResponse();
};
