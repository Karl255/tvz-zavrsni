import type { Label } from "$lib/model/label.model";
import { sql } from "$lib/server/query";

export const labelRepo = {
	create: async (userId: number, name: string): Promise<Label> => {
		const labels = await sql<Label[]>`
			INSERT INTO label (name, userId)
			VALUES (${name}, ${userId})
		`;

		console.info(`Created label "${labels[0].id}" for user ${userId}`);

		return labels[0];
	},

	getAll: async (userId: number): Promise<Label[]> => {
		return await sql<Label[]>`
			SELECT id, name, userId
			FROM label
			WHERE userId = ${userId}
		`;
	},

	getOne: async (userId: number, labelId: number): Promise<Label | null> => {
		const labels = await sql<Label[]>`
			SELECT id, name, userId
			FROM label
			WHERE userId = ${userId} AND id = ${labelId}
		`;

		return labels[0] ?? null;
	},

	update: async (userId: number, labelId: number, name: string | null): Promise<void> => {
		await sql`
			UPDATE label
			SET name = COALESCE(${name}, name)
			WHERE userId = ${userId} AND id = ${labelId}
		`;

		console.info(`Updated label ${labelId}`);
	},

	delete: async (userId: number, labelId: number): Promise<void> => {
		await sql`
			DELETE label
			WHERE userId = ${userId} AND id = ${labelId}
		`;

		console.info(`Deleted label ${labelId}`);
	},
};
