import { Tag } from "$lib/model/tag.model";
import { tagRepo } from "$lib/server/repo/tag.repo";
import { createJsonResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await tagRepo.getAll(locals.userId));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const Payload = Tag.omit({ id: true, userId: true });

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const account = await tagRepo.create(locals.userId, parsing.data.name);

	return createJsonResponse(account);
};
