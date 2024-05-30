import { parse } from "csv-parse/browser/esm/sync";

export interface ImportData {
	headers: string[];
	data: string[][];
}

export function parseImportData(csv: string): ImportData {
	const rows = parse(csv, {
		skip_empty_lines: true,
		trim: true,
	}) as string[][];

	return {
		headers: rows[0],
		data: rows.slice(1),
	};
}
