import type { IsoDate, DetailedTransaction } from "$lib/model/transaction.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/transactions");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class TransactionApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll(accountId?: number) {
		return (await (await this.httpClient.get(endpoint, { accountId })).json()) as DetailedTransaction[];
	}

	async create(accountId: number, amount: number, description: string, date: IsoDate, tags: string[], attributes: Record<string, string>) {
		return await this.httpClient.post(endpoint, { accountId, amount, description, date, tags, attributes });
	}

	async update(transactionId: number, newAmount: number, newDescription: string, newDate: IsoDate, newTags: string[], newAttributes: Record<string, string>) {
		const payload: Partial<DetailedTransaction> = {
			amount: newAmount,
			description: newDescription,
			date: newDate,
			tags: newTags,
			attributes: newAttributes,
		};

		return await this.httpClient.patch(idEndpoint(transactionId), payload);
	}

	async delete(transactionId: number) {
		return await this.httpClient.delete(idEndpoint(transactionId), {});
	}
}
