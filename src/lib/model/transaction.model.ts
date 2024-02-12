import type { Label } from "./label.model";

export type IsoDate = string;

export interface Transaction {
	id: number;
	amount: number;
	description: string;
	date: IsoDate;
	accountId: number;
}

export interface TransactionWithLabels extends Transaction {
	labels: Label[];
}
