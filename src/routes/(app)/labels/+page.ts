import { LabelApi } from "$lib/api/label.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const labelApi = new LabelApi(fetch);

	return {
		labels: await labelApi.getAll(),
	};
};
