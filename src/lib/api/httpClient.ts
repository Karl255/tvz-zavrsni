async function requestWithBody(method: string, endpoint: string, body: object): Promise<Response> {
	const url = new URL(endpoint, window.location.origin);

	return await fetch(url, {
		method,
		body: JSON.stringify(body),
	});
}

export const httpClient = {
	get: async (endpoint: string, params: Record<string, string>): Promise<Response> => {
		const url = new URL(endpoint, window.location.origin);
		Object.entries(params).forEach(([key, value]) => url.searchParams.set(encodeURIComponent(key), encodeURIComponent(value)));

		return await fetch(url, { method: "GET" });
	},

	post: async (endpoint: string, body: object) => requestWithBody("POST", endpoint, body),
	put: async (endpoint: string, body: object) => requestWithBody("PUT", endpoint, body),
	patch: async (endpoint: string, body: object) => requestWithBody("PATCH", endpoint, body),
	delete: async (endpoint: string, body: object) => requestWithBody("DELETE", endpoint, body),
};
