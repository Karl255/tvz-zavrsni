<script lang="ts">
	import { getAppContext } from "$lib/app.context";

	const appContext = getAppContext();

	export let id: string;
	export let selectedTags: string[] = [];

	let checkableTags = appContext.availableTags.map((tag) => ({ name: tag, checked: !!selectedTags.find((selected) => selected === tag) }));

	function updateSelected() {
		selectedTags = checkableTags.filter((tag) => tag.checked).map((tag) => tag.name);
	}
</script>

<fieldset {id}>
	{#each checkableTags as tag}
		<div>
			<input
				type="checkbox"
				id="tag-{tag.name}"
				bind:checked={tag.checked}
				on:change={updateSelected}
			/>

			<label for="tag-{tag.name}">{tag.name}</label>
		</div>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		border: none;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
