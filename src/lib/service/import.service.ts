import { DetailedTransaction, type IsoDate } from "$lib/model/transaction.model";
import type { NoId } from "$lib/util/type.util";

export interface ImportColumn {
	title: string;
	required: boolean;
}

export interface AttributeImportColumn extends ImportColumn {
	attributeName: string;
}

export const IGNORED_COLUMN = { title: "-", required: false } satisfies ImportColumn;
const IMPORTED_ID_COLUMN = { title: "External ID", required: false } satisfies ImportColumn;
const AMOUNT_INGOING_COLUMN = { title: "Amount (ingoing)", required: false } satisfies ImportColumn;
const AMOUNT_OUTGOING_COLUMN = { title: "Amount (outgoing)", required: false } satisfies ImportColumn;
const DESCRIPTION_COLUMN = { title: "Description", required: true } satisfies ImportColumn;
const DATE_COLUMN = { title: "Date", required: true } satisfies ImportColumn;

export const STANDARD_COLUMNS: ImportColumn[] = [IMPORTED_ID_COLUMN, AMOUNT_INGOING_COLUMN, AMOUNT_OUTGOING_COLUMN, DESCRIPTION_COLUMN, DATE_COLUMN];

export function getAttributeImportColumns(attributes: string[]): AttributeImportColumn[] {
	return attributes.map((attribute) => ({
		title: attribute,
		required: false,
		attributeName: attribute,
	}));
}

export function validateColumnMapping(columns: ImportColumn[]) {
	const hasRequired = STANDARD_COLUMNS.filter((c) => c.required).every((standardColumn) => columns.includes(standardColumn));
	const hasAmount = columns.includes(AMOUNT_INGOING_COLUMN) || columns.includes(AMOUNT_OUTGOING_COLUMN);

	return hasRequired && hasAmount;
}

export enum DateFormat {
	YYYY_MM_DD = "YYYY MM DD",
	DD_MM_YYYY = "DD MM YYYY",
}

export interface RawImportData {
	headers: string[];
	rows: string[][];
}

export function parseTransactions(importData: RawImportData, columns: ImportColumn[], accountId: number, dateFormat: DateFormat): NoId<DetailedTransaction>[] {
	const parseTransaction = getTransactionParser(columns, accountId, dateFormat);

	return importData.rows.map((row) => parseTransaction(row));
}

function getTransactionParser(columns: ImportColumn[], accountId: number, dateFormat: DateFormat) {
	const importedIdIndex = columns.indexOf(IMPORTED_ID_COLUMN);
	const ingoingAmountIndex = columns.indexOf(AMOUNT_INGOING_COLUMN);
	const outgoingAmountIndex = columns.indexOf(AMOUNT_OUTGOING_COLUMN);
	const descriptionIndex = columns.indexOf(DESCRIPTION_COLUMN);
	const dateIndex = columns.indexOf(DATE_COLUMN);

	const attributeIndecies = columns
		.map((column, index) => [column, index] as const)
		.filter(([column, _index]) => isAttributeImportColumn(column))
		.map(([column, index]) => [(column as AttributeImportColumn).attributeName, index] as const);

	const getAmount = (row: string[]): number => {
		const ingoing = ingoingAmountIndex !== -1 ? Number(row[ingoingAmountIndex].replaceAll(" ", "")) : 0;
		const outgoing = outgoingAmountIndex !== -1 ? Number(row[outgoingAmountIndex].replaceAll(" ", "")) : 0;
		return ingoing - outgoing;
	};

	const parseToIsoDate = (date: string): IsoDate => {
		const dateValues = date.split(/[ ./-]/);

		return dateFormat === DateFormat.YYYY_MM_DD ? dateValues.join("-") : dateValues.reverse().join("-");
	};

	return (row: string[]): NoId<DetailedTransaction> => ({
		importedId: row[importedIdIndex],
		amount: getAmount(row),
		description: row[descriptionIndex],
		date: parseToIsoDate(row[dateIndex]),
		accountId,
		tags: [],
		attributes: Object.fromEntries(attributeIndecies.map(([name, index]) => [name, row[index]])),
	});
}

function isAttributeImportColumn(importColumn: ImportColumn): importColumn is AttributeImportColumn {
	return !!(importColumn as AttributeImportColumn).attributeName;
}
