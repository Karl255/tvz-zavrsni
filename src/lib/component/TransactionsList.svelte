<script lang="ts">
	import { transactionApi } from "$lib/api/transaction.api";
	import type { Account } from "$lib/model/account.model";
	import type { TransactionWithLabels } from "$lib/model/transaction.model";
	import TransactionRow from "./TransactionRow.svelte";

	export let accounts: Account[];
	export let transactions: TransactionWithLabels[];

	let accountMap: Record<number, Account> = {};
	$: accountMap = accounts.reduce((map, account) => ({ ...map, [account.id]: account }), {})

	function getAccountById(accountId: number) {
		return accountMap[accountId];
	}

	function updateTransaction(newTransaction: TransactionWithLabels) {
		transactions = transactions.map((transaction) => (transaction.id === newTransaction.id ? newTransaction : transaction));
	}

	async function deleteTransaction(transactionId: number) {
		const response = await transactionApi.delete(transactionId);

		if (response.ok) {
			transactions = transactions.filter((transaction) => transaction.id !== transactionId);
		}
	}
</script>

<table>
	<tr>
		<th>Amount</th>
		<th>Description</th>

		{#if accounts.length > 1}
			<th>Account</th>
		{/if}

		<th>Labels</th>
		<th>Actions</th>
	</tr>

	{#each transactions as transaction}
		<!--
		<tr>
			<td
				class="amount"
				class:positive={transaction.amount > 0}
				class:negative={transaction.amount < 0}
			>
				{transaction.amount.toFixed(2)} €</td
			>

			<td>{transaction.description}</td>

			{#if accounts.length > 1}
				<td>{getAccountById(transaction.accountId).name}</td>
			{/if}

			<td>{JSON.stringify(transaction.labels)}</td>

			<td class="actions">
				<button on:click={() => editTransaction(transaction.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
				</button>

				<button on:click={() => deleteTransaction(transaction.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
				</button>
			</td>
		</tr>
		-->

		<tr>
			<TransactionRow
				{transaction}
				accountResolver={getAccountById}
				{updateTransaction}
				{deleteTransaction}
			/>
		</tr>
	{/each}
</table>

<style lang="scss">
	table {
		border-collapse: collapse;
		table-layout: auto;
		max-width: 100%;
	}

	tr:nth-child(even) {
		background-color: $clr-light-gray;
	}

	th {
		font-weight: $fw-bold;
	}

	th,
	:global(td) {
		padding: 0.5rem 1.5rem;
	}
</style>
