<script lang="ts">
	import { goto } from "$app/navigation";
	import { setAppContext } from "$lib/app.context";
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import LinkButton from "$lib/component/LinkButton.svelte";
	import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants";
	import "../../app.scss";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
	$: setAppContext(data);

	function logout() {
		document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Max-Age=0; Path=/; Secure`;
		goto("/login");
	}
</script>

<div class="page">
	<header>
		<h1 class="title">Finances</h1>

		<!-- prettier-ignore -->
		<Button type="tertiary" on:click={logout}>
			<Icon icon={IconType.LOGOUT} />
			Logout
		</Button>
	</header>

	<nav>
		<ul>
			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/">
					<Icon icon={IconType.DASHBOARD} />
					Dashboard
				</LinkButton>
			</li>

			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/transactions">
					<Icon icon={IconType.HISTORY} />
					Transaction history
				</LinkButton>
			</li>

			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/accounts">
					<Icon icon={IconType.WALLET} />
					Accounts
				</LinkButton>
			</li>

			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/tags">
					<Icon icon={IconType.TAG} />
					My tags
				</LinkButton>
			</li>

			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/attributes">
					<Icon icon={IconType.TAG} />
					My attributes
				</LinkButton>
			</li>

			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/transactions/new">
					<Icon icon={IconType.PLUS} />
					Record transaction
				</LinkButton>
			</li>

			<li>
				<!-- prettier-ignore -->
				<LinkButton type="tertiary" href="/import">
					<Icon icon={IconType.IMPORT} />
					Import
				</LinkButton>
			</li>
		</ul>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.page {
		display: grid;
		grid-template-areas: "header header" "nav content";
		grid-template-columns: 16rem 1fr;
		grid-template-rows: auto 1fr;
		gap: 0 1rem;

		background-color: $clr-light-gray;
	}

	header {
		grid-area: header;
		padding: 0.5rem 1.75rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav {
		grid-area: nav;
		padding: 1rem;

		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		ul {
			display: contents;
		}
	}

	main {
		grid-area: content;

		background-color: white;
		border-top-left-radius: 1rem;
		padding: 2rem;
	}
</style>
