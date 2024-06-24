import { getContext, setContext } from "svelte";
import type { Account } from "./model/account.model";

const APP_CONTEXT_KEY = Symbol("APP_CONTEXT_KEY");

interface AppContext {
	accounts: Account[];
	availableTags: string[];
	availableAttributes: string[];
}

export function setAppContext(appContext: AppContext) {
	return setContext<AppContext>(APP_CONTEXT_KEY, appContext);
}

export function getAppContext() {
	return getContext<AppContext>(APP_CONTEXT_KEY);
}
