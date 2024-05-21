import { AccountType } from "$lib/model/account.model";

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordMinLength = 8;
const tagMinLength = 3;
const accountNameMinLength = 5;
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
