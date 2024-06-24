<script lang="ts">
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import TransactionsList from "$lib/component/TransactionList/TransactionsList.svelte";
	import { AccountType } from "$lib/model/account.model";
	import type { Transaction } from "$lib/model/transaction.model";
	import type { PageData } from "./$types";

	export let data: PageData;

	function sumBalance(transactions: Transaction[]) {
		return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
	}
</script>

<svelte:head>
	<title>Transactions - {data.account.name}</title>
</svelte:head>

<h1 class="sr-only">You are viewing the account:</h1>

<article class="account">
	<div class="account__info">
		<!-- prettier-ignore -->
		<p class="account__name" title="name">{data.account.name}</p>

		{#if data.account.type === AccountType.CHECKING}
			<Icon icon={IconType.CARD} />
		{:else}
			<Icon icon={IconType.PIGGYBANK} />
		{/if}
	</div>

	<!-- prettier-ignore -->
	<p class="account__balance" title="balance">{sumBalance(data.transactions).toFixed(2)} €</p>
</article>

<TransactionsList bind:transactions={data.transactions} />

<style lang="scss">
	.account {
		background-color: $clr-light-gray;
		border-radius: 5px;
		padding: 1rem;

		width: fit-content;
		margin-bottom: 2rem;

		&__info {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.75rem;

			font-weight: $fw-bold;
			color: $clr-bold-text;
		}
	}
</style>
