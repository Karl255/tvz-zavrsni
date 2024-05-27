import { sql } from "$lib/server/sql";
import { tagRepo } from "./tag.repo";
import { transactionRepo } from "./transaction.repo";

export const taggedRepo = {
	create: async (userId: number, transactionId: number, tagName: string): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const tag = await tagRepo.getOneByName(userId, tagName);

		if (!transaction || !tag) {
			return false;
		}

		await sql`
			INSERT INTO tagged (transaction_id, tag_id)
			VALUES (${transactionId}, ${tag.id})
		`;

		console.info(`Tagged transaction "${transactionId}" with tag ${tagName} for user ${userId}`);

		return true;
	},

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

	delete: async (userId: number, transactionId: number, tagName: string): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const tag = await tagRepo.getOneByName(userId, tagName);

		if (!transaction || !tag) {
			return false;
		}

		await sql`
			DELETE FROM tagged
			WHERE transaction_id = ${transactionId} AND tag_id = ${tag.id})
		`;

		console.info(`Untagged transaction "${transactionId}" with tag ${tagName} for user ${userId}`);

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
