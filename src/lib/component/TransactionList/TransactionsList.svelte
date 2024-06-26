<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import type { Account } from "$lib/model/account.model";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { onMount } from "svelte";
	import Row from "./_Row.svelte";
	import TransactionEditor from "../TransactionEditor.svelte";
	import { deepCopy } from "$lib/util/util";
	import Filter from "./_Filter.svelte";
	import Icon, { IconType } from "../Icon.svelte";
	import Button from "../Button.svelte";
	import Aggregate from "./_Aggregate.svelte";
	import { getAppContext } from "$lib/app.context";
	import { invalidateAll } from "$app/navigation";

	const appContext = getAppContext();
	const transactionApi = new TransactionApi();

	export let transactions: DetailedTransaction[];
	let filteredTransactions = transactions;

	let accountMap: Record<number, Account> = {};
	$: accountMap = appContext.accounts.reduce((map, account) => ({ ...map, [account.id]: account }), {});

	let attributeColumns: string[] = getAllAttributes(filteredTransactions);
	$: attributeColumns = getAllAttributes(filteredTransactions);

	let scrollWrapper: HTMLDivElement;
	let allowScrolling = false;

	let editDialog: HTMLDialogElement;
	let transactionBeingEdited: DetailedTransaction | null = null;

	// for filter only
	let showDescriptionFilter: boolean;
	let showAmountFilter: boolean;
	let showDateFilter: boolean;
	let showAccountFilter: boolean;
	let showTagsFilter: boolean;
	let shownAttributeSearches: string[];

	onMount(() => {
		const width = scrollWrapper.clientWidth;
		scrollWrapper.style.maxWidth = `${width}px`;
		allowScrolling = true;
	});

	function getAllAttributes(transactions: DetailedTransaction[]): string[] {
		return [...new Set(transactions.flatMap((transaction) => Object.keys(transaction.attributes)))];
	}

	function getAccountById(accountId: number) {
		return accountMap[accountId];
	}

	function startEdit(transactionId: number) {
		const transaction = transactions.find((transaction) => transaction.id === transactionId);

		if (!transaction) {
			return;
		}

		transactionBeingEdited = deepCopy(transaction);
		editDialog.showModal();
	}

	async function saveEdited(transaction: DetailedTransaction) {
		const response = await transactionApi.update(
			transaction.id,
			transaction.amount,
			transaction.description,
			transaction.date,
			undefined,
			transaction.tags,
			transaction.attributes,
		);

		if (!response.ok) {
			return;
		}

		transactions = transactions.map((t) => (t.id === transaction.id ? transaction : t));

		closeEditor();
		invalidateAll();
	}

	function closeEditor() {
		editDialog.close();
		transactionBeingEdited = null;
	}

	async function onDelete(transactionId: number) {
		const response = await transactionApi.delete(transactionId);

		if (response.ok) {
			transactions = transactions.filter((transaction) => transaction.id !== transactionId);
			invalidateAll();
		}
	}

	function sorted(transactions: DetailedTransaction[]) {
		return transactions.toSorted(compare);

		function compare(a: DetailedTransaction, b: DetailedTransaction): number {
			return new Date(b.date).valueOf() - new Date(a.date).valueOf() || b.id - a.id;
		}
	}

	function showAttributeSearch(attribute: string) {
		shownAttributeSearches.push(attribute);
		shownAttributeSearches = shownAttributeSearches;
	}
</script>

<div
	class="container"
	bind:this={scrollWrapper}
	class:scroll={allowScrolling}
>
	<div class="filter">
		<Filter
			allTransactions={transactions}
			bind:filteredTransactions
			bind:showDescriptionFilter
			bind:showAmountFilter
			bind:showDateFilter
			bind:showAccountFilter
			bind:showTagsFilter
			bind:shownAttributeSearches
		/>
	</div>

	<table>
		<tr>
			<th>
				Amount

				<span class="filter-button">
					<!-- prettier-ignore -->
					<Button type="icon" on:click={() => showAmountFilter = true}>
						<Icon icon={IconType.FILTER} />
					</Button>
				</span>
			</th>

			<th>
				Description

				<span class="filter-button">
					<!-- prettier-ignore -->
					<Button type="icon" on:click={() => showDescriptionFilter = true}>
						<Icon icon={IconType.FILTER} />
					</Button>
				</span>
			</th>

			<th>
				Date

				<span class="filter-button">
					<!-- prettier-ignore -->
					<Button type="icon" on:click={() => showDateFilter = true}>
						<Icon icon={IconType.FILTER} />
					</Button>
				</span>
			</th>

			{#if appContext.accounts.length > 1}
				<th>
					Account

					<span class="filter-button">
						<!-- prettier-ignore -->
						<Button type="icon" on:click={() => showAccountFilter = true}>
							<Icon icon={IconType.FILTER} />
						</Button>
					</span>
				</th>
			{/if}

			<th>
				Tags

				<span class="filter-button">
					<!-- prettier-ignore -->
					<Button type="icon" on:click={() => showTagsFilter = true}>
						<Icon icon={IconType.FILTER} />
					</Button>
				</span>
			</th>

			{#each attributeColumns as attribute}
				<th>
					{attribute}

					<span class="filter-button">
						<!-- prettier-ignore -->
						<Button type="icon" on:click={() => showAttributeSearch(attribute)}>
							<Icon icon={IconType.FILTER} />
						</Button>
					</span>
				</th>
			{/each}

			<th></th>
		</tr>

		{#each sorted(filteredTransactions) as transaction (transaction)}
			<Row
				{transaction}
				{attributeColumns}
				accountResolver={appContext.accounts.length > 1 ? getAccountById : undefined}
				onEdit={startEdit}
				{onDelete}
			/>
		{/each}
	</table>

	<Aggregate transactions={filteredTransactions} />
</div>

<dialog
	class="modal"
	bind:this={editDialog}
>
	{#if transactionBeingEdited}
		<TransactionEditor
			transaction={transactionBeingEdited}
			onUpdate={saveEdited}
			onCancel={closeEditor}
		/>
	{/if}
</dialog>

<style lang="scss">
	.container {
		overflow-x: hidden;
	}

	.filter {
		max-width: 100%;
	}

	table {
		border-collapse: collapse;
		table-layout: auto;
	}

	.scroll {
		overflow-x: auto;

		table {
			width: max-content;
		}
	}

	th {
		font-weight: $fw-bold;
		position: relative;

		.filter-button {
			position: absolute;
			visibility: hidden;
			color: $clr-icon;
			margin-left: 0.15rem;
		}

		&:hover .filter-button {
			visibility: visible;
		}
	}

	th,
	:global(td) {
		padding: 0.5rem 1rem;
	}

	dialog {
		width: 32rem;
	}
</style>
