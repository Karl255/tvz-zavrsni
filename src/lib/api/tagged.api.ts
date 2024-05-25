import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/tags/tagged");

export class TaggedApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async create(transactionId: number, tagName: string) {
		return await this.httpClient.post(endpoint, { transactionId, tagName });
	}
}
