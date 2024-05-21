import { type TypeDiff, assertNever } from "$lib/util/type.util";
import { z } from "zod";

export interface Label {
	id: number;
	name: string;
	userId: number;
}

export const Label = z.object({
	id: z.number(),
	name: z.string(),
	userId: z.number(),
});

assertNever<TypeDiff<Label, z.infer<typeof Label>>>();
