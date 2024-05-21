import { userRepo } from "$lib/server/repo/user.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createValidationErrorResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

export const PATCH: RequestHandler = async ({ request, params }) => {
	const Payload = z.object({ isAdmin: z.boolean() }).partial();

	const parsing = Payload.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const user = await userRepo.update(getIdParam(params), parsing.data.isAdmin ?? null);

	return user ? createJsonResponse(user) : createNotFoundResponse();
};

export const DELETE: RequestHandler = async ({ params }) => {
	await userRepo.delete(getIdParam(params));

	return createNoContentResponse();
};
