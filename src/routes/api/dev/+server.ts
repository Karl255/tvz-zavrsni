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
		
		CREATE TABLE IF NOT EXISTS account (
			id SERIAL PRIMARY KEY,
			name VARCHAR(50),
			type VARCHAR(20) NOT NULL,
			userId SERIAL NOT NULL REFERENCES "user"(id)
		);
		
		CREATE TABLE IF NOT EXISTS transaction (
			id SERIAL PRIMARY KEY,
			amount DECIMAL(6, 2) NOT NULL,
			description VARCHAR(128) NOT NULL,
			accountId SERIAL NOT NULL REFERENCES account(id)
		);
		
		CREATE TABLE IF NOT EXISTS label (
			id SERIAL PRIMARY KEY,
			name VARCHAR(32),
			userId SERIAL NOT NULL REFERENCES "user"(id)
		);
		
		CREATE TABLE IF NOT EXISTS transactionLabel (
		    transactionId SERIAL REFERENCES transaction(id),
		    labelId SERIAL REFERENCES label(id),
		    PRIMARY KEY(transactionId, labelId)
		);
	`;

	return JSON.stringify(r);
}

function seedDb() {
	// TODO #12: seed admin account with permissions
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
