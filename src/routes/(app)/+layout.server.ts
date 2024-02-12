import { getLocals } from "$hooks.server";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ locals }) => {
	return { locals: getLocals(locals) };
};
