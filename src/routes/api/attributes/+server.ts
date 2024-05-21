import { Attribute } from "$lib/model/attribute.model";
import { attributeRepo } from "$lib/server/repo/attribute.repo";
import { createJsonResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await attributeRepo.getAll(locals.userId));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const Payload = Attribute.omit({ id: true, userId: true });

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const attribute = await attributeRepo.create(locals.userId, parsing.data.name);

	return attribute ? createJsonResponse(attribute) : createJsonResponse({ error: "Attribute with given name already exists" }, 400);
};
