<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { AccountApi } from "$lib/api/account.api";
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import TransactionsList from "$lib/component/TransactionList/TransactionsList.svelte";
	import { AccountType } from "$lib/model/account.model";
	import type { Transaction } from "$lib/model/transaction.model";
	import type { PageData } from "./$types";

	export let data: PageData;
	const accountApi = new AccountApi();

	let deleteDialog: HTMLDialogElement;

	function sumBalance(transactions: Transaction[]) {
		return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
	}

	async function deleteAccount() {
		await accountApi.delete(data.account.id);
		invalidateAll();
		goto("/accounts");
	}
</script>

<svelte:head>
	<title>Transactions - {data.account.name}</title>
</svelte:head>

<h1 class="sr-only">You are viewing the account:</h1>

<header>
	<article class="account">
		<div class="account__info">
			<p
				class="account__name"
				title="name"
			>
				{data.account.name}
			</p>

			{#if data.account.type === AccountType.CHECKING}
				<Icon icon={IconType.CARD} />
			{:else}
				<Icon icon={IconType.PIGGYBANK} />
			{/if}
		</div>

		<p
			class="account__balance"
			title="balance"
		>
			{sumBalance(data.transactions).toFixed(2)} €
		</p>
	</article>

	<div>
		<Button
			type="tertiary"
			on:click={() => deleteDialog.showModal()}
		>
			<Icon icon={IconType.DELETE} />
			Delete
		</Button>
	</div>
</header>

<TransactionsList bind:transactions={data.transactions} />

<dialog
	class="modal"
	bind:this={deleteDialog}
>
	<p>You're about to delete this account and all its associated transactions.</p>

	<div class="actions">
		<Button
			type="primary"
			on:click={() => deleteDialog.close()}
		>
			Cancel
		</Button>

		<Button
			type="tertiary"
			on:click={deleteAccount}>Delete</Button
		>
	</div>
</dialog>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: start;
	}

	.account {
		background-color: $clr-light-gray;
		border-radius: 5px;
		padding: 1rem;

		width: fit-content;
		margin-bottom: 2rem;

		&__info {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.75rem;

			font-weight: $fw-bold;
			color: $clr-bold-text;
		}
	}

	dialog {
		max-width: 24rem;

		.actions {
			margin-top: 1rem;
			margin-left: auto;
			width: fit-content;
		}
	}
</style>
