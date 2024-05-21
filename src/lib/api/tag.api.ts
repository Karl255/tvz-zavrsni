import type { Tag } from "$lib/model/tag.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/tags");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class TagApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll() {
		return (await (await this.httpClient.get(endpoint, {})).json()) as Tag[];
	}

	async create(name: string) {
		return await this.httpClient.post(endpoint, { name });
	}

	async update(tagId: number, newName: string) {
		const payload: Partial<Tag> = { name: newName };

		return await this.httpClient.patch(idEndpoint(tagId), payload);
	}

	async delete(tagId: number) {
		return await this.httpClient.delete(idEndpoint(tagId), {});
	}
}
