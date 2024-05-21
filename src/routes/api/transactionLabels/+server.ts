import { transactionLabelRepo } from "$lib/server/repo/transactionLabel.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const TransactionLabelRequest = z.object({
	transactionId: z.number(),
	labelId: z.number(),
});

export const POST: RequestHandler = async ({ request, locals }) => {
	const parsing = TransactionLabelRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await transactionLabelRepo.create(locals.userId, parsing.data.transactionId, parsing.data.labelId);

	return createJsonResponse(success);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const parsing = TransactionLabelRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await transactionLabelRepo.delete(locals.userId, parsing.data.transactionId, parsing.data.labelId);

	return success ? createNoContentResponse() : createNotFoundResponse();
};
