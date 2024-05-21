import type { Attribute } from "$lib/model/attribute.model";
import { sql } from "$lib/server/sql";

export const attributeRepo = {
	create: async (userId: number, name: string): Promise<Attribute | null> => {
		const existingAttribute = await attributeRepo.getOneByName(userId, name);

		if (existingAttribute) {
			return null;
		}

		const attributes = await sql<Attribute[]>`
			INSERT INTO attribute (name, user_id)
			VALUES (${name}, ${userId})
			RETURNING id, name, user_id
		`;

		console.info(`Created attribute ${attributes[0].id} for user ${userId}`);

		return attributes[0];
	},

	getAll: async (userId: number): Promise<Attribute[]> => {
		return await sql<Attribute[]>`
			SELECT id, name, user_id
			FROM attribute
			WHERE user_id = ${userId}
		`;
	},

	getOne: async (userId: number, attributeId: number): Promise<Attribute | null> => {
		const attributes = await sql<Attribute[]>`
			SELECT id, name, user_id
			FROM attribute
			WHERE user_id = ${userId} AND id = ${attributeId}
		`;

		return attributes[0] ?? null;
	},

	getOneByName: async (userId: number, name: string): Promise<Attribute | null> => {
		const attributes = await sql<Attribute[]>`
			SELECT id, name, user_id
			FROM attribute
			WHERE user_id = ${userId} AND name = ${name}
		`;

		return attributes[0] ?? null;
	},

	update: async (userId: number, attributeId: number, name: string | null): Promise<void> => {
		await sql`
			UPDATE attribute
			SET name = COALESCE(${name}, name)
			WHERE user_id = ${userId} AND id = ${attributeId}
		`;

		console.info(`Updated attribute ${attributeId}`);
	},

	delete: async (userId: number, attributeId: number): Promise<void> => {
		// TODO: cascade?
		await sql`
			DELETE FROM attribute
			WHERE user_id = ${userId} AND id = ${attributeId}
		`;

		console.info(`Deleted attribute ${attributeId}`);
	},
};
