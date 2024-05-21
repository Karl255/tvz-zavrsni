<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	let totalBalance = data.accounts.reduce((total, account) => total + (account.balance ?? 0), 0);
</script>

<div class="content">
	<h1 class="title">Dashboard</h1>

	<article class="balance">
		<h2 class="balance__title">
			Total balance

			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3s-2.686-3-6-3s-6 1.343-6 3"/><path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598c0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6"/><path d="M3 6v10c0 .888.772 1.45 2 2"/><path d="M3 11c0 .888.772 1.45 2 2"/></g></svg>
		</h2>
		<p>{totalBalance.toFixed(2)} €</p>
	</article>

	<!-- prettier-ignore -->
	<a href="/accounts" class="btn--tertiary">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5h-8q-1.775 0-2.887 1.113T9 9v6q0 1.775 1.113 2.888T13 19h8q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm3-3.5q.65 0 1.075-.425T17.5 12q0-.65-.425-1.075T16 10.5q-.65 0-1.075.425T14.5 12q0 .65.425 1.075T16 13.5"/></svg>
		View all accounts
	</a>
</div>

<style lang="scss">
	.content > * + * {
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
