import { type TypeDiff, assertNever } from "$lib/util/type.util";
import { z } from "zod";

export enum AccountType {
	CHECKING = "CHECKING",
	SAVING = "SAVING",
}

export const AccountTypeSchema = z.nativeEnum(AccountType);

export interface Account {
	id: number;
	name: string;
	type: AccountType;
	userId: number;
	balance?: number;
}

export const Account = z.object({
	id: z.number(),
	name: z.string(),
	type: AccountTypeSchema,
	userId: z.number(),
	balance: z.number().optional(),
});

assertNever<TypeDiff<Account, z.infer<typeof Account>>>();
assertNever<TypeDiff<AccountType, z.infer<typeof AccountTypeSchema>>>();
