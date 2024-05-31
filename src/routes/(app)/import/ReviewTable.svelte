<script lang="ts">
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import type { ImportColumn, ParsedImportData } from "$lib/service/import.service";

	export let importData: ParsedImportData;
	export let columns: (ImportColumn | null)[];
	export let onCancel: () => void;
	export let onImport: (transactions: Omit<DetailedTransaction, "id">[]) => void;
	let isValid = true;

	function next() {
		onImport([]);
	}
</script>

<div class="container">
	<table>
		<tr>
			{#each importData.headers as header, index}
				<th>
					<div
						class="column-title"
						class:ignored={columns[index] === null}
					>
						{columns[index]?.title ?? "-"}
					</div>
					<div class="column-csv">{header}</div>
				</th>
			{/each}
		</tr>

		{#each importData.data as row}
			<tr>
				{#each row as item}
					<td>{item}</td>
				{/each}
			</tr>
		{/each}
	</table>

	<!-- prettier-ignore -->
	<div class="actions">
		<Button type="tertiary" on:click={onCancel}>
			<Icon icon={IconType.ARROW_LEFT} />
			Back
		</Button>
		
		<Button type="primary" disabled={!isValid} on:click={next}>
			Next
			<Icon icon={IconType.ARROW_RIGHT} />
		</Button>
	</div>
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
	}
</style>
