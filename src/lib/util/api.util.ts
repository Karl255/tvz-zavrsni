import type { ZodError } from "zod";

type JsonValue = string | number | boolean | JsonValue[] | object;

export function createJsonResponse(body: JsonValue | null, initOrStatus: ResponseInit | number = 200) {
	initOrStatus = typeof initOrStatus === "number" ? { status: initOrStatus } : initOrStatus;
	initOrStatus = initOrStatus.status ? initOrStatus : { ...initOrStatus, status: 200 };

	return new Response(body === null ? null : JSON.stringify(body), initOrStatus);
}

export function createValidationErrorResponse(error: ZodError): Response {
	return createJsonResponse({ error }, 400);
}

export function createNoContentResponse() {
	return createJsonResponse(null, 204);
}

export function createUnauthorizedResponse() {
	return createJsonResponse("Unauthorized", 401);
}

export function createNotFoundResponse() {
	return createJsonResponse("Not found", 404);
}

export function searchParamsToObject<T>(searchParams: URLSearchParams): Partial<T> {
	// prettier-ignore
	return [...searchParams.entries()].reduce(
		(object, [key, value]) => ({...object, [decodeURIComponent(key)]: decodeURIComponent(value)}),
		{}
	);
}

export function getIdParam(params: Partial<Record<string, string>>): number {
	if (params.id) {
		return parseInt(params.id, 10);
	} else {
		throw new Error();
	}
}

export function getRequiredParam(params: Partial<Record<string, string>>, name: string): string {
	return params[name] ?? _throw(new Error(`Missing required path param '${name}'`));

	function _throw(error: Error): never {
		throw error;
	}
}
