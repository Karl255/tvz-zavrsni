import { AccountApi } from "$lib/api/account.api";
import { TransactionApi } from "$lib/api/transaction.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const accountApi = new AccountApi(fetch);
	const transactionApi = new TransactionApi(fetch);

	return {
		transactions: await transactionApi.getAll(),
		accounts: await accountApi.getAll(),
	};
};
