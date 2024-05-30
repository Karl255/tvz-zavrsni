<script lang="ts">
	import { onMount } from "svelte";

	export let step: number;

	let progressContainer: HTMLElement;
	let availableWidth: number | null;
	let stepWidths: number[] | null = null;

	onMount(() => {
		availableWidth = progressContainer.clientWidth;
		stepWidths = [...progressContainer.children].map((stepElement) => stepElement.clientWidth);
	});

	function getGtcForStep(total: number, widths: number[], step: number): string {
		const remainingWidth = total - widths.reduce((a, b) => a + b);
		return widths.map((width, index) => `${index + 1 === step ? remainingWidth + width : width}px`).join(" ");
	}
</script>

<ol
	class="import-progress"
	style:grid-template-columns={availableWidth && stepWidths ? getGtcForStep(availableWidth, stepWidths, step) : null}
	bind:this={progressContainer}
>
	<li class:active={step === 1}>1. Choose file</li>
	<li class:active={step === 2}>2. Pick data</li>
	<li class:active={step === 3}>3. Review data</li>
	<li class:active={step === 4}>4. Import records</li>
</ol>

<style lang="scss">
	.import-progress {
		--gap: 0.5rem;

		display: grid;
		grid-template-columns: repeat(4, 0fr);
		justify-content: center;
		margin-inline: calc(0px - var(--gap));
		margin-bottom: 2rem;

		font-weight: $fw-bold;
		transition: grid-template-columns 500ms ease-in-out;

		li {
			display: flex;
			align-items: center;

			color: $clr-faded-text;
			white-space: pre;

			transition: color 500ms ease-in-out;

			&::before,
			&::after {
				content: "";
				flex: 1 0;
				position: relative;
				margin-inline: 0.5rem;

				height: 2px;
				background-color: currentColor;
			}
		}

		.active {
			color: black;
		}
	}
</style>
