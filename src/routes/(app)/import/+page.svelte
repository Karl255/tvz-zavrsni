<script lang="ts">
	import FilePicker from "./FilePicker.svelte";
	import ImportProgress from "./ImportProgress.svelte";

	enum Step {
		CHOOSE_FILE = 1,
		REVIEW_DATA = 2,
		DONE = 3,
	}

	let step = Step.CHOOSE_FILE;
	let csv: string | null = null;

	async function chooseFile(file: File) {
		csv = await file.text();
		step = Step.REVIEW_DATA;
	}
</script>

<ImportProgress {step} />

<div class="stack">
	<div
		class="step"
		class:visible={step === Step.CHOOSE_FILE}
	>
		<FilePicker onPick={chooseFile} />
	</div>

	<div
		class="step"
		class:visible={step === Step.REVIEW_DATA}
	>
		{#if csv}
			<pre>{csv}</pre>
		{/if}
	</div>
</div>

<style lang="scss">
	.stack {
		display: grid;
	}

	.step {
		grid-area: 1 / 1;
		visibility: hidden;
	}

	.step.visible {
		visibility: visible;
	}
</style>
