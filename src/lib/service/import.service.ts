import { DetailedTransaction } from "$lib/model/transaction.model";
import type { NoId } from "$lib/util/type.util";

export interface ImportColumn {
	title: string;
	required: boolean;
}

const IGNORED_COLUMN = { title: "-", required: false } satisfies ImportColumn;
const IMPORTED_ID_COLUMN = { title: "External ID", required: false } satisfies ImportColumn;
const AMOUNT_INGOING_COLUMN = { title: "Amount (ingoing)", required: false } satisfies ImportColumn;
const AMOUNT_OUTGOING_COLUMN = { title: "Amount (outgoing)", required: false } satisfies ImportColumn;
const DESCRIPTION_COLUMN = { title: "Description", required: true } satisfies ImportColumn;
const DATE_COLUMN = { title: "Date", required: true } satisfies ImportColumn;

export const STANDARD_COLUMNS: ImportColumn[] = [IGNORED_COLUMN, IMPORTED_ID_COLUMN, AMOUNT_INGOING_COLUMN, AMOUNT_OUTGOING_COLUMN, DESCRIPTION_COLUMN, DATE_COLUMN];

export interface RawImportData {
	headers: string[];
	rows: string[][];
}

export function validateColumnMapping(columns: ImportColumn[]) {
	const hasRequired = STANDARD_COLUMNS.filter((c) => c.required).every((standardColumn) => columns.includes(standardColumn));
	const hasAmount = columns.includes(AMOUNT_INGOING_COLUMN) || columns.includes(AMOUNT_OUTGOING_COLUMN);

	return hasRequired && hasAmount;
}

export function parseTransactions(importData: RawImportData, columns: ImportColumn[], accountId: number): NoId<DetailedTransaction>[] {
	const parseTransaction = getTransactionParser(columns, accountId);

	return importData.rows.map((row) => parseTransaction(row));
}

function getTransactionParser(columns: ImportColumn[], accountId: number) {
	const importedIdIndex = columns.indexOf(IMPORTED_ID_COLUMN);
	const ingoingAmountIndex = columns.indexOf(AMOUNT_INGOING_COLUMN);
	const outgoingAmountIndex = columns.indexOf(AMOUNT_OUTGOING_COLUMN);
	const descriptionIndex = columns.indexOf(DESCRIPTION_COLUMN);
	const dateIndex = columns.indexOf(DATE_COLUMN);

	const getAmount = (row: string[]): number => {
		const ingoing = ingoingAmountIndex !== -1 ? Number(row[ingoingAmountIndex]) : 0;
		const outgoing = outgoingAmountIndex !== -1 ? Number(row[outgoingAmountIndex]) : 0;
		return ingoing - outgoing;
	};

	return (row: string[]): NoId<DetailedTransaction> => ({
		importedId: row[importedIdIndex],
		amount: getAmount(row),
		description: row[descriptionIndex],
		date: row[dateIndex],
		accountId,
		tags: [],
		attributes: {},
	});
}
