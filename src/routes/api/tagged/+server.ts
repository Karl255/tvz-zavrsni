import { taggedRepo } from "$lib/server/repo/tagged.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const TaggedRequest = z.object({
	transactionId: z.number(),
	tagId: z.number(),
});

export const POST: RequestHandler = async ({ request, locals }) => {
	const parsing = TaggedRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await taggedRepo.create(locals.userId, parsing.data.transactionId, parsing.data.tagId);

	return createJsonResponse(success);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const parsing = TaggedRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const success = await taggedRepo.delete(locals.userId, parsing.data.transactionId, parsing.data.tagId);

	return success ? createNoContentResponse() : createNotFoundResponse();
};
