<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import type { Account } from "$lib/model/account.model";
	import type { TransactionWithLabels } from "$lib/model/transaction.model";
	import TransactionRow from "./TransactionRow.svelte";

	const transactionApi = new TransactionApi(fetch);

	export let accounts: Account[];
	export let transactions: TransactionWithLabels[];

	let accountMap: Record<number, Account> = {};
	$: accountMap = accounts.reduce((map, account) => ({ ...map, [account.id]: account }), {});

	function getAccountById(accountId: number) {
		return accountMap[accountId];
	}

	async function updateTransaction(newTransaction: TransactionWithLabels) {
		const response = await transactionApi.update(newTransaction.id, newTransaction.amount, newTransaction.description, newTransaction.date);

		if (response.ok) {
			transactions = transactions.map((transaction) => (transaction.id === newTransaction.id ? newTransaction : transaction));
		}
	}

	async function deleteTransaction(transactionId: number) {
		const response = await transactionApi.delete(transactionId);

		if (response.ok) {
			transactions = transactions.filter((transaction) => transaction.id !== transactionId);
		}
	}

	function sortTransactions(transactions: TransactionWithLabels[]) {
		return transactions.toSorted((a, b) => (a.date < b.date ? 1 : 0));
	}
</script>

<table>
	<tr>
		<th>Amount</th>
		<th>Description</th>
		<th>Date</th>

		{#if accounts.length > 1}
			<th>Account</th>
		{/if}

		<th>Labels</th>
		<th>Actions</th>
	</tr>

	{#each sortTransactions(transactions) as transaction}
		<tr>
			<TransactionRow
				{transaction}
				accountResolver={accounts.length > 1 ? getAccountById : undefined}
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
