import type { DetailedTransaction } from "$lib/model/transaction.model";

export interface Filter {
	descriptionSearch: string;
	amountMin: number | null;
	amountMax: number | null;
}

export function applyFilter(transactions: DetailedTransaction[], filter: Filter) {
	const descriptionWords = filter.descriptionSearch.split(/ +/).map((word) => word.toLocaleLowerCase());

	return transactions.filter((transaction) => {
		return byDescription(transaction.description, descriptionWords) && byAmount(transaction.amount, filter);
	});
}

function byDescription(description: string, words: string[]): boolean {
	return words.every((word) => description.toLocaleLowerCase().includes(word));
}

function byAmount(amount: number, filter: Filter): boolean {
	return (filter.amountMin === null || amount >= filter.amountMin) && (filter.amountMax === null || amount <= filter.amountMax);
}
