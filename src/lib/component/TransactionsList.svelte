<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import type { Account } from "$lib/model/account.model";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { onMount } from "svelte";
	import TransactionRow from "./TransactionRow.svelte";
	import TransactionEditor from "./TransactionEditor.svelte";
	import { deepCopy } from "$lib/util/util";

	const transactionApi = new TransactionApi();

	export let transactions: DetailedTransaction[];
	export let accounts: Account[];
	export let availableTags: string[];
	export let availableAttributes: string[];

	let accountMap: Record<number, Account> = {};
	$: accountMap = accounts.reduce((map, account) => ({ ...map, [account.id]: account }), {});

	let attributeColumns: string[] = getAllAttributes(transactions);
	$: attributeColumns = getAllAttributes(transactions);

	let scrollWrapper: HTMLDivElement;
	let allowScrolling = false;

	let editDialog: HTMLDialogElement;
	let transactionBeingEdited: DetailedTransaction | null = null;

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

	function saveEdited(transaction: DetailedTransaction) {
		console.log("should save", transaction);
	}

	function cancelEdit() {
		transactionBeingEdited = null;
		editDialog.close();
	}

	async function onDelete(transactionId: number) {
		const response = await transactionApi.delete(transactionId);

		if (response.ok) {
			transactions = transactions.filter((transaction) => transaction.id !== transactionId);
		}
	}

	function sortedTransactions(transactions: DetailedTransaction[]) {
		return transactions.toSorted(compare);

		function compare(a: DetailedTransaction, b: DetailedTransaction): number {
			return new Date(b.date).valueOf() - new Date(a.date).valueOf() || b.id - a.id;
		}
	}
</script>

<div
	class="container"
	bind:this={scrollWrapper}
	class:scroll={allowScrolling}
>
	<table>
		<tr>
			<th>Amount</th>
			<th>Description</th>
			<th>Date</th>

			{#if accounts.length > 1}
				<th>Account</th>
			{/if}

			<th>Tags</th>

			{#each attributeColumns as attribute}
				<th>{attribute}</th>
			{/each}

			<th></th>
		</tr>

		{#each sortedTransactions(transactions) as transaction}
			<tr>
				<TransactionRow
					{transaction}
					{attributeColumns}
					accountResolver={accounts.length > 1 ? getAccountById : undefined}
					onEdit={startEdit}
					{onDelete}
				/>
			</tr>
		{/each}
	</table>
</div>

<dialog bind:this={editDialog}>
	{#if transactionBeingEdited}
		<TransactionEditor
			transaction={transactionBeingEdited}
			{accounts}
			{availableTags}
			{availableAttributes}
			onUpdate={saveEdited}
			onCancel={cancelEdit}
		/>
	{/if}
</dialog>

<style lang="scss">
	.container {
		overflow-x: hidden;
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

	tr:nth-child(even) {
		background-color: $clr-light-gray;
	}

	th {
		font-weight: $fw-bold;
	}

	th,
	:global(td) {
		padding: 0.5rem 1rem;
	}

	dialog {
		width: 32rem;
		border: none;
		border-radius: 0.5rem;
		box-shadow: 0 0 0.25rem rgb(0 0 0 / 0.75);

		&::backdrop {
			background-color: black;
			opacity: 0.25;
		}
	}
</style>
