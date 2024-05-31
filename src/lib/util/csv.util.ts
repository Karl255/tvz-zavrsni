import type { RawImportData } from "$lib/service/import.service";
import { parse } from "csv-parse/browser/esm/sync";

export function parseCsv(csv: string): RawImportData {
	const rows = parse(csv, {
		skip_empty_lines: true,
		trim: true,
	}) as string[][];

	return {
		headers: rows[0],
		rows: rows.slice(1),
	};
}
