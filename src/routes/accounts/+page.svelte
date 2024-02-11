<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="content">
	<h1 class="title">Accounts</h1>

	<ul class="accounts">
		{#each data.accounts as account}
			<li>
				<a href="/accounts/{account.id}">
					<article class="account">
						<!-- prettier-ignore -->
						<p class="account__name" title="name">{account.name}</p>

						<!-- prettier-ignore -->
						<p class="account__balance" title="balance">100.00 €</p>
					</article>
				</a>
			</li>
		{/each}
	</ul>

	<!-- prettier-ignore -->
	<a class="btn--primary" href="/accounts/new">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v6H4v6h10v2zM4 8h16V6H4zm15 14v-3h-3v-2h3v-3h2v3h3v2h-3v3zM4 18V6z"/></svg>
		Create
	</a>
</div>

<style lang="scss">
	.content > * + * {
		margin-top: 2rem;
	}

	.accounts {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.account {
		background-color: $clr-light-gray;
		padding: 1rem;
		border-radius: 5px;

		&__name {
			font-weight: $fw-bold;
		}
	}
</style>
