import { attributeValueRepo } from "$lib/server/repo/attribute-value.repo";
import { createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getRequiredParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const AttributeValueDelete = z.object({
	transactionId: z.number(),
});

export const DELETE: RequestHandler = async ({ request, params, locals }) => {
	const parsing = AttributeValueDelete.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await attributeValueRepo.delete(locals.userId, parsing.data.transactionId, getRequiredParam(params, "name"));

	return success ? createNoContentResponse() : createNotFoundResponse();
};
