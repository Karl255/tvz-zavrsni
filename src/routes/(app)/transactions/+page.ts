import { AccountApi } from "$lib/api/account.api";
import { AttributeApi } from "$lib/api/attribute.api";
import { TagApi } from "$lib/api/tag.api";
import { TransactionApi } from "$lib/api/transaction.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const accountApi = new AccountApi(fetch);
	const transactionApi = new TransactionApi(fetch);
	const tagApi = new TagApi(fetch);
	const attributeApi = new AttributeApi(fetch);

	return {
		transactions: await transactionApi.getAll(),
		accounts: await accountApi.getAll(),
		availableTags: await tagApi.getAll(),
		availableAttributes: (await attributeApi.getAll()).map((attribute) => attribute.name),
	};
};
