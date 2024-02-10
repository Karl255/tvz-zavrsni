export function parsePartial<T extends object>(data: Partial<T>, requiredKeys: (keyof T)[]): T | null {
	if (requiredKeys.every((key) => Object.hasOwn(data, key))) {
		return data as T;
	} else {
		return null;
	}
}
