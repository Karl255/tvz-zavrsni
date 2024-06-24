import { TransactionApi } from "$lib/api/transaction.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const transactionApi = new TransactionApi(fetch);

	return {
		transactions: await transactionApi.getAll(),
	};
};
