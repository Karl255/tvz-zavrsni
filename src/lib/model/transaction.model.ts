import { z } from "zod";
import { Tag } from "./tag.model";
import { assertNever, type TypeDiff } from "$lib/util/type.util";

export type IsoDate = string;

export interface Transaction {
	id: number;
	amount: number;
	description: string;
	date: IsoDate;
	accountId: number;
}

export const Transaction = z.object({
	id: z.number(),
	amount: z.number(),
	description: z.string(),
	date: z.string(),
	accountId: z.number(),
});

export interface DetailedTransaction extends Transaction {
	tags: Tag[];
	attributes: Record<string, string>;
}

export const DetailedTransaction = Transaction.extend({
	tags: z.array(Tag),
	attributes: z.record(z.string(), z.string()),
});

assertNever<TypeDiff<Transaction, z.infer<typeof Transaction>>>();
assertNever<TypeDiff<DetailedTransaction, z.infer<typeof DetailedTransaction>>>();
