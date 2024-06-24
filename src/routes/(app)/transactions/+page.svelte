<script lang="ts">
	import TransactionsList from "$lib/component/TransactionList/TransactionsList.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Transactions</title>
</svelte:head>

<div class="content">
	<h1 class="title">Transaction history</h1>

	<div>
		<TransactionsList transactions={data.transactions} />
	</div>
</div>

<style lang="scss">
	.content > * + * {
		margin-top: 2rem;
	}
</style>
