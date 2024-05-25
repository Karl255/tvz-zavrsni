import { sql } from "$lib/server/sql";
import { attributeRepo } from "./attribute.repo";
import { transactionRepo } from "./transaction.repo";

export const attributeValueRepo = {
	create: async (userId: number, transactionId: number, attributeName: string, value: string): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const attribute = await attributeRepo.getOneByName(userId, attributeName);

		if (!transaction || !attribute) {
			return false;
		}

		await sql`
			INSERT INTO attribute_value (transaction_id, attribute_id, value)
			VALUES (
				${transactionId},
				(SELECT id FROM attribute WHERE attribute.name = ${attributeName}),
				${value}
			)
		`;

		console.info(`Added transaction "${transactionId}" attribute ${attributeName} with ${value} for user ${userId}`);

		return true;
	},

	update: async (userId: number, transactionId: number, attributeId: number, value: string): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const attribute = await attributeRepo.getOne(userId, attributeId);

		if (!transaction || !attribute) {
			return false;
		}

		await sql`
			UPDATE attribute_value
			SET value = COALESCE(${value}, value)
			WHERE transaction_id = ${transactionId} AND attribute_id = ${attributeId}
		`;

		console.info(`Updated transaction "${transactionId}" attribute ${attributeId} to ${value} for user ${userId}`);

		return true;
	},

	delete: async (userId: number, transactionId: number, attributeName: string): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const attribute = await attributeRepo.getOneByName(userId, attributeName);

		if (!transaction || !attribute) {
			return false;
		}

		await sql`
			DELETE FROM attribute_value
			WHERE transaction_id = ${transactionId} AND attribute_id = (SELECT id FROM attribute WHERE attribute.name = ${attributeName}))
		`;

		console.info(`Removed transaction "${transactionId}" attribute ${attributeName} for user ${userId}`);

		return true;
	},
};
