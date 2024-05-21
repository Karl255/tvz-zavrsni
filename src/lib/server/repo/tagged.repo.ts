import { sql } from "$lib/server/sql";
import { tagRepo } from "./tag.repo";
import { transactionRepo } from "./transaction.repo";

export const taggedRepo = {
	create: async (userId: number, transactionId: number, tagId: number): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const tag = await tagRepo.getOne(userId, tagId);

		if (!transaction || !tag) {
			return false;
		}

		await sql`
			INSERT INTO tagged (transaction_id, tag_id)
			VALUES (${transactionId}, ${tagId})
		`;

		console.info(`Tagged transaction "${transactionId}" with tag ${tagId} user ${userId}`);

		return true;
	},

	delete: async (userId: number, transactionId: number, tagId: number): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const tag = await tagRepo.getOne(userId, tagId);

		if (!transaction || !tag) {
			return false;
		}

		await sql`
			DELETE FROM tagged
			WHERE transaction_id = ${transactionId} AND tag_id = ${tagId})
		`;

		console.info(`Untagged transaction "${transactionId}" with tag ${tagId} user ${userId}`);

		return true;
	},
};
