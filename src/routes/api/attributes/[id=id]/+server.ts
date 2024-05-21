import { Attribute } from "$lib/model/attribute.model";
import { attributeRepo } from "$lib/server/repo/attribute.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const attribute = await attributeRepo.getOne(locals.userId, getIdParam(params));
	return attribute ? createJsonResponse(attribute) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	const Payload = Attribute.omit({ id: true, userId: true }).partial();

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	await attributeRepo.update(locals.userId, getIdParam(params), parsing.data.name ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await attributeRepo.delete(locals.userId, getIdParam(params));

	return createNoContentResponse();
};
