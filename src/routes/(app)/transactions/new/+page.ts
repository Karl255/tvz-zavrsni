import { AccountApi } from "$lib/api/account.api";
import { AttributeApi } from "$lib/api/attribute.api";
import { TagApi } from "$lib/api/tag.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const accountApi = new AccountApi(fetch);
	const tagApi = new TagApi(fetch);
	const attributeApi = new AttributeApi(fetch);

	return {
		accounts: await accountApi.getAll(),
		avaialbleTags: await tagApi.getAll(),
		availableAttributes: await attributeApi.getAll(),
	};
};
