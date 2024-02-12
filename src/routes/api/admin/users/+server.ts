import { userRepo } from "$lib/server/repo/user.repo";
import { createJsonResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
	const users = await userRepo.getAll();

	return createJsonResponse(users);
};
