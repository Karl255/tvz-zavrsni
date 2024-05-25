export function distinctBy<T, P>(predicate: (item: T) => P) {
	return (item: T, index: number, allItems: T[]): boolean => {
		return allItems.findIndex((other) => predicate(other) === predicate(item)) === index;
	};
}
