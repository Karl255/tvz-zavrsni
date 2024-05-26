<script lang="ts">
	import { DetailedTransaction } from "$lib/model/transaction.model";
	import Button from "../Button.svelte";
	import Icon, { IconType } from "../Icon.svelte";

	export let allTransactions: DetailedTransaction[];
	export let filteredTransactions = allTransactions;
	export let showDescriptionFilter = false;

	const filters = {
		descriptionSearch: "",
	};

	$: filteredTransactions = applyFilter(allTransactions, filters);

	function applyFilter(transactions: DetailedTransaction[], f: typeof filters) {
		const descriptionWords = f.descriptionSearch.split(/ +/).map((word) => word.toLocaleLowerCase());

		return transactions.filter((transaction) => {
			return descriptionWords.every((word) => transaction.description.toLocaleLowerCase().includes(word));
		});
	}

	let isAnyFilterShown = false;
	$: isAnyFilterShown = showDescriptionFilter;
</script>

<div
	class="filters"
	class:mb-1r={isAnyFilterShown}
>
	{#if showDescriptionFilter}
		<p>
			<span class="field">Description</span>
			contains words
		</p>

		<input
			type="text"
			bind:value={filters.descriptionSearch}
		/>

		<!-- prettier-ignore -->
		<Button type="tertiary" small on:click={() => showDescriptionFilter = false}>
			<Icon icon={IconType.X} />
		</Button>
	{/if}
</div>

<style lang="scss">
	.filters {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.5rem;
	}

	.mb-1r {
		margin-bottom: 1rem;
	}

	.field {
		font-weight: $fw-bold;
	}

	input {
		--_line-size: 2px;

		min-width: 0;
		margin: 0;
		padding: 0;
		border: none;

		border-bottom: var(--_line-size) solid black;
		border-radius: 0.25rem;
		margin-bottom: calc(0px - var(--_line-size));

		&:focus {
			outline: none;
		}
	}
</style>
