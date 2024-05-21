import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/transaction-tags");

export class TransactionTagApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async create(transactionId: number, tagId: number) {
		return await this.httpClient.post(endpoint, { transactionId, tagId: tagId });
	}
}
