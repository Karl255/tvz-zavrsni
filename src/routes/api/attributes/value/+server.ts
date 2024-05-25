import { attributeValueRepo } from "$lib/server/repo/attribute-value.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const AttributeValueRequest = z.object({
	transactionId: z.number(),
	attributeName: z.string(),
	value: z.string(),
});

export const POST: RequestHandler = async ({ request, locals }) => {
	const parsing = AttributeValueRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await attributeValueRepo.create(locals.userId, parsing.data.transactionId, parsing.data.attributeName, parsing.data.value);

	return createJsonResponse(success);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const parsing = AttributeValueRequest.omit({ value: true }).safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await attributeValueRepo.delete(locals.userId, parsing.data.transactionId, parsing.data.attributeName);

	return success ? createNoContentResponse() : createNotFoundResponse();
};
