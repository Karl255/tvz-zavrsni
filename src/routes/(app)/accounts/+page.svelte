<script lang="ts">
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import LinkButton from "$lib/component/LinkButton.svelte";
	import { AccountType } from "$lib/model/account.model";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Accounts</title>
</svelte:head>

<div class="content">
	<h1 class="title">Accounts</h1>

	<ul class="accounts">
		{#each data.accounts as account}
			<li>
				<a href="/accounts/{account.id}">
					<article class="account">
						<div class="account__info">
							<!-- prettier-ignore -->
							<p class="account__name" title="name">{account.name}</p>

							{#if account.type === AccountType.CHECKING}
								<Icon icon={IconType.CARD} />
							{:else}
								<Icon icon={IconType.PIGGYBANK} />
							{/if}
						</div>

						<!-- prettier-ignore -->
						<p class="account__balance" title="balance">{(account.balance ?? 0).toFixed(2)} €</p>
					</article>
				</a>
			</li>
		{/each}
	</ul>

	<!-- prettier-ignore -->
	<LinkButton type="primary" href="/accounts/new">
		<Icon icon={IconType.ADD_CARD} />
		Add
	</LinkButton>
</div>

<style lang="scss">
	.content > :global(*) + :global(*) {
		margin-top: 2rem;
	}

	.accounts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: 2rem;
	}

	.account {
		background-color: $clr-light-gray;
		padding: 1rem;
		border-radius: 5px;

		&__info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			font-weight: $fw-bold;
			color: $clr-bold-text;
		}
	}
</style>
