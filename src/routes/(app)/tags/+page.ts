import { TagApi } from "$lib/api/tag.api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const tagApi = new TagApi(fetch);

	return {
		tags: await tagApi.getAll(),
	};
};
