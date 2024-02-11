<script lang="ts">
	import TransactionsList from "$lib/component/TransactionsList.svelte";
	import { AccountType } from "$lib/model/account.model";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<article class="account">
	<div class="account__info">
		<!-- prettier-ignore -->
		<p class="account__name" title="name">{data.account.name}</p>

		{#if data.account.type === AccountType.CHECKING}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6M4 8h16V6H4zm0 4v6h16v-6zm0 6V6z"/></svg>
		{:else}
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11q.425 0 .713-.288T17 10q0-.425-.288-.712T16 9q-.425 0-.712.288T15 10q0 .425.288.713T16 11M8 9h5V7H8zM4.5 21q-.85-2.85-1.675-5.687T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.725-.95 1.763-1.475T16.5 2q.625 0 1.063.438T18 3.5q0 .15-.038.3t-.087.275q-.1.275-.187.563t-.138.587L19.825 7.5H22v6.975l-2.825.925L17.5 21H12v-2h-2v2zM6 19h2v-2h6v2h2l1.55-5.15l2.45-.825V9.5h-1L15.5 6q0-.5.063-.962t.187-.938q-.725.2-1.275.688T13.675 6H7.5Q6.05 6 5.025 7.025T4 9.5q0 2.45.675 4.788T6 19m6-7.45"/></svg>
		{/if}
	</div>

	<!-- prettier-ignore -->
	<p class="account__balance" title="balance">{data.account.balance.toFixed(2)} €</p>
</article>

<!-- prettier-ignore -->
<TransactionsList transactions={data.transactions} accounts={[data.account]} />

<style lang="scss">
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
</style>
