import { type TypeDiff, assertNever } from "$lib/util/type.util";
import { z } from "zod";

export interface Tag {
	id: number;
	name: string;
	userId: number;
}

export const Tag = z.object({
	id: z.number(),
	name: z.string(),
	userId: z.number(),
});

assertNever<TypeDiff<Tag, z.infer<typeof Tag>>>();
