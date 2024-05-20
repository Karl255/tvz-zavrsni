import type { Label } from "$lib/model/label.model";
import { HttpClient } from "./httpClient";

const endpoint = "/api/labels";
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class LabelApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll() {
		return (await (await this.httpClient.get(endpoint, {})).json()) as Label[];
	}

	async create(name: string) {
		return await this.httpClient.post(endpoint, { name });
	}

	async update(labelId: number, newName: string) {
		const payload: Partial<Label> = { name: newName };

		return await this.httpClient.patch(idEndpoint(labelId), payload);
	}

	async delete(labelId: number) {
		return await this.httpClient.delete(idEndpoint(labelId), {});
	}
}
