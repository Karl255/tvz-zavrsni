<script>
	import { goto } from "$app/navigation";
	import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants";
	import "../../app.scss";

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
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"/></svg>
					Home
				</a>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/accounts">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5h-8q-1.775 0-2.887 1.113T9 9v6q0 1.775 1.113 2.888T13 19h8q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm3-3.5q.65 0 1.075-.425T17.5 12q0-.65-.425-1.075T16 10.5q-.65 0-1.075.425T14.5 12q0 .65.425 1.075T16 13.5"/></svg>
					Accounts</a
				>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/history">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9q0 .425-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4q.425 0 .713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7q.425 0 .713.288T13 8z"/></svg>
					Transaction history</a
				>
			</li>

			<li>
				<!-- prettier-ignore -->
				<a class="btn--tertiary" href="/transactions/new">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
					Record transaction</a
				>
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
	}

	main {
		grid-area: content;

		background-color: white;
		border-top-left-radius: 1rem;
		padding: 1rem;
	}
</style>
