import { attributeValueRepo } from "$lib/server/repo/attribute-value.repo";
import { createJsonResponse, createValidationErrorResponse } from "$lib/util/api.util";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const AttributeValueRequest = z.object({
	transactionId: z.number(),
	attributes: z.record(z.string(), z.string()),
});

export const PUT: RequestHandler = async ({ request, locals }) => {
	const parsing = AttributeValueRequest.safeParse(await request.json());

	if (!parsing.success) {
		return createValidationErrorResponse(parsing.error);
	}

	const [toAdd, toRemove] = separateAttributes(parsing.data.attributes);

	const added = await attributeValueRepo.createMany(locals.userId, parsing.data.transactionId, toAdd);
	const removed = await attributeValueRepo.deleteMany(locals.userId, parsing.data.transactionId, Object.keys(toRemove));

	return createJsonResponse(null, added && removed ? 204 : 400);
};

function separateAttributes(attributes: Record<string, string>): [Record<string, string>, Record<string, "">] {
	const new_: Record<string, string> = {};
	const removed: Record<string, ""> = {};

	Object.entries(attributes).forEach(([name, value]) => {
		if (value === "") {
			removed[name] = "";
		} else {
			new_[name] = value;
		}
	});

	return [new_, removed];
}
