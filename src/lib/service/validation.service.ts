const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordMinLength = 8;

export function validateRegister(email: string, password: string, passwordRepeat: string) {
	return validateEmail(email) && password.length >= passwordMinLength && password === passwordRepeat;
}

export function validateEmail(email: string) {
	return !!email.match(emailRegex);
}
