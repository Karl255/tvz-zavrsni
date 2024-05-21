import { AttributeApi } from "$lib/api/attribute.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const attributesApi = new AttributeApi(fetch);

	return {
		attributes: await attributesApi.getAll(),
	};
};
