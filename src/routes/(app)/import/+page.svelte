<script lang="ts">
	import type { ImportColumn } from "$lib/service/import.service";
	import { parseImportData, type ImportData } from "$lib/util/csv.util";
	import type { PageData } from "./$types";
	import DataPicker from "./DataPicker.svelte";
	import FilePicker from "./FilePicker.svelte";
	import ImportProgress from "./ImportProgress.svelte";
	import ReviewTable from "./ReviewTable.svelte";

	export let data: PageData;

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
		importData: ImportData;
	} | {
		step: Step.REVIEW_DATA;
		importData: ImportData;
		columns: (ImportColumn | null)[],
		accountId: number,
	} | {
		step: Step.DONE;
	};

	let state: State = { step: Step.CHOOSE_FILE };

	async function chooseFile(file: File) {
		const csv = await file.text();
		state = {
			step: Step.MAP_COLUMNS,
			importData: parseImportData(csv),
		};
	}

	function pickData(columnMapping: (ImportColumn | null)[], accountId: number) {
		if (state.step !== Step.MAP_COLUMNS) {
			return;
		}

		state = {
			step: Step.REVIEW_DATA,
			columns: columnMapping,
			accountId,
			importData: state.importData,
		};
	}

	function importData() {}
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
				importData={state.importData}
				columns={state.columns}
				onCancel={() => (state = { step: Step.MAP_COLUMNS, importData: state.importData})}
				onImport={importData}
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
