import { sql } from "$lib/data/query";
import type { RequestHandler } from "@sveltejs/kit";

interface Data {
	id: number;
	name: string;
	value: string;
}

export const GET: RequestHandler = async () => {
	const result = await sql<Data[]>`SELECT * FROM test`;

	return new Response(JSON.stringify(result));
};
