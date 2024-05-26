import { Tag } from "$lib/model/tag.model";
import { tagRepo } from "$lib/server/repo/tag.repo";
import { createJsonResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse((await tagRepo.getAll(locals.userId)).map((tag) => tag.name));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const Payload = Tag.omit({ id: true, userId: true });

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const tag = await tagRepo.create(locals.userId, parsing.data.name);

	return tag ? createJsonResponse(tag) : createJsonResponse({ error: "Tag with given name already exists" }, 400);
};
