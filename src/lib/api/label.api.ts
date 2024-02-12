import type { Label } from "$lib/model/label.model";
import { httpClient } from "./httpClient";

const endpoint = "/api/labels";
const idEndpoint = (id: number) => `${endpoint}/${id}`;

export const labelApi = {
	getAll: async () => (await (await httpClient.get(endpoint, {})).json()) as Label[],

	create: async (name: string) => await httpClient.post(endpoint, { name }),

	update: async (labelId: number, newName: string) => {
		const payload: Partial<Label> = { name: newName };

		return await httpClient.patch(idEndpoint(labelId), payload);
	},

	delete: async (labelId: number) => await httpClient.delete(idEndpoint(labelId), {}),
};
