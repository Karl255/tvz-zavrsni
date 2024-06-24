import { AccountType } from "$lib/model/account.model";
import { Transaction } from "$lib/model/transaction.model";

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordMinLength = 8;
const tagMinLength = 3;
const accountNameMinLength = 1;
const isoDateRegex = /\d{4}-[01]\d-[0-3]\d/;

export function validatePassword(password: string) {
	return password.length >= passwordMinLength;
}

export function validateEqual(first: string, second: string) {
	return first === second;
}

export function validateEmail(email: string) {
	return !!email.match(emailRegex);
}

export function validateTagName(name: string) {
	return name.length >= tagMinLength;
}

export function validateAttributeName(name: string) {
	return name.length >= tagMinLength;
}

export function validateAccountName(name: string) {
	return name.length >= accountNameMinLength;
}

export function validateAccountType(accountType: AccountType) {
	return Object.values(AccountType).includes(accountType);
}

export function validateIsoDate(date: string) {
	return !!date.match(isoDateRegex);
}

export function validateTransaction(transaction: Transaction): boolean {
	const parsing = Transaction.safeParse(transaction);

	return parsing.success;
}
