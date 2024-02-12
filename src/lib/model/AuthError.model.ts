export interface AuthError {
	message: string;
	field: "email" | "password";
}
