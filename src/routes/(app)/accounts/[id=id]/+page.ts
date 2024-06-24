import { AccountApi } from "$lib/api/account.api";
import { TransactionApi } from "$lib/api/transaction.api";
import { getIdParam } from "$lib/util/api.util";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	const accountApi = new AccountApi(fetch);
	const transactionApi = new TransactionApi(fetch);
	const accountId = getIdParam(params);

	return {
		account: await accountApi.getOne(accountId),
		transactions: await transactionApi.getAll(accountId),
	};
};
