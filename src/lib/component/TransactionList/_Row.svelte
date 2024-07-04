<script lang="ts">
	import type { Account } from "$lib/model/account.model";
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import { validateTransaction } from "$lib/service/validation.service";
	import Button from "../Button.svelte";
	import Icon, { IconType } from "../Icon.svelte";
	import Value from "../Value.svelte";

	export let transaction: DetailedTransaction;
	export let attributeColumns: string[];
	export let accountResolver: ((accountId: number) => Account) | undefined;
	export let onEdit: (transactionId: number) => void;
	export let onDelete: (transactionId: number) => void;

	let isValid = true;
	$: isValid = validateTransaction(transaction);
</script>

<tr class:invalid={!isValid}>
	<td class="amount">
		<Value amount={transaction.amount} />
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
</tr>

<style lang="scss">
	tr:nth-child(even) {
		background-color: $clr-light-gray;
	}

	.invalid {
		--_outline-width: 1px;
		outline: var(--_outline-width) solid red;
		outline-offset: calc(0px - var(--_outline-width));
	}

	.amount {
		text-align: right;
	}

	.description {
		max-width: 16rem;
		white-space: pre;
		overflow-x: clip;
		text-overflow: ellipsis;
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
