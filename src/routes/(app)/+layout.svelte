<script lang="ts">
	import { goto } from "$app/navigation";
	import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants";
	import "../../app.scss";
	import type { PageData } from "./$types";

	export let data: PageData;

	function logout() {
		document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Max-Age=0; Path=/; Secure`;
		goto("/login");
	}
</script>

<div class="page">
	<header>
		<h1 class="title">Finance tracker</h1>

		<!-- prettier-ignore -->
		<button class="btn--tertiary logout-button" on:click={logout}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/></svg>
			Logout
		</button>
	</header>

	<nav>
		<ul>
			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"/></svg>
					Dashboard
				</a>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/transactions">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9q0 .425-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4q.425 0 .713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7q.425 0 .713.288T13 8z"/></svg>
					Transaction history
				</a>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/accounts">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19V5zm0 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm7-2V9h-7v6zm-4-1.5q.625 0 1.063-.437T17.5 12q0-.625-.437-1.062T16 10.5q-.625 0-1.062.438T14.5 12q0 .625.438 1.063T16 13.5"/></svg>
					Accounts
				</a>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/tags">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5"/></svg>
					My tags
				</a>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/transactions/new">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
					Record transaction
				</a>
			</li>

			{#if data.locals.isAdmin}
				<li>
					<!-- prettier-ignore -->
					<a class="btn--tertiary" href="/admin">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 17q.625 0 1.063-.437T18.5 15.5q0-.625-.437-1.062T17 14q-.625 0-1.062.438T15.5 15.5q0 .625.438 1.063T17 17m0 3q.775 0 1.425-.363t1.05-.962q-.55-.325-1.175-.5T17 18q-.675 0-1.3.175t-1.175.5q.4.6 1.05.963T17 20m-5 2q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v5.675q-.475-.2-.975-.363T18 10.076V6.4l-6-2.25L6 6.4v4.7q0 1.175.313 2.35t.875 2.238Q7.75 16.75 8.55 17.65t1.775 1.5q.275.8.725 1.525t1.025 1.3q-.025 0-.037.013T12 22m5 0q-2.075 0-3.537-1.463T12 17q0-2.075 1.463-3.537T17 12q2.075 0 3.538 1.463T22 17q0 2.075-1.463 3.538T17 22m-5-10.35"/></svg>
						Admin panel
					</a>
				</li>
			{/if}
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
		grid-template-columns: auto 1fr;
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

		a {
			display: flex;
		}
	}

	main {
		grid-area: content;

		background-color: white;
		border-top-left-radius: 1rem;
		padding: 2rem;
	}
</style>
