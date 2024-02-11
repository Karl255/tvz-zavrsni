import type { Label } from "$lib/model/label.model";
import { labelRepo } from "$lib/server/repo/label.repo";
import { createJsonResponse, createNoContentResponse, createNotFoundResponse, getIdParam } from "$lib/util/api.util";
import type { NoId } from "$lib/util/rest.util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "../../../../hooks.server";

export const GET: RequestHandler = async ({ locals, params }) => {
	const label = await labelRepo.getOne(getUserId(locals), getIdParam(params));
	return label ? createJsonResponse(label) : createNotFoundResponse();
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	type Payload = Partial<NoId<Label>>;

	const payload: Payload = await request.json();
	await labelRepo.update(getUserId(locals), getIdParam(params), payload.name ?? null);

	return createJsonResponse({});
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await labelRepo.delete(getUserId(locals), getIdParam(params));

	return createNoContentResponse();
};
