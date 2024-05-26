import { Tag } from "$lib/model/tag.model";
import { tagRepo } from "$lib/server/repo/tag.repo";
import { createJsonResponse, createNoContentResponse, createValidationErrorResponse, getRequiredParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	const Payload = Tag.omit({ id: true, userId: true }).partial();

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	await tagRepo.update(locals.userId, getRequiredParam(params, "name"), parsing.data.name ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await tagRepo.delete(locals.userId, getRequiredParam(params, "name"));

	return createNoContentResponse();
};
