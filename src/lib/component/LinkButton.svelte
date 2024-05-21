<script
	lang="ts"
	context="module"
>
	export type ButtonType = "primary" | "secondary" | "tertiary";
</script>

<script lang="ts">
	export let href: string;
	export let type: ButtonType | null = null;
	export let center = false;
</script>

<a
	{href}
	class={type ?? ""}
	class:center
>
	<slot />
</a>

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

	a.primary {
		color: white;
		background: $clr-bold-text;

		transition: opacity 100ms ease-out;

		&:hover {
			opacity: 0.8;
		}
	}

	a.tertiary {
		color: $clr-bold-text;
		font-weight: $fw-bold;

		transition: background-color 100ms ease-out;

		&:hover {
			background-color: #00000020;
		}
	}

	.center {
		justify-content: center;
	}
</style>
