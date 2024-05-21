import { Tag } from "$lib/model/tag.model";
import { tagRepo } from "$lib/server/repo/tag.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const tag = await tagRepo.getOne(locals.userId, getIdParam(params));
	return tag ? createJsonResponse(tag) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	const Payload = Tag.omit({ id: true, userId: true }).partial();

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	await tagRepo.update(locals.userId, getIdParam(params), parsing.data.name ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await tagRepo.delete(locals.userId, getIdParam(params));

	return createNoContentResponse();
};
