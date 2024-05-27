<script lang="ts">
	import type { Account } from "$lib/model/account.model";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import Button from "../Button.svelte";
	import Icon, { IconType } from "../Icon.svelte";

	export let transaction: DetailedTransaction;
	export let attributeColumns: string[];
	export let accountResolver: ((accountId: number) => Account) | undefined;
	export let onEdit: (transactionId: number) => void;
	export let onDelete: (transactionId: number) => void;
</script>

<td class="amount">
	<span
		class:positive={transaction.amount > 0}
		class:negative={transaction.amount < 0}
	>
		{transaction.amount.toFixed(2)} €
	</span>
</td>

<td
	class="description"
	title={transaction.description}
>
	{transaction.description}
</td>

<td>
	{transaction.date}
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
	<Button type="icon" on:click={() => onEdit(transaction.id)}>
		<Icon icon={IconType.EDIT} />
	</Button>

	<!-- prettier-ignore -->
	<Button type="icon" on:click={() => onDelete(transaction.id)}>
		<Icon icon={IconType.DELETE} />
	</Button>
</td>

<style lang="scss">
	.amount {
		font-weight: $fw-colored-text;
		text-align: right;
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
