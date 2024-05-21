import { AccountApi } from "$lib/api/account.api";
import { TagApi } from "$lib/api/tag.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const accountApi = new AccountApi(fetch);
	const tagApi = new TagApi(fetch);

	return {
		accounts: await accountApi.getAll(),
		tags: await tagApi.getAll(),
	};
};
