<script lang="ts">
	import type { Account } from "$lib/model/account.model";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { validateIsoDate } from "$lib/service/validation.service";
	import Icon, { IconType } from "./Icon.svelte";

	export let transaction: DetailedTransaction;
	export let accountResolver: ((accountId: number) => Account) | undefined;
	export let updateTransaction: (newTransaction: DetailedTransaction) => void;
	export let deleteTransaction: (transactionId: number) => void;

	let isEditing = false;
	let newAmount = transaction.amount;
	let newDescription = transaction.description;
	let newDate = transaction.date;
	let isValid = false;
	$: isValid = validate(newAmount, newDescription, newDate);

	function validate(amount: number, description: string, date: string) {
		return amount !== 0 && description.length >= 5 && validateIsoDate(date);
	}

	async function startOrSaveEdit() {
		if (isEditing) {
			updateTransaction({
				id: transaction.id,
				amount: newAmount,
				description: newDescription,
				date: newDate,
				accountId: transaction.accountId,
				tags: transaction.tags,
			});
		} else {
			newAmount = transaction.amount;
			newDescription = transaction.description;
			newDate = transaction.date;
		}

		isEditing = !isEditing;
	}

	function deleteOrCancel() {
		if (isEditing) {
			isEditing = !isEditing;
		} else {
			deleteTransaction(transaction.id);
		}
	}

	function formatCurrency(e: { currentTarget: HTMLInputElement }) {
		e.currentTarget.value = Number(e.currentTarget.value).toFixed(2);
	}
</script>

<td>
	{#if isEditing}
		<span class="new-amount">
			<!-- prettier-ignore -->
			<input type="number" step="0.01" bind:value={newAmount} on:blur={formatCurrency}>
			€
		</span>
	{:else}
		<span
			class="amount"
			class:positive={transaction.amount > 0}
			class:negative={transaction.amount < 0}
		>
			{transaction.amount.toFixed(2)} €
		</span>
	{/if}
</td>

<td>
	{#if isEditing}
		<!-- prettier-ignore -->
		<input type="text" bind:value={newDescription}>
	{:else}
		{transaction.description}
	{/if}
</td>

<td>
	{#if isEditing}
		<!-- prettier-ignore -->
		<input type="date" bind:value={newDate}>
	{:else}
		{transaction.date}
	{/if}
</td>

{#if accountResolver}
	<td>
		<a
			class="link"
			href="/accounts/{transaction.accountId}"
		>
			{accountResolver(transaction.accountId).name}
		</a>
	</td>
{/if}

<td>{transaction.tags.map((tag) => tag.name).join(", ")}</td>

<td class="actions">
	<!-- prettier-ignore -->
	<button on:click={startOrSaveEdit} disabled={isEditing && !isValid}>
		<Icon icon={isEditing ? IconType.SAVE : IconType.EDIT} />
	</button>

	<button on:click={deleteOrCancel}>
		<Icon icon={isEditing ? IconType.X : IconType.DELETE} />
	</button>
</td>

<style lang="scss">
	.amount {
		font-weight: $fw-colored-text;
	}

	.new-amount {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		input {
			max-width: 8rem;
		}
	}

	.positive {
		color: $clr-green;
	}

	.negative {
		color: $clr-red;
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		visibility: hidden;

		:global(tr):hover > & {
			visibility: visible;
		}
	}

	.actions {
		color: $clr-bold-text;
	}

	.link {
		text-decoration: underline;
	}
</style>
