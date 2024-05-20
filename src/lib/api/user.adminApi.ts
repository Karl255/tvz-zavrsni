import type { User } from "$lib/model/user.model";
import { HttpClient, resolveEndpoint } from "./httpClient";

const endpoint = resolveEndpoint("/api/admin/users");
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export class UserAdminApi {
	httpClient: HttpClient;

	constructor(fetchFunction: typeof fetch = fetch) {
		this.httpClient = new HttpClient(fetchFunction);
	}

	async getAll() {
		return (await (await this.httpClient.get(endpoint, {})).json()) as User[];
	}

	async update(userId: number, newIsAdmin: boolean) {
		return await this.httpClient.patch(idEndpoint(userId), { isAdmin: newIsAdmin } satisfies Partial<User>);
	}

	async delete(userId: number) {
		return await this.httpClient.delete(idEndpoint(userId), {});
	}
}
