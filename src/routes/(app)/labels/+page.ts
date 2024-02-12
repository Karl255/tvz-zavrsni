import { labelApi } from "$lib/api/label.api";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async () => {
	return {
		labels: await labelApi.getAll(),
	};
};
