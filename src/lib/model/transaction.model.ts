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
})

export interface TransactionWithTags extends Transaction {
	tags: Tag[];
}

export const TransactionWithTags = Transaction.extend({
	tags: z.array(Tag),
});

assertNever<TypeDiff<Transaction, z.infer<typeof Transaction>>>();
assertNever<TypeDiff<TransactionWithTags, z.infer<typeof TransactionWithTags>>>();
