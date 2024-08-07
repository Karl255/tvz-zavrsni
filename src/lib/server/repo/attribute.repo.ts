import type { Attribute } from "$lib/model/attribute.model";
import { sql } from "$lib/server/sql";
import { attributeValueRepo } from "./_attribute-value.repo";

export const attributeRepo = {
	create: async (userId: number, name: string): Promise<string | null> => {
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

		return attributes[0].name;
	},

	getAllNames: async (userId: number): Promise<string[]> => {
		const attributes = await sql<Attribute[]>`
			SELECT id, name, user_id
			FROM attribute
			WHERE user_id = ${userId}
		`;

		return attributes.map(nameOnly);
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

	getManyByNames: async (userId: number, names: string[]): Promise<Attribute[]> => {
		const attributes = await sql<Attribute[]>`
			SELECT id, name, user_id
			FROM attribute
			WHERE user_id = ${userId} AND name IN ${sql(names)}
		`;

		return attributes;
	},

	update: async (userId: number, attributeName: string, name: string | null): Promise<void> => {
		await sql`
			UPDATE attribute
			SET name = COALESCE(${name}, name)
			WHERE user_id = ${userId} AND name = ${attributeName}
		`;

		console.info(`Updated attribute ${attributeName}`);
	},

	delete: async (userId: number, attributeName: string): Promise<boolean> => {
		const attribute = await attributeRepo.getOneByName(userId, attributeName);

		if (!attribute) {
			return false;
		}

		await attributeValueRepo.deleteByAttributeId(attribute.id);

		await sql`
			DELETE FROM attribute
			WHERE user_id = ${userId} AND name = ${attributeName}
		`;

		console.info(`Deleted attribute ${attributeName}`);

		return true;
	},
};

function nameOnly(attribute: Attribute): string {
	return attribute.name;
}
