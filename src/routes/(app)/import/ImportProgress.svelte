<script lang="ts">
	import { onMount } from "svelte";

	export let step: number;

	let progressContainer: HTMLElement;
	let availableWidth: number | null;
	let stepWidths: number[] | null = null;
	$: console.log(stepWidths);

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
	<li>1. Upload</li>
	<li>2. Review</li>
	<li>3. Save</li>
</ol>

<style lang="scss">
	.import-progress {
		display: grid;
		grid-template-columns: 0fr 0fr 0fr;
		justify-content: center;

		font-weight: $fw-bold;
		transition: grid-template-columns 1s;

		li {
			white-space: pre;
			display: flex;
			align-items: center;

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
	}
</style>
