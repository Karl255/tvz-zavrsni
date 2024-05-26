import type { Tag } from "$lib/model/tag.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/tags");
const nameEndpoint = (name: string) => `${endpoint}/${name}`;

export class TagApi {
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

	async update(tagName: string, newName: string) {
		const payload: Partial<Tag> = { name: newName };

		return await this.httpClient.patch(nameEndpoint(tagName), payload);
	}

	async delete(tagName: string) {
		return await this.httpClient.delete(nameEndpoint(tagName));
	}
}
