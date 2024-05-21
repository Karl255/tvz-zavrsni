<script lang="ts">
	import type { Account } from "$lib/model/account.model";
	import type { TransactionWithTags } from "$lib/model/transaction.model";
	import { validateIsoDate } from "$lib/service/validation.service";

	export let transaction: TransactionWithTags;
	export let accountResolver: ((accountId: number) => Account) | undefined;
	export let updateTransaction: (newTransaction: TransactionWithTags) => void;
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
		{#if isEditing}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"/></svg>
		{:else}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
		{/if}
	</button>

	<button on:click={deleteOrCancel}>
		{#if isEditing}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
		{:else}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
		{/if}
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

	svg {
		color: $clr-bold-text;
		display: block;
	}

	.link {
		text-decoration: underline;
	}
</style>
