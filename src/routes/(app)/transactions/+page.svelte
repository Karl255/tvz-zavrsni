<script lang="ts">
	import TransactionsList from "$lib/component/TransactionsList.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="content">
	<h1 class="title">Transaction history</h1>

	<div>
		<TransactionsList
			transactions={data.transactions}
			accounts={data.accounts}
			availableTags={data.availableTags}
			availableAttributes={data.availableAttributes}
		/>
	</div>
</div>

<style lang="scss">
	.content > * + * {
		margin-top: 2rem;
	}
</style>
