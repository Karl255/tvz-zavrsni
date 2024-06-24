<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import type { PageData } from "./$types";
	import TransactionEditor, { type NewOrExistingTransaction } from "$lib/component/TransactionEditor.svelte";
	import type { NoId } from "$lib/util/type.util";

	export let data: PageData;

	const transactionApi = new TransactionApi();

	let transaction: NewOrExistingTransaction = {
		accountId: data.accounts[0]?.id ?? -1,
		date: "",
		description: "",
		amount: 0,
		importedId: null,
		tags: [],
		attributes: {},
	};

	async function create(transaction: NoId<DetailedTransaction>) {
		const transactionResponse = await transactionApi.create(
			transaction.accountId,
			transaction.amount,
			transaction.description,
			transaction.date,
			null,
			transaction.tags,
			transaction.attributes,
		);

		if (!transactionResponse.ok) {
			console.error(transactionResponse);
			return;
		}

		transaction.amount = 0;
		transaction.description = "";
	}
</script>

<svelte:head>
	<title>Record transaction</title>
</svelte:head>

<h1 class="title">Record transaction</h1>

<div class="wrapper">
	<TransactionEditor
		bind:transaction
		onCreate={create}
	/>
</div>

<style>
	.wrapper {
		max-width: 24rem;
	}
</style>
