import { assertNever, type TypeDiff } from "$lib/util/type.util";
import { z } from "zod";

export interface Attribute {
	id: number;
	name: string;
	userId: number;
}

export const Attribute = z.object({
	id: z.number(),
	name: z.string(),
	userId: z.number(),
});

assertNever<TypeDiff<Attribute, z.infer<typeof Attribute>>>();
