import type { Transaction } from "$lib/model/transaction.model";
import { transactionRepo } from "$lib/server/repo/transaction.repo";
import { createJsonResponse, createRequiredFieldsResponse } from "$lib/util/api.util";
import type { Field, NoId } from "$lib/util/rest.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "../../../hooks.server";

export const GET: RequestHandler = async ({ locals }) => {
	return createJsonResponse(await transactionRepo.getAll(getUserId(locals)));
};

export const POST: RequestHandler = async ({ request, locals }) => {
	type Payload = NoId<Transaction>;
	const requiredFields: Field<Payload>[] = ["amount", "description"];

	const payload = parseFromPartial<Payload>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const account = await transactionRepo.create(getUserId(locals), payload.amount, payload.description);

	return createJsonResponse(account);
};
