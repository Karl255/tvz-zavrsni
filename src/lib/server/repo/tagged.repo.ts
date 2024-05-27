import { sql } from "$lib/server/sql";
import { transactionRepo } from "./transaction.repo";

export const taggedRepo = {
	createMany: async (userId: number, transactionId: number, tagNames: string[]): Promise<boolean> => {
		if (tagNames.length === 0) {
			return true;
		}

		const transaction = await transactionRepo.getOne(userId, transactionId);

		if (!transaction) {
			return false;
		}

		await sql`
			INSERT INTO tagged (transaction_id, tag_id)
			SELECT ${transactionId}, tag.id
			FROM tag
			WHERE tag.name IN ${sql(tagNames)}
		`;

		return true;
	},

	deleteByTagId: async (tagId: number): Promise<void> => {
		await sql`
			DELETE FROM tagged
			WHERE tag_id = ${tagId}
		`;
	},

	deleteByTagNames: async (userId: number, transactionId: number, tagNames: string[]): Promise<void> => {
		if (tagNames.length === 0) {
			return;
		}

		await sql`
			DELETE FROM tagged
			USING tag
			WHERE
				tag.user_id = ${userId}
				AND tagged.transaction_id = ${transactionId}
				AND tagged.tag_id = tag.id
				AND tag.name IN ${sql(tagNames)}
		`;
	},

	deleteForTransaction: async (transactionId: number): Promise<void> => {
		await sql`
			DELETE FROM tagged
			WHERE transaction_id = ${transactionId}
		`;
	},
};
