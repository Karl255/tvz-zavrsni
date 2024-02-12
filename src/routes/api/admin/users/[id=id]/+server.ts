import { userRepo } from "$lib/server/repo/user.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, getIdParam } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ request, params }) => {
	type Payload = Partial<{ isAdmin: boolean }>;

	const payload: Payload = await request.json();
	const user = await userRepo.update(getIdParam(params), payload.isAdmin ?? null);

	return user ? createJsonResponse(user) : createNotFoundResponse();
};

export const DELETE: RequestHandler = async ({ params }) => {
	await userRepo.delete(getIdParam(params));

	return createNoContentResponse();
};
