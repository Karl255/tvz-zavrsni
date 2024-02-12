import { AccountType } from "$lib/model/account.model";

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordMinLength = 8;
const labelMinLength = 3;
const accountNameMinLength = 5;

export function validatePassword(password: string) {
	return password.length >= passwordMinLength;
}

export function validateEqual(first: string, second: string) {
	return first === second;
}

export function validateEmail(email: string) {
	return !!email.match(emailRegex);
}

export function validateLabelName(name: string) {
	return name.length >= labelMinLength;
}

export function validateAccountName(name: string) {
	return name.length >= accountNameMinLength;
}

export function validateAccountType(accountType: AccountType) {
	return Object.values(AccountType).includes(accountType);
}
