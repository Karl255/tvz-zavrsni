<script lang="ts">
	import { browser } from "$app/environment";
	import { getAppContext } from "$lib/app.context";
	import { DetailedTransaction } from "$lib/model/transaction.model";
	import Button from "../Button.svelte";
	import Icon, { IconType } from "../Icon.svelte";
	import { type Filter, applyFilter } from "./_filter";

	export let allTransactions: DetailedTransaction[];
	export let filteredTransactions = allTransactions;

	const appContext = getAppContext();

	const filter: Filter = {
		descriptionSearch: "",
		amountMin: null,
		amountMax: null,
		dateFrom: null,
		dateTo: null,
		accountIds: [],
	};

	$: filteredTransactions = applyFilter(allTransactions, filter);

	$: {
		if (browser) {
			console.info("filter", filter);
		}
	}

	let accountPicker: HTMLDialogElement;

	function clearAmountFilter() {
		filter.amountMin = null;
		filter.amountMax = null;
		showAmountFilter = false;
	}

	function clearDescriptionSearch() {
		filter.descriptionSearch = "";
		showDescriptionFilter = false;
	}

	function clearDateFilter() {
		filter.dateFrom = null;
		filter.dateTo = null;
		showDateFilter = false;
	}

	function clearAccountFilter() {
		filter.accountIds = [];
		showAccountFilter = false;
	}

	export let showAmountFilter = false;
	export let showDescriptionFilter = false;
	export let showDateFilter = false;
	export let showAccountFilter = false;

	let isAnyFilterShown = false;
	$: isAnyFilterShown = showAmountFilter || showDescriptionFilter || showDateFilter || showAccountFilter;
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
				<input type="number" class="input" step="0.01" bind:value={filter.amountMin}>
				<Icon icon={IconType.ARROW_RIGHT} inline />
				<input type="number" class="input" step="0.01" bind:value={filter.amountMax}>
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
				class="input"
				bind:value={filter.descriptionSearch}
			/>
		</div>
	{/if}

	{#if showDateFilter}
		<div class="filter-row">
			<!-- prettier-ignore -->
			<Button type="tertiary" small on:click={clearDateFilter}>
				<Icon icon={IconType.X} />
			</Button>

			<p>
				<span class="field">Date</span>
				is in range
			</p>

			<!-- prettier-ignore -->
			<div>
				<input type="date" class="input" bind:value={filter.dateFrom}>
				<Icon icon={IconType.ARROW_RIGHT} inline />
				<input type="date" class="input" bind:value={filter.dateTo}>
			</div>
		</div>
	{/if}

	{#if showAccountFilter}
		<div class="filter-row">
			<!-- prettier-ignore -->
			<Button type="tertiary" small on:click={clearAccountFilter}>
				<Icon icon={IconType.X} />
			</Button>

			<p>
				<span class="field">Account</span>
				is one of
			</p>

			<span class="input">
				{filter.accountIds.map((accountId) => appContext.accounts.find((account) => account.id === accountId)?.name)}
			</span>

			<!-- prettier-ignore -->
			<Button type="tertiary" small on:click={() => (accountPicker.showModal())}>
				<Icon icon={IconType.SELECT_LIST} />
			</Button>

			<dialog
				class="modal"
				bind:this={accountPicker}
			>
				<div class="account-picker">
					<select
						multiple
						bind:value={filter.accountIds}
					>
						{#each appContext.accounts as account}
							<option value={account.id}>{account.name}</option>
						{/each}
					</select>

					<!-- prettier-ignore -->
					<Button type="primary" on:click={() => accountPicker.close()}>Close</Button>
				</div>
			</dialog>
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
		max-width: 100%;
	}

	.hidden {
		display: none;
	}

	.field {
		font-weight: $fw-bold;
	}

	input {
		min-width: 0;
		margin: 0;
		padding: 0;
		border: none;
		background: none;

		&:focus {
			outline: none;
		}

		&[type="number"] {
			max-width: 8rem;
			appearance: textfield;
		}
	}

	input.input {
		transition: border-bottom-color 100ms ease-out;

		&:focus-visible {
			border-bottom-color: black;
		}
	}

	.input {
		--_line-size: 2px;
		border-bottom: var(--_line-size) solid $clr-bold-text;
		margin-bottom: calc(0px - var(--_line-size));
	}

	.modal {
		min-width: 10rem;
	}

	.account-picker {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		:global(button) {
			align-self: center;
		}
	}
</style>
