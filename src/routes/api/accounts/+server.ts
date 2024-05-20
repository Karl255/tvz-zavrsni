import type { Account } from "$lib/model/account.model";
import { accountRepo } from "$lib/server/repo/account.repo";
import { createJsonResponse, createRequiredFieldsResponse } from "$lib/util/api.util";
import type { Field, NoId } from "$lib/util/rest.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await accountRepo.getAll(locals.userId));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	type Payload = NoId<Account>;
	const requiredFields: Field<Payload>[] = ["name", "type"];

	const payload = parseFromPartial<Payload>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const account = await accountRepo.create(locals.userId, payload.name, payload.type);

	return createJsonResponse(account);
};
