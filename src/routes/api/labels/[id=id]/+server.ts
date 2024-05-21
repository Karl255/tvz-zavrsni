import { Label } from "$lib/model/label.model";
import { labelRepo } from "$lib/server/repo/label.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
	const label = await labelRepo.getOne(locals.userId, getIdParam(params));
	return label ? createJsonResponse(label) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	const Payload = Label.omit({ id: true, userId: true }).partial();

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	await labelRepo.update(locals.userId, getIdParam(params), parsing.data.name ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await labelRepo.delete(locals.userId, getIdParam(params));

	return createNoContentResponse();
};
