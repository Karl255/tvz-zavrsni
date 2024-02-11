export enum AccountType {
	CHECKING = "CHECKING",
	SAVING = "SAVING",
}

export interface Account {
	id: number;
	name: string;
	type: Account;
	userId: number;
}
