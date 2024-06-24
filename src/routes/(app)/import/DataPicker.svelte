<script lang="ts">
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { Account } from "$lib/model/account.model";
	import { REQUIRED_COLUMNS, STANDARD_COLUMNS, type ImportColumn, type RawImportData } from "$lib/service/import.service";

	export let importData: RawImportData;
	export let accounts: Account[];
	export let onCancel: () => void;
	export let onProceed: (columnMapping: ImportColumn[], accountId: number) => void;

	let columns: ImportColumn[] = importData.headers.map(() => STANDARD_COLUMNS[0]);
	let accountId: number | null = null;

	let isValid = validate(columns, accountId);
	$: isValid = validate(columns, accountId);

	function validate(columns: ImportColumn[], accountId: number | null): accountId is number {
		return REQUIRED_COLUMNS.every((standardColumn) => columns.includes(standardColumn)) && accountId !== null;
	}

	function proceed() {
		if (!validate(columns, accountId)) {
			return;
		}

		onProceed(columns, accountId);
	}
</script>

<!-- prettier-ignore -->
<div class="actions">
	<Button type="tertiary" on:click={onCancel}>
		<Icon icon={IconType.ARROW_LEFT} />
		Back
	</Button>
	
	<Button type="primary" disabled={!isValid} on:click={proceed}>
		Next
		<Icon icon={IconType.ARROW_RIGHT} />
	</Button>
</div>

<div class="container">
	<div class="account">
		<label for="accountId">Account</label>

		<select
			id="accountId"
			bind:value={accountId}
		>
			{#each accounts as account}
				<option value={account.id}>{account.name}</option>
			{/each}
		</select>
	</div>

	<div class="column-mapping">
		<p>Columns in your file:</p>

		{#each importData.headers as header, i}
			<label for="column-{header}">{header}</label>

			<select
				id="column-{header}"
				bind:value={columns[i]}
			>
				{#each STANDARD_COLUMNS as column}
					<option value={column}>{column.title}</option>
				{/each}
			</select>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		max-width: 18rem;

		> * + * {
			margin-top: 2rem;
		}
	}

	.account {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1rem;
	}

	.column-mapping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.5rem 1rem;

		p {
			grid-column: 1 / -1;
		}
	}

	.actions {
		align-self: stretch;

		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}
</style>
