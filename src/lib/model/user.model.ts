export interface User {
	id: number;
	email: string;
	isAdmin: boolean;
}

export interface UserEntity extends User {
	passwordHash: string;
}
