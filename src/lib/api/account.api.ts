import type { Account, AccountType } from "$lib/model/account.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/accounts");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class AccountApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll() {
		return (await (await this.httpClient.get(endpoint, {})).json()) as Account[];
	}

	async getOne(accountId: number) {
		return (await (await this.httpClient.get(idEndpoint(accountId), {})).json()) as Account;
	}

	async create(name: string, type: AccountType) {
		return (await (await this.httpClient.post(endpoint, { name, type })).json()) as Account;
	}
}
