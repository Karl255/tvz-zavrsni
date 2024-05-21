<script lang="ts">
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import LinkButton from "$lib/component/LinkButton.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let totalBalance = data.accounts.reduce((total, account) => total + (account.balance ?? 0), 0);
</script>

<div class="content">
	<h1 class="title">Dashboard</h1>

	<article class="balance">
		<h2 class="balance__title">
			Total balance
			<Icon icon={IconType.COINS} />
		</h2>

		<p>{totalBalance.toFixed(2)} €</p>
	</article>

	<!-- prettier-ignore -->
	<LinkButton type="tertiary" href="/accounts">
		View all accounts
		<Icon icon={IconType.ARROW_RIGHT} />
	</LinkButton>
</div>

<style lang="scss">
	.content > :global(*) + :global(*) {
		margin-top: 2rem;
	}

	.balance {
		background-color: $clr-light-gray;
		padding: 1rem;
		border-radius: 5px;
		width: fit-content;

		&__title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 2rem;

			color: $clr-bold-text;
			font-weight: $fw-bold;
		}
	}
</style>
