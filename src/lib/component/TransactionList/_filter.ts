import type { DetailedTransaction, IsoDate } from "$lib/model/transaction.model";

export interface Filter {
	descriptionSearch: string;
	amountMin: number | null;
	amountMax: number | null;
	dateFrom: IsoDate | null;
	dateTo: IsoDate | null;
	accountIds: number[];
	hasTags: string[];
	doesntHaveTags: string[];
	attributeSearches: Record<string, string>;
}

export function applyFilter(transactions: DetailedTransaction[], filter: Filter) {
	const descriptionWords = parseWords(filter.descriptionSearch);
	const dateFrom = filter.dateFrom === null ? null : new Date(filter.dateFrom);
	const dateTo = filter.dateTo === null ? null : new Date(filter.dateTo);

	return transactions.filter((transaction) => {
		return (
			search(transaction.description, descriptionWords) &&
			byAmount(transaction.amount, filter) &&
			byDate(new Date(transaction.date), dateFrom, dateTo) &&
			byAccount(transaction.accountId, filter.accountIds) &&
			byTag(transaction.tags, filter.hasTags, filter.doesntHaveTags) &&
			searchAttributes(transaction.attributes, filter.attributeSearches)
		);
	});
}

function parseWords(input: string): string[] {
	return input.split(/ +/).map((word) => word.toLocaleLowerCase());
}

function search(text: string, words: string[]): boolean {
	return words.every((word) => text.toLocaleLowerCase().includes(word));
}

function byAmount(amount: number, filter: Filter): boolean {
	return (filter.amountMin === null || amount >= filter.amountMin) && (filter.amountMax === null || amount <= filter.amountMax);
}

function byDate(date: Date, from: Date | null, to: Date | null): boolean {
	return (from === null || date >= from) && (to === null || date <= to);
}

function byAccount(accountId: number, accountIds: number[]): boolean {
	return accountIds.length === 0 || accountIds.includes(accountId);
}

function byTag(tags: string[], hasTags: string[], doesntHaveTags: string[]): boolean {
	return hasTags.every((hasTag) => tags.includes(hasTag)) && doesntHaveTags.every((doesntHaveTag) => !tags.includes(doesntHaveTag));
}

function searchAttributes(attributes: Record<string, string>, attributeSearches: Record<string, string>): boolean {
	return Object.entries(attributeSearches).every(([name, input]) => search(attributes[name] ?? "", parseWords(input)));
}
