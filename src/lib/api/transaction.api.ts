import type { Transaction, TransactionWithLabels } from "$lib/model/transaction.model";
import { httpClient } from "./httpClient";

const endpoint = "/api/transactions";
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export const transactionApi = {
	getAll: async (accountId?: number) => (await (await httpClient.get(endpoint, { accountId })).json()) as TransactionWithLabels[],

	create: async (accountId: number, amount: number, description: string) => await httpClient.post(endpoint, { accountId, amount, description }),

	update: async (transactionId: number, newAmount: number, newDescription: string) => {
		const payload: Partial<Transaction> = {
			amount: newAmount,
			description: newDescription,
		};

		return await httpClient.patch(idEndpoint(transactionId), payload);
	},

	delete: async (transactionId: number) => await httpClient.delete(idEndpoint(transactionId), {}),
};
