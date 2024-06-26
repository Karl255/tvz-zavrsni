import { assertNever, type TypeDiff } from "$lib/util/type.util";
import { z } from "zod";

export interface User {
	id: number;
	email: string;
}

export const User = z.object({
	id: z.number(),
	email: z.string(),
});

export interface UserEntity extends User {
	passwordHash: string;
}

assertNever<TypeDiff<User, z.infer<typeof User>>>();
