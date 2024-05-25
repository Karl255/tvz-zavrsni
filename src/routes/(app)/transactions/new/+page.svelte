<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import { TaggedApi } from "$lib/api/tagged.api";
	import Button from "$lib/component/Button.svelte";
	import TagSelect from "$lib/component/TagSelect.svelte";
	import type { Tag } from "$lib/model/tag.model";
	import type { Transaction } from "$lib/model/transaction.model";
	import { validateIsoDate } from "$lib/service/validation.service";
	import type { PageData } from "./$types";
	import AttributeEditor from "$lib/component/AttributeEditor.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import { AttributeValueApi } from "$lib/api/attributeValue.api";

	export let data: PageData;

	const transactionApi = new TransactionApi();
	const taggedApi = new TaggedApi();
	const attributeValueApi = new AttributeValueApi();

	let accountId: number | null = null;
	let amount = 0;
	let description = "";
	let date = "";
	let selectedTags: Tag[] = [];
	let attributes: Record<string, string> = {};

	let isValid = false;
	$: isValid = validate(accountId, amount, description, date);

	function validate(accountId: number | null, amount: number, description: string, date: string) {
		return accountId !== null && amount !== 0 && description.length >= 5 && validateIsoDate(date);
	}

	async function create() {
		if (!accountId) {
			return;
		}

		const transactionResponse = await transactionApi.create(accountId, amount, description, date);

		if (!transactionResponse.ok) {
			console.error(transactionResponse);
			return;
		}

		const transaction = (await transactionResponse.json()) as Transaction;

		selectedTags.forEach((tag) => taggedApi.create(transaction.id, tag.name));

		attributeValueApi.set(transaction.id, attributes);

		amount = 0;
		description = "";
	}

	function formatCurrency(e: { currentTarget: HTMLInputElement }) {
		e.currentTarget.value = Number(e.currentTarget.value).toFixed(2);
	}
</script>

<h1 class="title">Record transaction</h1>

<form on:submit={create}>
	<label for="accountId">Account</label>
	<!-- prettier-ignore -->
	<select id="accountId" bind:value={accountId}>
		{#each data.accounts as account}
			<option value={account.id}>{account.name}</option>
		{/each}
	</select>

	<label for="amount">Amount</label>
	<div class="amount">
		<!-- prettier-ignore -->
		<input type="number" id="amount" step="0.01" bind:value={amount} on:blur={formatCurrency}>

		<Icon icon={IconType.EURO} />
	</div>

	<label for="date">Date</label>
	<!-- prettier-ignore -->
	<input type="date" id="date" bind:value={date}>

	<label for="description">Description</label>
	<!-- prettier-ignore -->
	<input type="text" id="description" bind:value={description}>

	<label for="attributes">Attributes</label>
	<div>
		<!-- prettier-ignore -->
		<AttributeEditor id="attributes" bind:attributes avaialbleAttributes={data.availableAttributes} />
	</div>

	<label for="tags">Tags</label>
	<div>
		<!-- prettier-ignore -->
		<TagSelect id="tags" tags={data.tags} bind:selectedTags={selectedTags} />
	</div>

	<!-- prettier-ignore -->
	<Button type="primary" class="submit" submit disabled={!isValid}>Record</Button>
</form>

<style lang="scss">
	form {
		margin-top: 1rem;
		max-width: 24rem;
		display: flex;
		flex-direction: column;

		> * {
			display: block;
		}

		> :global(*) + :global(*) {
			margin-top: 1rem;
		}

		> label + * {
			margin-top: 0.25rem;
		}
	}

	.amount {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.5rem;

		:global(svg) {
			color: $clr-bold-text;
		}
	}

	:global(.submit) {
		align-self: start;
	}
</style>
