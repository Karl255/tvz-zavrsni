import { sql } from "$lib/server/sql";
import { createJsonResponse } from "$lib/util/api.util";
import { parsePartial } from "$lib/util/util";
import type { RequestHandler } from "@sveltejs/kit";

interface DevRequest {
	action: string;
}

async function initDb() {
	const r = [];

	r[0] = await sql`
		CREATE TABLE IF NOT EXISTS "user" (
			id SERIAL PRIMARY KEY,
			email VARCHAR(50) NOT NULL,
			password_hash CHAR(128) NOT NULL
		);
	`;

	r[1] = await sql`
		CREATE TABLE IF NOT EXISTS account (
			id SERIAL PRIMARY KEY,
			name VARCHAR(50),
			type VARCHAR(20) NOT NULL,
			user_id SERIAL NOT NULL REFERENCES "user"(id)
		);
	`;

	r[2] = await sql`
		CREATE TABLE IF NOT EXISTS transaction (
			id SERIAL PRIMARY KEY,
			amount DECIMAL(6, 2) NOT NULL,
			description VARCHAR(256) NOT NULL,
			account_id SERIAL NOT NULL REFERENCES account(id),
			imported_id VARCHAR(64) NULL,
			CONSTRAINT unique_imported_id_per_account_id UNIQUE (imported_id, account_id)
		);
	`;

	r[3] = await sql`
		CREATE TABLE IF NOT EXISTS tag (
			id SERIAL PRIMARY KEY,
			name VARCHAR(32),
			user_id SERIAL NOT NULL REFERENCES "user"(id),
			CONSTRAINT unique_tag_name_per_user UNIQUE (name, user_id)
		);
	`;

	r[4] = await sql`
		CREATE TABLE IF NOT EXISTS tagged (
		    transaction_id SERIAL REFERENCES transaction(id),
		    tag_id SERIAL REFERENCES tag(id),
		    PRIMARY KEY(transaction_id, tag_id)
		);
	`;

	r[5] = await sql`
		CREATE TABLE attribute (
			id SERIAL PRIMARY KEY,
			name VARCHAR(32),
			user_id SERIAL NOT NULL REFERENCES "user"(id),
			CONSTRAINT unique_attribute_name_per_user UNIQUE (name, user_id)
		);
	`;

	r[6] = await sql`
		CREATE TABLE attribute_value (
			transaction_id SERIAL REFERENCES transaction(id),
			attribute_id SERIAL REFERENCES attribute(id),
			value VARCHAR(256),
			PRIMARY KEY (transaction_id, attribute_id)
		);
	`;

	return JSON.stringify(r);
}

async function seedDb() {
	return Promise.resolve("nothing to seed");
}

async function dropTables() {
	const r = [];

	r[0] = await sql`DROP TABLE IF EXISTS attribute_value CASCADE`;
	r[0] = await sql`DROP TABLE IF EXISTS tagged CASCADE`;
	r[1] = await sql`DROP TABLE IF EXISTS transaction CASCADE`;
	r[0] = await sql`DROP TABLE IF EXISTS attribute CASCADE`;
	r[2] = await sql`DROP TABLE IF EXISTS tag CASCADE`;
	r[3] = await sql`DROP TABLE IF EXISTS account CASCADE`;
	r[4] = await sql`DROP TABLE IF EXISTS "user" CASCADE`;

	return JSON.stringify(r);
}

const actions: Record<string, (() => Promise<string>) | undefined> = {
	initDb,
	seedDb,
	dropTables,
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
		console.info(`${payload.action}() = ${answer}`);

		return createJsonResponse({ success: true, message: answer });
	} else {
		return createJsonResponse({ success: false, message: "Action not found" }, 400);
	}
};
