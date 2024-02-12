import { accountApi } from "$lib/api/account.api";
import { transactionApi } from "$lib/api/transaction.api";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async () => {
	return {
		transactions: await transactionApi.getAll(),
		accounts: await accountApi.getAll(),
	};
};
