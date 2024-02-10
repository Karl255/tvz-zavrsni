export function searchParamsHasAll(searchParams: URLSearchParams, params: string[]) {
	return params.every((param) => searchParams.has(param));
}

export function createJsonResponse(body: object, status: number = 200) {
	return new Response(JSON.stringify(body), { status });
}

async function requestWithBody<T>(method: string, endpoint: string, body: object): Promise<T> {
	const url = new URL(endpoint, window.location.origin);

	const response = await fetch(url, {
		method,
		body: JSON.stringify(body),
	});

	return (await response.json()) as T;
}

export const http = {
	get: async <T>(endpoint: string, params: Record<string, string>): Promise<T> => {
		const url = new URL(endpoint, window.location.origin);

		Object.entries(params).forEach(([key, value]) => url.searchParams.set(encodeURIComponent(key), encodeURIComponent(value)));

		const response = await fetch(url, { method: "GET" });

		return (await response.json()) as T;
	},

	post: async <T>(endpoint: string, body: object) => requestWithBody<T>("POST", endpoint, body),
	put: async <T>(endpoint: string, body: object) => requestWithBody<T>("PUT", endpoint, body),
	patch: async <T>(endpoint: string, body: object) => requestWithBody<T>("PATCH", endpoint, body),
	delete: async <T>(endpoint: string, body: object) => requestWithBody<T>("DELETE", endpoint, body),
};
