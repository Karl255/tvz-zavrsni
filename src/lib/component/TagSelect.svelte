<script lang="ts">
	import type { Tag } from "$lib/model/tag.model";

	interface CheckableTag extends Tag {
		checked: boolean;
	}

	export let id: string;
	export let tags: Tag[];
	export let selectedTags: Tag[] = [];

	let checkableTags: CheckableTag[] = tags.map((tag) => ({ ...tag, checked: false }));

	function updateSelected() {
		selectedTags = checkableTags.filter((tag) => tag.checked);
	}
</script>

<fieldset {id}>
	{#each checkableTags as tag}
		<div>
			<input
				type="checkbox"
				id={tag.id.toString()}
				bind:checked={tag.checked}
				on:change={updateSelected}
			/>

			<label for={tag.id.toString()}>{tag.name}</label>
		</div>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		border: none;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
