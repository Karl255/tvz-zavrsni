import type { IsoDate } from "$lib/model/transaction.model";

export const STANDARD_COLUMNS: ImportColumn[] = [
	{
		title: "Ignored",
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
	data: string[][];
}

export type ParsedData = { type: "string"; value: string } | { type: "number"; value: number } | { type: "date"; value: IsoDate } | { type: "ignored"; value: string };

export interface ImportColumn {
	title: string;
	fieldName: string;
	type: "string" | "number" | "date" | "ignored";
	required: boolean;
	parse: (rawValue: string) => ParsedData;
}

export interface ParsedImportData {
	headers: string[];
	data: ParsedData[][];
}

export function parseImportData(importData: RawImportData, columns: ImportColumn[]) {
	const rows = importData.data.map((row) => {
		return row.map((rawValue, index) => columns[index].parse(rawValue));
	});

	return {
		headers: importData.headers,
		data: rows,
	};
}
