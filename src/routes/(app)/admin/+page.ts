import { UserAdminApi } from "$lib/api/user.adminApi";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const userAdminApi = new UserAdminApi(fetch);

	return {
		users: await userAdminApi.getAll(),
	};
};
