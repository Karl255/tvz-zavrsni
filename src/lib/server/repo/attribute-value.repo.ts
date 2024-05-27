import { sql } from "$lib/server/sql";
import { transactionRepo } from "./transaction.repo";

export const attributeValueRepo = {
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

	setAttributesForTransaction: async (userId: number, transactionId: number, attributes: Record<string, string>): Promise<boolean> => {
		const attributeNames = Object.keys(attributes);
		const transaction = await transactionRepo.getOne(userId, transactionId);

		if (!transaction) {
			return false;
		}

		const inserts = Object.entries(attributes).map(([name, value]) => [transactionId, name, value]);

		if (inserts.length > 0) {
			await sql`
				INSERT INTO attribute_value (transaction_id, attribute_id, value)
				SELECT
					inserts.transaction_id::integer,
					(SELECT attribute.id FROM attribute WHERE attribute.user_id = ${userId} AND attribute.name = inserts.name),
					inserts.value
				FROM (VALUES ${sql(inserts)}) AS inserts(transaction_id, name, value)
				ON CONFLICT (transaction_id, attribute_id)
				DO UPDATE
				SET value = excluded.value
			`;
		}

		await sql`
			DELETE FROM attribute_value
			USING attribute
			WHERE
				attribute.user_id = ${userId}
				AND attribute_value.transaction_id = ${transactionId}
				AND attribute_value.attribute_id = attribute.id
				${attributeNames.length === 0 ? sql`` : sql`AND attribute.name NOT IN ${sql(attributeNames)}`}
		`;

		return true;
	},
};
