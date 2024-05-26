<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import { TaggedApi } from "$lib/api/tagged.api";
	import type { DetailedTransaction, Transaction } from "$lib/model/transaction.model";
	import type { PageData } from "./$types";
	import { AttributeValueApi } from "$lib/api/attributeValue.api";
	import TransactionEditor, { type NewOrExistingTransaction } from "$lib/component/TransactionEditor.svelte";

	export let data: PageData;

	const transactionApi = new TransactionApi();
	const taggedApi = new TaggedApi();
	const attributeValueApi = new AttributeValueApi();

	let transaction: NewOrExistingTransaction = {
		accountId: data.accounts[0]?.id ?? -1,
		date: "",
		description: "",
		amount: 0,
		attributes: {},
		tags: [],
	};

	async function create(transaction: Omit<DetailedTransaction, "id">) {
		const transactionResponse = await transactionApi.create(transaction.accountId, transaction.amount, transaction.description, transaction.date);

		if (!transactionResponse.ok) {
			console.error(transactionResponse);
			return;
		}

		const createdTransaction = (await transactionResponse.json()) as Transaction;

		transaction.tags.forEach((tag) => taggedApi.create(createdTransaction.id, tag));

		attributeValueApi.set(createdTransaction.id, transaction.attributes);

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
