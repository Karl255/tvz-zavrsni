import { AccountApi } from "$lib/api/account.api";
import { LabelApi } from "$lib/api/label.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const accountApi = new AccountApi(fetch);
	const labelApi = new LabelApi(fetch);

	return {
		accounts: await accountApi.getAll(),
		labels: await labelApi.getAll(),
	};
};
