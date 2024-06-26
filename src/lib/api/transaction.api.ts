import type { IsoDate, DetailedTransaction } from "$lib/model/transaction.model";
import type { NoId } from "$lib/util/type.util";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/transactions");
const importEndpoint = endpoint + "/import";
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class TransactionApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll(accountId?: number) {
		return (await (await this.httpClient.get(endpoint, { accountId })).json()) as DetailedTransaction[];
	}

	async create(accountId: number, amount: number, description: string, date: IsoDate, importedId: string | null, tags: string[], attributes: Record<string, string>) {
		return await this.httpClient.post(endpoint, { accountId, amount, description, date, importedId, tags, attributes });
	}

	async update(
		transactionId: number,
		newAmount: number,
		newDescription: string,
		newDate: IsoDate,
		newImportedId: string | null | undefined,
		newTags: string[],
		newAttributes: Record<string, string>,
	) {
		const payload: Partial<DetailedTransaction> = {
			amount: newAmount,
			description: newDescription,
			date: newDate,
			importedId: newImportedId,
			tags: newTags,
			attributes: newAttributes,
		};

		return await this.httpClient.patch(idEndpoint(transactionId), payload);
	}

	async delete(transactionId: number) {
		return await this.httpClient.delete(idEndpoint(transactionId), {});
	}

	async import(transactions: NoId<DetailedTransaction>[]) {
		return await this.httpClient.post(importEndpoint, transactions);
	}
}
