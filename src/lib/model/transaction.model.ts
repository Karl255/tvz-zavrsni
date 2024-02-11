import type { Label } from "./label.model";

export interface Transaction {
	id: number;
	amount: number;
	description: string;
	accountId: number;
}

export interface TransactionWithLabels extends Transaction {
	labels: Label[];
}
