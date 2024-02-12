<script lang="ts">
	import type { Label } from "$lib/model/label.model";

	interface CheckableLabel extends Label {
		checked: boolean;
	}

	export let labels: Label[];
	export let selectedLabels: Label[] = [];

	let checkableLabels: CheckableLabel[] = labels.map((label) => ({ ...label, checked: false }));

	function updateSelected() {
		selectedLabels = checkableLabels.filter((label) => label.checked);
		console.log("selectedLabels", selectedLabels);
	}
</script>

<fieldset>
	{#each checkableLabels as label}
		<div>
			<input
				type="checkbox"
				id={label.id.toString()}
				bind:checked={label.checked}
				on:change={updateSelected}
			/>

			<label for={label.id.toString()}>{label.name}</label>
		</div>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		border: none;
		padding: 0;
	}
</style>
