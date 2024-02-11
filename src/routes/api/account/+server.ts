import { createJsonResponse, createRequiredFieldsResponse } from "$lib/util/api.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "../../../hooks.server";
import { accountRepo } from "$lib/server/repo/account.repo";
import type { Account } from "$lib/model/account.model";
import type { NoId, Field } from "$lib/util/rest.util";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(accountRepo.getAll(getUserId(locals)));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	type Payload = NoId<Account>;
	const requiredFields: Field<Payload>[] = ["name", "type"];

	const payload = parseFromPartial<Payload>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const account = await accountRepo.create(getUserId(locals), payload.name, payload.type);

	return createJsonResponse(account);
};
