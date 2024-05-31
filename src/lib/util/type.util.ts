export function assertNever<_T extends never>() {}
export type TypeDiff<A, B> = Exclude<A, B> | Exclude<B, A>;

export type NoId<T> = Omit<T, "id">;
