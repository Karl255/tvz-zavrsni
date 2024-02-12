import type { User } from "$lib/model/user.model";
import { httpClient } from "./httpClient";

const endpoint = "/api/admin/users";
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export const userAdminApi = {
	getAll: async () => (await (await httpClient.get(endpoint, {})).json()) as User[],
	update: async (userId: number, newIsAdmin: boolean) => await httpClient.patch(idEndpoint(userId), { isAdmin: newIsAdmin } satisfies Partial<User>),
	delete: async (userId: number) => await httpClient.delete(idEndpoint(userId), {}),
};
