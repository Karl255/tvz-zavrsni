import type { Tag } from "$lib/model/tag.model";
import { sql } from "$lib/server/sql";

export const tagRepo = {
	create: async (userId: number, name: string): Promise<Tag> => {
		const tags = await sql<Tag[]>`
			INSERT INTO tag (name, user_id)
			VALUES (${name}, ${userId})
			RETURNING id, name, user_id
		`;

		console.info(`Created tag ${tags[0].id} for user ${userId}`);

		return tags[0];
	},

	getAll: async (userId: number): Promise<Tag[]> => {
		return await sql<Tag[]>`
			SELECT id, name, user_id
			FROM tag
			WHERE user_id = ${userId}
		`;
	},

	getOne: async (userId: number, tagId: number): Promise<Tag | null> => {
		const tags = await sql<Tag[]>`
			SELECT id, name, user_id
			FROM tag
			WHERE user_id = ${userId} AND id = ${tagId}
		`;

		return tags[0] ?? null;
	},

	update: async (userId: number, tagId: number, name: string | null): Promise<void> => {
		await sql`
			UPDATE tag
			SET name = COALESCE(${name}, name)
			WHERE user_id = ${userId} AND id = ${tagId}
		`;

		console.info(`Updated tag ${tagId}`);
	},

	delete: async (userId: number, tagId: number): Promise<void> => {
		// TODO: cascade?
		await sql`
			DELETE FROM tag
			WHERE user_id = ${userId} AND id = ${tagId}
		`;

		console.info(`Deleted tag ${tagId}`);
	},
};
