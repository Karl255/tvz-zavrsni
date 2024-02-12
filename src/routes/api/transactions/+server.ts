import { getLocals } from "$hooks.server";
import type { Transaction } from "$lib/model/transaction.model";
import { transactionRepo } from "$lib/server/repo/transaction.repo";
import { createJsonResponse, createRequiredFieldsResponse, createUnauthorizedResponse } from "$lib/util/api.util";
import type { Field, NoId } from "$lib/util/rest.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
	const accountId = url.searchParams.get("accountId");

	return createJsonResponse(await transactionRepo.getAll(getLocals(locals).userId, accountId ? parseInt(accountId, 10) : null));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	type Payload = NoId<Transaction>;
	const requiredFields: Field<Payload>[] = ["accountId", "amount", "description", "date"];

	const payload = parseFromPartial<Payload>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const account = await transactionRepo.create(getLocals(locals).userId, payload.accountId, payload.amount, payload.description, payload.date);

	return account ? createJsonResponse(account) : createUnauthorizedResponse();
};
