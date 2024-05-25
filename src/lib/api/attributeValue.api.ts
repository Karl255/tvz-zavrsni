import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/attributes/values");

export class AttributeValueApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async set(transactionId: number, attributes: Record<string, string>) {
		return await this.httpClient.put(endpoint, { transactionId, attributes });
	}
}
