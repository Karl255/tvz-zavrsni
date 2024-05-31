import type { IsoDate } from "$lib/model/transaction.model";

export const STANDARD_COLUMNS: ImportColumn[] = [
	{
		title: "-",
		fieldName: "",
		type: "ignored",
		required: false,
		parse: (value) => ({ type: "ignored", value }),
	},
	{
		title: "External ID",
		fieldName: "importedId",
		type: "string",
		required: false,
		parse: (value) => ({ type: "string", value }),
	},
	{
		title: "Amount",
		fieldName: "amount",
		type: "number",
		required: true,
		parse: (value) => ({ type: "number", value: Number(value) }),
	},
	{
		title: "Description",
		fieldName: "description",
		type: "string",
		required: true,
		parse: (value) => ({ type: "string", value }),
	},
	{
		title: "Date",
		fieldName: "date",
		type: "date",
		required: true,
		parse: (value) => ({ type: "date", value }),
	},
];

export interface RawImportData {
	headers: string[];
	rows: string[][];
}

export type ImportValue = { type: "string"; value: string } | { type: "number"; value: number } | { type: "date"; value: IsoDate } | { type: "ignored"; value: string };

export interface ImportColumn {
	title: string;
	fieldName: string;
	type: "string" | "number" | "date" | "ignored";
	required: boolean;
	parse: (rawValue: string) => ImportValue;
}

export interface ParsedImportData {
	headers: string[];
	rows: ImportValue[][];
}

export function parseImportData(importData: RawImportData, columns: ImportColumn[]): ParsedImportData {
	const rows = importData.rows.map((row) => {
		return row.map((rawValue, index) => columns[index].parse(rawValue));
	});

	return {
		headers: importData.headers,
		rows: rows,
	};
}
