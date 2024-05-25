import { browser } from "$app/environment";

export class HttpClient {
	private fetchFunction: typeof fetch;

	constructor(fetchFunction: typeof fetch) {
		this.fetchFunction = fetchFunction;
	}

	private async fetchWithBody(method: string, endpoint: string, body?: object) {
		return await this.fetchFunction(endpoint, {
			method,
			body: body ? JSON.stringify(body) : undefined,
		});
	}

	async get(endpoint: string, params: Record<string, string | number | boolean | null | undefined>): Promise<Response> {
		const queryParams = Object.entries(params)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`)
			.join("&");

		// TODO: don't add ? with empty params
		const url = `${endpoint}?${queryParams}`;

		return await this.fetchFunction(url, { method: "GET" });
	}

	async post(endpoint: string, body?: object) {
		return await this.fetchWithBody("POST", endpoint, body);
	}

	async put(endpoint: string, body?: object) {
		return await this.fetchWithBody("PUT", endpoint, body);
	}

	async patch(endpoint: string, body?: object) {
		return await this.fetchWithBody("PATCH", endpoint, body);
	}

	async delete(endpoint: string, body?: object) {
		return await this.fetchWithBody("DELETE", endpoint, body);
	}
}

export function resolveEndpoint(endpoint: string): string {
	return browser ? location.origin + endpoint : endpoint;
}
