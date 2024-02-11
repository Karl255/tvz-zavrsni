import { accountApi } from "$lib/api/account.api";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async () => {
	return {
		accounts: await accountApi.getAll(),
	};
};
