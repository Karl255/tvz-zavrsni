export interface User {
	id: number;
	email: string;
}

export interface UserEntity extends User {
	passwordHash: string;
}
