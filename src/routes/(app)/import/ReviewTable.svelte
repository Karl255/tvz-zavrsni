<script lang="ts">
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import type { ImportColumn, ParsedImportData } from "$lib/service/import.service";

	export let importData: ParsedImportData;
	export let columns: ImportColumn[];
	export let onCancel: () => void;
	export let onImport: (transactions: Omit<DetailedTransaction, "id">[]) => void;
	let isValid = true;
	$: console.log(importData);

	function next() {
		onImport([]);
	}
</script>

<div class="container">
	<!-- prettier-ignore -->
	<div class="actions">
		<Button type="tertiary" on:click={onCancel}>
			<Icon icon={IconType.ARROW_LEFT} />
			Back
		</Button>
		
		<Button type="primary" disabled={!isValid} on:click={next}>
			Import
			<Icon icon={IconType.IMPORT} />
		</Button>
	</div>

	<table>
		<tr>
			{#each importData.headers as header, index}
				<th>
					<div
						class="column-title"
						class:ignored={columns[index].type === "ignored"}
					>
						{columns[index]?.title ?? "-"}
					</div>
					<div class="column-csv">{header}</div>
				</th>
			{/each}
		</tr>

		{#each importData.rows as row}
			<tr>
				{#each row as value}
					<td>
						{#if value.type === "string"}
							<input
								type="text"
								bind:value={value.value}
							/>
						{:else if value.type === "number"}
							<input
								type="number"
								bind:value={value.value}
							/>
						{:else if value.type === "date"}
							<input
								type="date"
								bind:value={value.value}
							/>
						{:else}
							{value.value}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	table {
		border-collapse: collapse;
		table-layout: auto;
	}

	tr:nth-child(even) {
		background-color: $clr-light-gray;
	}

	.column-title {
		font-weight: $fw-bold;

		&.ignored {
			font-weight: unset;
		}
	}

	.column-csv {
		font-style: italic;
	}

	th,
	td {
		padding: 0.5rem 1rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	input {
		--_line-size: 2px;

		width: 100%;
		border: none;
		background: none;
		margin: 0;
		padding: 0;

		border-bottom: var(--_line-size) solid transparent;
		margin-bottom: calc(0px - var(--_line-size));

		transition: border-bottom-color 100ms ease-out;

		&:focus {
			outline: none;
		}

		&:focus-visible {
			border-bottom-color: black !important;
		}
	}

	tr:hover input,
	tr:focus-within input {
		border-bottom-color: $clr-faded-text;
	}
</style>
