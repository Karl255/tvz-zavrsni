<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { DateFormat, parseTransactions, type ImportColumn, type RawImportData } from "$lib/service/import.service";
	import { parseCsv } from "$lib/util/csv.util";
	import type { PageData } from "./$types";
	import DataPicker from "./DataPicker.svelte";
	import FilePicker from "./FilePicker.svelte";
	import ImportProgress from "./ImportProgress.svelte";
	import ReviewTable from "./ReviewTable.svelte";

	export let data: PageData;

	const transactionApi = new TransactionApi();

	enum Step {
		CHOOSE_FILE = 1,
		MAP_COLUMNS = 2,
		REVIEW_DATA = 3,
		DONE = 4,
	}

	// prettier-ignore
	type State = {
		step: Step.CHOOSE_FILE;
	} | {
		step: Step.MAP_COLUMNS;
		importData: RawImportData;
	} | {
		step: Step.REVIEW_DATA;
		importData: RawImportData;
		transactions: DetailedTransaction[];
	} | {
		step: Step.DONE;
		total: number;
		created: number;
	};

	let state: State = { step: Step.CHOOSE_FILE };

	async function chooseFile(file: File) {
		const csv = await file.text();
		state = {
			step: Step.MAP_COLUMNS,
			importData: parseCsv(csv),
		};
	}

	function transformData(columnMapping: ImportColumn[], accountId: number, dateFormat: DateFormat) {
		if (state.step !== Step.MAP_COLUMNS) {
			return;
		}

		const transactions = parseTransactions(state.importData, columnMapping, accountId, dateFormat).map((transaction, index) => ({ ...transaction, id: index }));

		state = {
			step: Step.REVIEW_DATA,
			importData: state.importData,
			transactions,
		};
	}

	async function importTransactions(transactions: DetailedTransaction[]) {
		const response = await transactionApi.import(transactions.map((t) => ({ ...t, id: undefined })));

		if (!response.ok) {
			console.error(await response.json());
			return;
		}

		const created = (await response.json()).created as number;

		state = {
			step: Step.DONE,
			total: transactions.length,
			created,
		};
	}
</script>

<ImportProgress step={state.step} />

<div class="stack">
	{#if state.step === Step.CHOOSE_FILE}
		<div class="step">
			<p>Here you can import data from a CSV file. The CSV file has to have headers.</p>
			<FilePicker onPick={chooseFile} />
		</div>
	{/if}

	{#if state.step === Step.MAP_COLUMNS}
		<div class="step">
			<DataPicker
				importData={state.importData}
				accounts={data.accounts}
				onCancel={() => (state = { step: Step.CHOOSE_FILE })}
				onProceed={transformData}
			/>
		</div>
	{/if}

	{#if state.step === Step.REVIEW_DATA}
		<div class="step">
			<ReviewTable
				transactions={state.transactions}
				accounts={data.accounts}
				availableTags={data.availableTags}
				availableAttributes={data.availableAttributes}
				onCancel={() => (state = { step: Step.MAP_COLUMNS, importData: state.importData })}
				onImport={importTransactions}
			/>
		</div>
	{/if}

	{#if state.step === Step.DONE}
		<div class="step">
			<p>
				<Icon
					icon={state.created > 0 ? IconType.CHECK : IconType.X}
					inline
				/>
				Created {state.created} out of {state.total} provided transactions
			</p>
			<Button
				type="primary"
				on:click={() => (state = { step: Step.CHOOSE_FILE })}
			>
				Import again
			</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.stack {
		display: grid;
	}

	.step {
		grid-area: 1 / 1;

		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 1rem;
	}
</style>
