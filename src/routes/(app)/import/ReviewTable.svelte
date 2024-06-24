<script lang="ts">
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import TransactionsList from "$lib/component/TransactionList/TransactionsList.svelte";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { validateTransaction } from "$lib/service/validation.service";

	export let transactions: DetailedTransaction[];
	export let onCancel: () => void;
	export let onImport: (transactions: DetailedTransaction[]) => void;

	let isValid = false;
	$: isValid = transactions.every((transaction) => validateTransaction(transaction));

	function next() {
		onImport(transactions);
	}
</script>

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

<p class="note">Note: filters you set here won't affect the importing</p>

<TransactionsList bind:transactions />

<style lang="scss">
	.actions {
		align-self: stretch;

		display: flex;
		gap: 1rem;
		justify-content: space-between;
		margin-bottom: 2rem;
	}
</style>
