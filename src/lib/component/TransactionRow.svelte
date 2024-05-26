<script lang="ts">
	import type { Account } from "$lib/model/account.model";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import Icon, { IconType } from "./Icon.svelte";

	export let transaction: DetailedTransaction;
	export let attributeColumns: string[];
	export let accountResolver: ((accountId: number) => Account) | undefined;
	export let onEdit: (transactionId: number) => void;
	export let onDelete: (transactionId: number) => void;

	let isEditing = false;
	let newAmount = transaction.amount;
	let newDescription = transaction.description;
	let newDate = transaction.date;

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

<td class="description">
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

<td>
	{#if transaction.tags.length > 0}
		<span title={transaction.tags.join(", ")}>
			<Icon
				icon={IconType.TAG}
				inline
			/>
			{transaction.tags.length}
		</span>
	{/if}
</td>

{#each attributeColumns as attribute}
	<td>
		{#if transaction.attributes[attribute]}
			{transaction.attributes[attribute]}
		{/if}
	</td>
{/each}

<td class="actions">
	<!-- prettier-ignore -->
	<button on:click={() => onEdit(transaction.id)}>
		<Icon icon={IconType.EDIT} />
	</button>

	<button on:click={() => onDelete(transaction.id)}>
		<Icon icon={IconType.DELETE} />
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

	.description {
		max-width: 16rem;
		white-space: pre;
		overflow-x: clip;
		text-overflow: ellipsis;
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
