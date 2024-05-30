export interface ImportColumn {
	title: string;
	fieldName: string;
	type: "string" | "number" | "date";
}

export const STANDARD_COLUMNS: ImportColumn[] = [
	{
		title: "External ID",
		fieldName: "importedId",
		type: "string",
	},
	{
		title: "Amount",
		fieldName: "amount",
		type: "number",
	},
	{
		title: "Description",
		fieldName: "description",
		type: "string",
	},
	{
		title: "Date",
		fieldName: "date",
		type: "date",
	},
];
