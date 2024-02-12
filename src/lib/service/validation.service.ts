const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordMinLength = 8;
const labelMinLength = 5;

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
