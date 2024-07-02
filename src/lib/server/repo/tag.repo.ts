import type { Tag } from "$lib/model/tag.model";
import { sql } from "$lib/server/sql";
import { taggedRepo } from "./_tagged.repo";

export const tagRepo = {
	create: async (userId: number, name: string): Promise<string | null> => {
		const existingTags = await tagRepo.getOneByName(userId, name);

		if (existingTags) {
			return null;
		}

		const tags = await sql<Tag[]>`
			INSERT INTO tag (name, user_id)
			VALUES (${name}, ${userId})
			RETURNING id, name, user_id
		`;

		console.info(`Created tag ${tags[0].id} for user ${userId}`);

		return tags[0].name;
	},

	getAll: async (userId: number): Promise<Tag[]> => {
		return await sql<Tag[]>`
			SELECT id, name, user_id
			FROM tag
			WHERE user_id = ${userId}
		`;
	},

	getOneByName: async (userId: number, name: string): Promise<Tag | null> => {
		const tags = await sql<Tag[]>`
			SELECT id, name, user_id
			FROM tag
			WHERE user_id = ${userId} AND name = ${name}
		`;

		return tags[0] ?? null;
	},

	update: async (userId: number, tagName: string, newName: string | null): Promise<void> => {
		await sql`
			UPDATE tag
			SET name = COALESCE(${newName}, name)
			WHERE user_id = ${userId} AND name = ${tagName}
		`;

		console.info(`Updated tag ${tagName} to ${newName}`);
	},

	delete: async (userId: number, tagName: string): Promise<boolean> => {
		const tag = await tagRepo.getOneByName(userId, tagName);

		if (!tag) {
			return false;
		}

		await taggedRepo.deleteByTagId(tag.id);

		await sql`
			DELETE FROM tag
			WHERE user_id = ${userId} AND name = ${tagName}
		`;

		console.info(`Deleted tag ${tagName}`);

		return true;
	},
};
