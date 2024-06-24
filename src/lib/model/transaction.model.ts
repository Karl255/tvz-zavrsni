import { z } from "zod";
import { assertNever, type TypeDiff } from "$lib/util/type.util";

const TRANSACTION_DESCRIPTION_MAX_LENGTH = 256;

/** String containing a date in the ISO 8601 format (YYYY-MM-DD). */
export type IsoDate = string;

export interface Transaction {
	id: number;
	amount: number;
	description: string;
	date: IsoDate;
	importedId: string | null;
	accountId: number;
}

export const Transaction = z.object({
	id: z.number(),
	amount: z.number(),
	description: z.string().max(TRANSACTION_DESCRIPTION_MAX_LENGTH),
	date: z.string().date(),
	importedId: z.string().nullable(),
	accountId: z.number(),
});

export interface DetailedTransaction extends Transaction {
	tags: string[];
	attributes: Record<string, string>;
}

export const DetailedTransaction = Transaction.extend({
	tags: z.array(z.string()),
	attributes: z.record(z.string(), z.string().max(256)),
});

assertNever<TypeDiff<Transaction, z.infer<typeof Transaction>>>();
assertNever<TypeDiff<DetailedTransaction, z.infer<typeof DetailedTransaction>>>();
