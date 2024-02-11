import { accountApi } from "$lib/api/account.api";
import { transactionApi } from "$lib/api/transaction.api";
import { getIdParam } from "$lib/util/api.util";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const accountId = getIdParam(params);

	return {
		account: await accountApi.getOne(accountId),
		transactions: await transactionApi.getAll(accountId),
	};
};
