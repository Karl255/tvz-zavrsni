import type { Attribute } from "$lib/model/attribute.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/attributes");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class AttributeApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll() {
		return (await (await this.httpClient.get(endpoint, {})).json()) as Attribute[];
	}

	async create(name: string) {
		return await this.httpClient.post(endpoint, { name });
	}

	async update(attributeId: number, newName: string) {
		const payload: Partial<Attribute> = { name: newName };

		return await this.httpClient.patch(idEndpoint(attributeId), payload);
	}

	async delete(attributeId: number) {
		return await this.httpClient.delete(idEndpoint(attributeId), {});
	}
}
