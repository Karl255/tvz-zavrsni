<script lang="ts">
	import { DetailedTransaction } from "$lib/model/transaction.model";
	import Button from "../Button.svelte";
	import Icon, { IconType } from "../Icon.svelte";
	import { type Filter, applyFilter } from "./_filter";

	export let allTransactions: DetailedTransaction[];
	export let filteredTransactions = allTransactions;

	const filter: Filter = {
		descriptionSearch: "",
		amountMin: null,
		amountMax: null,
	};

	$: filteredTransactions = applyFilter(allTransactions, filter);
	$: console.info("filter", filter);

	function clearDescriptionSearch() {
		filter.descriptionSearch = "";
		showDescriptionFilter = false;
	}

	function clearAmountFilter() {
		filter.amountMin = null;
		filter.amountMax = null;
		showAmountFilter = false;
	}

	export let showDescriptionFilter = false;
	export let showAmountFilter = false;

	let isAnyFilterShown = false;
	$: isAnyFilterShown = showDescriptionFilter || showAmountFilter;
</script>

<div
	class="filters"
	class:hidden={!isAnyFilterShown}
>
	{#if showAmountFilter}
		<div class="filter-row">
			<!-- prettier-ignore -->
			<Button type="tertiary" small on:click={clearAmountFilter}>
				<Icon icon={IconType.X} />
			</Button>

			<p>
				<span class="field">Amount</span>
				is in range
			</p>

			<!-- prettier-ignore -->
			<div>
				<input type="number" step="0.01" bind:value={filter.amountMin}>
				<Icon icon={IconType.ARROW_RIGHT} inline />
				<input type="number" step="0.01" bind:value={filter.amountMax}>
			</div>
		</div>
	{/if}

	{#if showDescriptionFilter}
		<div class="filter-row">
			<!-- prettier-ignore -->
			<Button type="tertiary" small on:click={clearDescriptionSearch}>
				<Icon icon={IconType.X} />
			</Button>

			<p>
				<span class="field">Description</span>
				contains words
			</p>

			<input
				type="text"
				bind:value={filter.descriptionSearch}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.filters {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		margin-top: 1rem;
		margin-bottom: 2rem;

		background-color: $clr-light-gray;
		padding: 1rem 1rem 1rem 0.5rem;
		border-radius: 0.25rem;
		width: fit-content;
	}

	.filter-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.hidden {
		display: none;
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
		background: none;

		border-bottom: var(--_line-size) solid $clr-bold-text;
		margin-bottom: calc(0px - var(--_line-size));

		transition: border-bottom-color 100ms ease-out;

		&:focus {
			outline: none;
		}

		&:focus-visible {
			border-bottom-color: black;
		}

		&[type="number"] {
			max-width: 8rem;
			appearance: textfield;
		}
	}
</style>
