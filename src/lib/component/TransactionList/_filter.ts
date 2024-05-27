import type { DetailedTransaction, IsoDate } from "$lib/model/transaction.model";

export interface Filter {
	descriptionSearch: string;
	amountMin: number | null;
	amountMax: number | null;
	dateFrom: IsoDate | null;
	dateTo: IsoDate | null;
}

export function applyFilter(transactions: DetailedTransaction[], filter: Filter) {
	const descriptionWords = filter.descriptionSearch.split(/ +/).map((word) => word.toLocaleLowerCase());
	const dateFrom = filter.dateFrom === null ? null : new Date(filter.dateFrom);
	const dateTo = filter.dateTo === null ? null : new Date(filter.dateTo);

	return transactions.filter((transaction) => {
		return byDescription(transaction.description, descriptionWords) && byAmount(transaction.amount, filter) && byDate(new Date(transaction.date), dateFrom, dateTo);
	});
}

function byDescription(description: string, words: string[]): boolean {
	return words.every((word) => description.toLocaleLowerCase().includes(word));
}

function byAmount(amount: number, filter: Filter): boolean {
	return (filter.amountMin === null || amount >= filter.amountMin) && (filter.amountMax === null || amount <= filter.amountMax);
}

function byDate(date: Date, from: Date | null, to: Date | null): boolean {
	return (from === null || date >= from) && (to === null || date <= to);
}
