<script lang="ts">
	import { transactionApi } from "$lib/api/transaction.api";
	import type { PageData } from "./$types";

	export let data: PageData;

	let accountId: number | null = null;
	let amount: number = 0;
	let description: string = "";

	let isValid = false;
	$: isValid = validate(accountId, amount, description);

	function validate(accountId: number | null, amount: number, description: string) {
		return accountId !== null && amount !== 0 && description.length >= 5;
	}

	async function create() {
		if (accountId) {
			const response = await transactionApi.create(accountId, amount, description);

			if (response.ok) {
				amount = 0;
				description = "";
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
	<span>
		<!-- prettier-ignore -->
		<input type="number" id="amount" step="0.01" bind:value={amount} on:blur={formatCurrency}>
		€
	</span>

	<label for="description">Description</label>
	<!-- prettier-ignore -->
	<input type="text" id="description" bind:value={description}>

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

	button:disabled {
		opacity: 0.7;
		cursor: default;
	}
</style>
