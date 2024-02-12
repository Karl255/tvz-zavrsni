import postgres from "postgres";

const options = {
	types: {
		numeric: {
			to: 0,
			from: [1700],
			serialize: (x: unknown) => "" + x,
			parse: (x: string) => +x,
		},
	},
	transform: postgres.camel,
};

export const sql = process.env.POSTGRES_URL ? postgres(process.env.POSTGRES_URL, options) : postgres(options);
