import { AccountApi } from "$lib/api/account.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const accountApi = new AccountApi(fetch);

	return {
		accounts: await accountApi.getAll(),
	};
};
