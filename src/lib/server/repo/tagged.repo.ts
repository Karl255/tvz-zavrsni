import { sql } from "$lib/server/sql";
import { transactionRepo } from "./transaction.repo";

export const taggedRepo = {
	deleteByTagId: async (tagId: number): Promise<void> => {
		await sql`
			DELETE FROM tagged
			WHERE tag_id = ${tagId}
		`;
	},

	deleteByTransactionId: async (transactionId: number): Promise<void> => {
		await sql`
			DELETE FROM tagged
			WHERE transaction_id = ${transactionId}
		`;
	},

	setTagsForTransaction: async (userId: number, transactionId: number, tagNames: string[]): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);

		if (!transaction) {
			return false;
		}

		await sql`
			INSERT INTO tagged (transaction_id, tag_id)
			SELECT ${transactionId}, tag.id
			FROM tag
			WHERE
				tag.user_id = ${userId}
				AND tag.name IN ${sql(tagNames)}
			ON CONFLICT DO NOTHING
		`;

		await sql`
			DELETE FROM tagged
			USING tag
			WHERE
				tag.user_id = ${userId}
				AND tagged.transaction_id = ${transactionId}
				AND tagged.tag_id = tag.id
				${tagNames.length === 0 ? sql`` : sql`AND tag.name NOT IN ${sql(tagNames)}`}
		`;

		return true;
	},
};
