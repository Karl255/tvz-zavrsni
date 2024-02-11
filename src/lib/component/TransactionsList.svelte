<script lang="ts">
	import type { Account } from "$lib/model/account.model";
	import type { TransactionWithLabels } from "$lib/model/transaction.model";

	export let accounts: Account[];
	export let transactions: TransactionWithLabels[];

	let accountMap: Record<number, Account> = {};
	$: accountMap = accounts.reduce((map, account) => ({ ...map, [account.id]: account }), {})

	function getAccountById(accountId: number) {
		return accountMap[accountId];
	}
</script>

<table>
	<thead>
		<tr>
			<th>Amount</th>
			<th>Description</th>
			{#if accounts.length > 1}
				<th>Account</th>
			{/if}
			<th>Labels</th>
		</tr>
	</thead>

	<tbody>
		{#each transactions as transaction}
			<tr>
				<td>{transaction.amount.toFixed(2)} €</td>
				<td>{transaction.description}</td>
				{#if accounts.length > 1}
					<td>{getAccountById(transaction.accountId).name}</td>
				{/if}
				<td>{JSON.stringify(transaction.labels)}</td>
			</tr>
		{/each}
	</tbody>
</table>
