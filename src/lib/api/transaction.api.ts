import type { TransactionWithLabels } from "$lib/model/transaction.model";
import { httpClient } from "./httpClient";

const endpoint = "/api/transactions";
const _idEndpoint = (id: number) => `${endpoint}/${id}`;

export const transactionApi = {
	getAll: async (accountId?: number) => (await (await httpClient.get(endpoint, { accountId })).json()) as TransactionWithLabels[],
};
