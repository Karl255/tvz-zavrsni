<script lang="ts">
	export let amount = 0;
</script>

<span
	class:positive={amount > 0}
	class:negative={amount < 0}
>
	{amount.toFixed(2)} €
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
