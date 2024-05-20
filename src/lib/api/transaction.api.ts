import type { IsoDate, Transaction, TransactionWithLabels } from "$lib/model/transaction.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/transactions");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class TransactionApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll(accountId?: number) {
		return (await (await this.httpClient.get(endpoint, { accountId })).json()) as TransactionWithLabels[];
	}

	async create(accountId: number, amount: number, description: string, date: IsoDate) {
		return await this.httpClient.post(endpoint, { accountId, amount, description, date });
	}

	async update(transactionId: number, newAmount: number, newDescription: string, newDate: IsoDate) {
		const payload: Partial<Transaction> = {
			amount: newAmount,
			description: newDescription,
			date: newDate,
		};

		return await this.httpClient.patch(idEndpoint(transactionId), payload);
	}

	async delete(transactionId: number) {
		return await this.httpClient.delete(idEndpoint(transactionId), {});
	}
}
