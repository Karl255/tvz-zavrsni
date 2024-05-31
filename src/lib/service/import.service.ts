import { DetailedTransaction } from "$lib/model/transaction.model";
import type { NoId } from "$lib/util/type.util";

export interface ImportColumn {
	title: string;
	required: boolean;
}

const IGNORED_COLUMN = { title: "-", required: false } satisfies ImportColumn;
const IMPORTED_ID_COLUMN = { title: "External ID", required: false } satisfies ImportColumn;
const AMOUNT_COLUMN = { title: "Amount", required: true } satisfies ImportColumn;
const DESCRIPTION_COLUMN = { title: "Description", required: true } satisfies ImportColumn;
const DATE_COLUMN = { title: "Date", required: true } satisfies ImportColumn;

export const STANDARD_COLUMNS: ImportColumn[] = [IGNORED_COLUMN, IMPORTED_ID_COLUMN, AMOUNT_COLUMN, DESCRIPTION_COLUMN, DATE_COLUMN];
export const REQUIRED_COLUMNS = STANDARD_COLUMNS.filter((c) => c.required);

export interface RawImportData {
	headers: string[];
	rows: string[][];
}

export function parseTransactions(importData: RawImportData, columns: ImportColumn[], accountId: number): NoId<DetailedTransaction>[] {
	const parseTransaction = getTransactionParser(columns, accountId);

	return importData.rows.map((row) => parseTransaction(row));
}

function getTransactionParser(columns: ImportColumn[], accountId: number) {
	const importedIdIndex = columns.indexOf(IMPORTED_ID_COLUMN);
	const amountIndex = columns.indexOf(AMOUNT_COLUMN);
	const descriptionIndex = columns.indexOf(DESCRIPTION_COLUMN);
	const dateIndex = columns.indexOf(DATE_COLUMN);

	return (row: string[]): NoId<DetailedTransaction> => ({
		importedId: row[importedIdIndex],
		amount: Number(row[amountIndex]),
		description: row[descriptionIndex],
		date: row[dateIndex],
		accountId,
		tags: [],
		attributes: {},
	});
}
