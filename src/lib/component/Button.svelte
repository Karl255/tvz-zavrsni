<script
	lang="ts"
	context="module"
>
	export type ButtonType = "primary" | "secondary" | "tertiary" | "icon";
</script>

<script lang="ts">
	export let type: ButtonType | null = null;
	export let submit = false;
	export let disabled = false;
	export let center = false;
	export let small = false;

	let _class = "";
	export { _class as class };
</script>

<button
	type={submit ? "submit" : "button"}
	{disabled}
	class={type ? `${type} ${_class}` : _class}
	class:center
	class:small
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

	.icon {
		transition: color 100ms ease-out;

		&:enabled:hover {
			color: black;
		}
	}

	.center {
		justify-content: center;
	}

	.small {
		padding: 0.25rem;
	}

	button > :global(*) {
		flex-shrink: 0;
	}
</style>
