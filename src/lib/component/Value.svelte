<script lang="ts">
	export let amount: number | null = 0;
</script>

<span
	class:positive={(amount ?? 0) > 0}
	class:negative={(amount ?? 0) < 0}
>
	{#if amount !== null}
		{amount.toFixed(2)} €
	{:else}
		-.-- €
	{/if}
</span>

<style lang="scss">
	span {
		font-weight: $fw-colored-text;
	}

	.positive {
		color: $clr-green;
	}

	.negative {
		color: $clr-red;
	}
</style>
