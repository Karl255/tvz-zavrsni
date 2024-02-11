export type Field<T extends object> = keyof Omit<T, "userId">;

export type NoId<T extends object> = Omit<T, "id" | "userId">;
