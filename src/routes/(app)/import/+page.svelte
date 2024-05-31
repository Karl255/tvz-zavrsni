<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import TransactionsList from "$lib/component/TransactionList/TransactionsList.svelte";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { parseTransactions, type ImportColumn, type RawImportData } from "$lib/service/import.service";
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
		transactions: DetailedTransaction[]
	} | {
		step: Step.DONE;
	};

	let state: State = { step: Step.CHOOSE_FILE };

	async function chooseFile(file: File) {
		const csv = await file.text();
		state = {
			step: Step.MAP_COLUMNS,
			importData: parseCsv(csv),
		};
	}

	function pickData(columnMapping: ImportColumn[], accountId: number) {
		if (state.step !== Step.MAP_COLUMNS) {
			return;
		}

		const transactions = parseTransactions(state.importData, columnMapping, accountId).map((transaction, index) => ({ ...transaction, id: index }));

		state = {
			step: Step.REVIEW_DATA,
			importData: state.importData,
			transactions,
		};
	}

	function importTransactions(transactions: DetailedTransaction[]) {
		transactionApi.import(transactions.map((t) => ({ ...t, id: undefined })));
	}
</script>

<ImportProgress step={state.step} />

<div class="stack">
	{#if state.step === Step.CHOOSE_FILE}
		<div class="step">
			<FilePicker onPick={chooseFile} />
			<p>Here you can import data from a CSV file. The CSV file is required to have headers.</p>
		</div>
	{/if}

	{#if state.step === Step.MAP_COLUMNS}
		<div class="step">
			<DataPicker
				importData={state.importData}
				accounts={data.accounts}
				onCancel={() => (state = { step: Step.CHOOSE_FILE })}
				onProceed={pickData}
			/>
		</div>
	{/if}

	{#if state.step === Step.REVIEW_DATA}
		<div class="step">
			<ReviewTable
				transactions={state.transactions}
				accounts={data.accounts}
				availableTags={[]}
				availableAttributes={[]}
				onCancel={() => (state = { step: Step.MAP_COLUMNS, importData: state.importData })}
				onImport={importTransactions}
			/>
		</div>
	{/if}

	{#if state.step === Step.DONE}
		<div class="step">
			<p>finito</p>
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
		gap: 1rem;
	}
</style>
