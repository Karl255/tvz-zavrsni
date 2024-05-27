<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import type { PageData } from "./$types";
	import TransactionEditor, { type NewOrExistingTransaction } from "$lib/component/TransactionEditor.svelte";

	export let data: PageData;

	const transactionApi = new TransactionApi();

	let transaction: NewOrExistingTransaction = {
		accountId: data.accounts[0]?.id ?? -1,
		date: "",
		description: "",
		amount: 0,
		attributes: {},
		tags: [],
	};

	async function create(transaction: Omit<DetailedTransaction, "id">) {
		const transactionResponse = await transactionApi.create(
			transaction.accountId,
			transaction.amount,
			transaction.description,
			transaction.date,
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

<h1 class="title">Record transaction</h1>

<div class="wrapper">
	<TransactionEditor
		bind:transaction
		accounts={data.accounts}
		availableTags={data.avaialbleTags}
		availableAttributes={data.availableAttributes}
		onCreate={create}
	/>
</div>

<style>
	.wrapper {
		max-width: 24rem;
	}
</style>
