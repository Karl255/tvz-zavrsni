type JsonValue = string | number | boolean | JsonValue[] | object;

export function searchParamsHasAll(searchParams: URLSearchParams, params: string[]) {
	return params.every((param) => searchParams.has(param));
}

export function createJsonResponse(body: JsonValue, initOrStatus: ResponseInit | number = 200) {
	initOrStatus = typeof initOrStatus === "number" ? { status: initOrStatus } : initOrStatus;
	initOrStatus = initOrStatus.status ? initOrStatus : { ...initOrStatus, status: 200 }; // TODO: use that new assignment feature

	return new Response(JSON.stringify(body), initOrStatus);
}

export function createRequiredFieldsResponse(requiredParams: string[]): Response {
	const message = "Required fields: " + requiredParams.join(", ");
	return createJsonResponse({ message }, 400);
}

export function createCreatedResponse(body: JsonValue) {
	return createJsonResponse(body, 201);
}

export function createNoContentResponse() {
	return createJsonResponse("No content", 204);
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
