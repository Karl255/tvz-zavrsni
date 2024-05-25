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
				(SELECT id FROM attribute WHERE attribute.user_id = ${userId} AND attribute.name = ${attributeName}),
				${value}
			)
		`;

		console.info(`Added transaction "${transactionId}" attribute ${attributeName} with ${value} for user ${userId}`);

		return true;
	},

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
			WHERE transaction_id = ${transactionId} AND attribute_id = (SELECT id FROM attribute WHERE attribute.user_id = ${userId} AND attribute.name = ${attributeName}))
		`;

		console.info(`Removed transaction "${transactionId}" attribute ${attributeName} for user ${userId}`);

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

	deleteForTransaction: async (transactionId: number): Promise<void> => {
		await sql`
			DELETE FROM attribute_value
			WHERE transaction_id = ${transactionId}
		`;
	},

	deleteByAttributeId: async (attributeId: number): Promise<void> => {
		await sql`
			DELETE FROM attribute_value
			WHERE attribute_id = ${attributeId}
		`;
	},
};
