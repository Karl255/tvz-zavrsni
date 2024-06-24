<script
	lang="ts"
	context="module"
>
	export interface NewOrExistingTransaction {
		id?: number;
		amount: number;
		description: string;
		date: IsoDate;
		accountId: number;
		importedId: string | null;
		tags: string[];
		attributes: Record<string, string>;
	}

	assertNever<TypeDiff<NoId<DetailedTransaction>, NewOrExistingTransaction>>();
</script>

<script lang="ts">
	import { getAppContext } from "$lib/app.context";

	import type { DetailedTransaction, IsoDate } from "$lib/model/transaction.model";
	import { validateIsoDate } from "$lib/service/validation.service";
	import { assertNever, type NoId, type TypeDiff } from "$lib/util/type.util";
	import { identity } from "$lib/util/util";
	import { onMount } from "svelte";
	import AttributeEditor from "./AttributeEditor.svelte";
	import Button from "./Button.svelte";
	import Icon, { IconType } from "./Icon.svelte";
	import TagSelect from "./TagSelect.svelte";

	const appContext = getAppContext();

	export let transaction: NewOrExistingTransaction;
	export let onCreate: (transaction: NoId<DetailedTransaction>) => void = identity;
	export let onUpdate: (transaction: DetailedTransaction) => void = identity;
	export let onCancel: () => void = identity;

	let amountInput: HTMLInputElement;

	let isValid = false;
	$: isValid = validate(transaction);

	function validate(transaction: NewOrExistingTransaction): boolean {
		return transaction.accountId !== -1 && transaction.amount !== 0 && transaction.description.length >= 5 && validateIsoDate(transaction.date);
	}

	function save() {
		if (!validate(transaction)) {
			return;
		}

		if (isExisting(transaction)) {
			onUpdate(transaction);
		} else {
			onCreate(transaction);
		}

		function isExisting(transaction: NewOrExistingTransaction): transaction is DetailedTransaction {
			return !!transaction.id;
		}
	}

	function formatAmount() {
		amountInput.value = Number(amountInput.value).toFixed(2);
	}

	function negateAmount() {
		amountInput.value = (-Number(amountInput.value)).toFixed(2);
		formatAmount();
	}

	onMount(() => {
		formatAmount();
	});
</script>

<form on:submit={save}>
	<label for="accountId">Account</label>

	<select
		id="accountId"
		bind:value={transaction.accountId}
	>
		{#each appContext.accounts as account}
			<option value={account.id}>{account.name}</option>
		{/each}
	</select>

	<label for="amount">Amount</label>
	<div class="amount">
		<!-- prettier-ignore -->
		<Button type="tertiary" small on:click={negateAmount}>
			<Icon icon={IconType.PLUS_MINUS} />
		</Button>

		<input
			type="number"
			id="amount"
			step="0.01"
			bind:this={amountInput}
			bind:value={transaction.amount}
			on:blur={formatAmount}
		/>

		<Icon icon={IconType.EURO} />
	</div>

	<label for="date">Date</label>
	<!-- prettier-ignore -->
	<input type="date" id="date" bind:value={transaction.date}>

	<label for="description">Description</label>
	<!-- prettier-ignore -->
	<input type="text" id="description" bind:value={transaction.description}>

	<label for="attributes">Attributes</label>
	<div>
		<!-- prettier-ignore -->
		<AttributeEditor id="attributes" bind:attributes={transaction.attributes} />
	</div>

	<label for="tags">Tags</label>
	<div>
		<!-- prettier-ignore -->
		<TagSelect id="tags" bind:selectedTags={transaction.tags} />
	</div>

	<div class="actions">
		{#if onCreate !== identity}
			<!-- prettier-ignore -->
			<Button type="primary" submit disabled={!isValid}>
				Record
			</Button>
		{/if}

		<div class="filler"></div>

		{#if onCancel !== identity}
			<!-- prettier-ignore -->
			<Button type="tertiary" on:click={onCancel}>
				Cancel
			</Button>
		{/if}

		{#if onUpdate !== identity}
			<!-- prettier-ignore -->
			<Button type="primary" submit disabled={!isValid}>
				Save
			</Button>
		{/if}
	</div>
</form>

<style lang="scss">
	form {
		margin-top: 1rem;
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
		display: flex;
		align-items: center;
		gap: 0.5rem;

		input {
			flex-grow: 1;
		}

		:global(svg) {
			color: $clr-bold-text;
		}
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;

		.filler {
			flex-grow: 1;
		}
	}
</style>
