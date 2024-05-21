import { Label } from "$lib/model/label.model";
import { labelRepo } from "$lib/server/repo/label.repo";
import { createJsonResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await labelRepo.getAll(locals.userId));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const Payload = Label.omit({ id: true, userId: true });

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const account = await labelRepo.create(locals.userId, parsing.data.name);

	return createJsonResponse(account);
};
