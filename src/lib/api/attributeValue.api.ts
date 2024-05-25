import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/attributes/value");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class AttributeValueApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async set(transactionId: number, attributeName: string, value: string) {
		return await this.httpClient.post(endpoint, { transactionId, attributeName, value });
	}

	async clear(transactionId: number, attributeName: string) {
		return await this.httpClient.delete(idEndpoint(transactionId), { attributeName });
	}
}
