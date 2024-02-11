export enum AccountType {
	CHECKING = "CHECKING",
	SAVING = "SAVING",
}

export interface Account {
	id: number;
	name: string;
	type: AccountType;
	userId: number;
	balance: number;
}
