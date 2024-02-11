async function requestWithBody(method: string, endpoint: string, body: object): Promise<Response> {
	return await fetch(endpoint, {
		method,
		body: JSON.stringify(body),
	});
}

export const httpClient = {
	get: async (endpoint: string, params: Record<string, string | number | boolean | null | undefined>): Promise<Response> => {
		const queryParams = Object.entries(params)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`)
			.join("&");

		const url = `${endpoint}?${queryParams}`;

		return await fetch(url, { method: "GET" });
	},

	post: async (endpoint: string, body: object) => requestWithBody("POST", endpoint, body),
	put: async (endpoint: string, body: object) => requestWithBody("PUT", endpoint, body),
	patch: async (endpoint: string, body: object) => requestWithBody("PATCH", endpoint, body),
	delete: async (endpoint: string, body: object) => requestWithBody("DELETE", endpoint, body),
};
