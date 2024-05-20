<script lang="ts">
	import { TransactionApi } from "$lib/api/transaction.api";
	import { TransactionLabelApi } from "$lib/api/transactionLabel.api";
	import LabelSelect from "$lib/component/LabelSelect.svelte";
	import type { Label } from "$lib/model/label.model";
	import type { Transaction } from "$lib/model/transaction.model";
	import { validateIsoDate } from "$lib/service/validation.service";
	import type { PageData } from "./$types";

	export let data: PageData;

	const transactionApi = new TransactionApi();
	const transactionLabelApi = new TransactionLabelApi();

	let accountId: number | null = null;
	let amount = 0;
	let description = "";
	let date = "";
	let selectedLabels: Label[] = [];

	let isValid = false;
	$: isValid = validate(accountId, amount, description, date);

	function validate(accountId: number | null, amount: number, description: string, date: string) {
		return accountId !== null && amount !== 0 && description.length >= 5 && validateIsoDate(date);
	}

	async function create() {
		if (accountId) {
			const response = await transactionApi.create(accountId, amount, description, date);

			if (response.ok) {
				amount = 0;
				description = "";

				const transaction = (await response.json()) as Transaction;

				selectedLabels.forEach((label) => {
					transactionLabelApi.create(transaction.id, label.id);
				});
			}
		}
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
	<div>
		<!-- prettier-ignore -->
		<input type="number" id="amount" step="0.01" bind:value={amount} on:blur={formatCurrency}>
		€
	</div>

	<label for="description">Description</label>
	<!-- prettier-ignore -->
	<input type="text" id="description" bind:value={description}>

	<label for="date">Date</label>
	<!-- prettier-ignore -->
	<input type="date" id="date" bind:value={date}>

	<label for="labels">Labels</label>
	<!-- prettier-ignore -->
	<div>
		<LabelSelect labels={data.labels} bind:selectedLabels={selectedLabels} />
	</div>

	<!-- prettier-ignore -->
	<button class="btn--primary" disabled={!isValid}>Record</button>
</form>

<style lang="scss">
	form {
		margin-top: 1rem;
		max-width: 24rem;

		> * {
			display: block;
		}

		> * + * {
			margin-top: 1rem;
		}

		> label + * {
			margin-top: 0.25rem;
		}
	}
</style>
