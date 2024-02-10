import { sql } from "$lib/server/query";
import { createJsonResponse } from "$lib/util/api.util";
import { parsePartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";

interface DevRequest {
	action: string;
}

async function initDb() {
	const r = await sql`
		CREATE TABLE IF NOT EXISTS "user" (
			id SERIAL PRIMARY KEY,
			email VARCHAR(50) NOT NULL,
			passwordHash CHAR(128) NOT NULL
		);
	`;

	return JSON.stringify(r);
}

function seedDb() {
	return Promise.resolve("nothing to seed");
}

const actions: Record<string, (() => Promise<string>) | undefined> = {
	initDb,
	seedDb,
};

export const POST: RequestHandler = async ({ request }) => {
	const requiredFields: (keyof DevRequest)[] = ["action"];

	const payload = parsePartial((await request.json()) as Partial<DevRequest>, requiredFields);

	if (!payload) {
		const message = "Required fields in body: " + requiredFields.join(", ");
		return createJsonResponse({ message }, 400);
	}

	const action = actions[payload.action];

	if (action) {
		const answer = await action();
		console.log(`${payload.action}() = ${answer}`);

		return createJsonResponse({ success: true, message: answer });
	} else {
		return createJsonResponse({ success: false, message: "Action not found" }, 400);
	}
};
