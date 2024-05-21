<script
	lang="ts"
	context="module"
>
	export type ButtonType = "primary" | "secondary" | "tertiary";
</script>

<script lang="ts">
	export let type: ButtonType | null = null;
	export let disabled = false;
	export let center = false;
</script>

<button
	{disabled}
	class={type ?? ""}
	class:center
	on:click
>
	<slot />
</button>

<style lang="scss">
	.primary,
	.tertiary {
		padding: 0.75rem;
		border-radius: 5px;

		display: inline-flex;
		align-items: center;
		gap: 0.75rem;

		line-height: 1;
	}

	.primary {
		color: white;
		background: $clr-bold-text;
		transition: opacity 100ms ease-out;

		&:enabled:hover {
			opacity: 0.8;
		}

		&:disabled {
			opacity: 0.7;
			cursor: default;
		}
	}

	.tertiary {
		color: $clr-bold-text;
		font-weight: $fw-bold;

		transition: background-color 100ms ease-out;

		&:enabled:hover {
			background-color: #00000020;
		}

		&:disabled {
			opacity: 0.7;
			cursor: default;
		}
	}

	.center {
		justify-content: center;
	}
</style>
