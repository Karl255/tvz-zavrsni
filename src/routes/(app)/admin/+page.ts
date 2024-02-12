import { userAdminApi } from "$lib/api/user.adminApi";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async () => {
	return {
		users: await userAdminApi.getAll(),
	};
};
