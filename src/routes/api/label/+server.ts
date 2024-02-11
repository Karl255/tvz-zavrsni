import type { Label } from "$lib/model/label.model";
import { labelRepo } from "$lib/server/repo/label.repo";
import { createJsonResponse, createRequiredFieldsResponse } from "$lib/util/api.util";
import type { Field, NoId } from "$lib/util/rest.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "../../../hooks.server";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await labelRepo.getAll(getUserId(locals)));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	type Payload = NoId<Label>;
	const requiredFields: Field<Payload>[] = ["name"];

	const payload = parseFromPartial<Payload>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const account = await labelRepo.create(getUserId(locals), payload.name);

	return createJsonResponse(account);
};
