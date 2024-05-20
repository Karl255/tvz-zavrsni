import { HttpClient } from "./httpClient";

const endpoint = "/api/transactionLabels";

export class TransactionLabelApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async create(transactionId: number, labelId: number) {
		return await this.httpClient.post(endpoint, { transactionId, labelId });
	}
}
