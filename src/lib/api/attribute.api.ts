import type { Attribute } from "$lib/model/attribute.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/attributes");
const nameEndpoint = (name: string) => `${endpoint}/${name}`;

export class AttributeApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll() {
		return (await (await this.httpClient.get(endpoint, {})).json()) as string[];
	}

	async create(name: string) {
		return await this.httpClient.post(endpoint, { name });
	}

	async update(attributeName: string, newName: string) {
		const payload: Partial<Attribute> = { name: newName };

		return await this.httpClient.patch(nameEndpoint(attributeName), payload);
	}

	async delete(attributeName: string) {
		return await this.httpClient.delete(nameEndpoint(attributeName), {});
	}
}
