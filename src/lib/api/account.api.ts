import type { Account, AccountType } from "$lib/model/account.model";
import { httpClient } from "./httpClient";

const endpoint = "/api/accounts";
const _idEndpoint = (id: number) => `${endpoint}/${id}`;

export const accountApi = {
	getAll: async () => (await (await httpClient.get(endpoint, {})).json()) as Account[],
	create: async (name: string, type: AccountType) => (await (await httpClient.post(endpoint, { name, type })).json()) as Account,
};
