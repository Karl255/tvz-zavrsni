import { sql } from "$lib/server/query";
import { labelRepo } from "./label.repo";
import { transactionRepo } from "./transaction.repo";

export const transactionLabelRepo = {
	create: async (userId: number, transactionId: number, labelId: number): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const label = await labelRepo.getOne(userId, labelId);

		if (!transaction || !label) {
			return false;
		}

		await sql`
			INSERT INTO transaction_label (transaction_id, label_id)
			VALUES (${transactionId}, ${labelId})
		`;

		console.info(`Labeled transaction "${transactionId}" with label ${labelId} user ${userId}`);

		return true;
	},

	delete: async (userId: number, transactionId: number, labelId: number): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const label = await labelRepo.getOne(userId, labelId);

		if (!transaction || !label) {
			return false;
		}

		await sql`
			DELETE FROM transaction_label
			WHERE transaction_id = ${transactionId} AND label_id = ${labelId})
		`;

		console.info(`Unlabeled transaction "${transactionId}" with label ${labelId} user ${userId}`);

		return true;
	},
};
