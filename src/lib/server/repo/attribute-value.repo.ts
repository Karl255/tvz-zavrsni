import { sql } from "$lib/server/sql";
import { attributeRepo } from "./attribute.repo";
import { transactionRepo } from "./transaction.repo";

export const attributeValueRepo = {
	createMany: async (userId: number, transactionId: number, attributes: Record<string, string>) => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const attributeDefinitions = await attributeRepo.getManyByNames(userId, Object.keys(attributes));

		if (!transaction || attributeDefinitions.length !== Object.entries(attributes).length) {
			return false;
		}

		const attributeValues = Object.entries(attributes).map(([name, value]) => ({
			transactionId,
			attributeId: attributeDefinitions.find((attributeDefinition) => attributeDefinition.name === name)?.id,
			value,
		}));

		await sql`
			INSERT INTO attribute_value
			${sql(attributeValues, "transactionId", "attributeId", "value")}
			ON CONFLICT (transaction_id, attribute_id) DO UPDATE
			SET value = excluded.value
		`;

		console.info(`Added the following attributes to transaction ${transactionId} for user ${userId}`, attributes);

		return true;
	},

	deleteMany: async (userId: number, transactionId: number, attributeNames: string[]): Promise<boolean> => {
		const transaction = await transactionRepo.getOne(userId, transactionId);
		const attributeDefinitions = await attributeRepo.getManyByNames(userId, attributeNames);

		if (!transaction || attributeDefinitions.length !== attributeNames.length) {
			return false;
		}

		await sql`
			DELETE FROM attribute_value
			WHERE transaction_id = ${transactionId} AND attribute_id IN (SELECT id FROM attribute WHERE attribute.user_id = ${userId} AND attribute.name IN ${sql(attributeNames)})
		`;

		return true;
	},

	deleteByAttributeId: async (attributeId: number): Promise<void> => {
		await sql`
			DELETE FROM attribute_value
			WHERE attribute_id = ${attributeId}
		`;
	},

	deleteByTransactionId: async (transactionId: number): Promise<void> => {
		await sql`
			DELETE FROM attribute_value
			WHERE transaction_id = ${transactionId}
		`;
	},
};
