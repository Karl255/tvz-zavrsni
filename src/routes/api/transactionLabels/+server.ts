import { createJsonResponse, createNoContentResponse, createNotFoundResponse, createRequiredFieldsResponse } from "$lib/util/api.util";
import type { Field } from "$lib/util/rest.util";
import { parsePartial as parseFromPartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserId } from "$hooks.server";
import { transactionLabelRepo } from "$lib/server/repo/transactionLabel.repo";

interface TransactionLabelRequest {
	transactionId: number;
	labelId: number;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const requiredFields: Field<TransactionLabelRequest>[] = ["transactionId", "labelId"];

	const payload = parseFromPartial<TransactionLabelRequest>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const success = await transactionLabelRepo.create(getUserId(locals), payload.transactionId, payload.labelId);

	return createJsonResponse(success);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const requiredFields: Field<TransactionLabelRequest>[] = ["transactionId", "labelId"];

	const payload = parseFromPartial<TransactionLabelRequest>(await request.json(), requiredFields);

	if (!payload) {
		return createRequiredFieldsResponse(requiredFields);
	}

	const success = await transactionLabelRepo.delete(getUserId(locals), payload.transactionId, payload.labelId);

	return success ? createNoContentResponse() : createNotFoundResponse();
};
