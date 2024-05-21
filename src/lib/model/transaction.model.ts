import { z } from "zod";
import { Label } from "./label.model";
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

export interface TransactionWithLabels extends Transaction {
	labels: Label[];
}

export const TransactionWithLabels = Transaction.extend({
	labels: z.array(Label),
});

assertNever<TypeDiff<Transaction, z.infer<typeof Transaction>>>();
assertNever<TypeDiff<TransactionWithLabels, z.infer<typeof TransactionWithLabels>>>();
