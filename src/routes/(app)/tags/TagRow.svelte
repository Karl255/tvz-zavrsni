<script lang="ts">
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import { validateTagName } from "$lib/service/validation.service";

	export let tag: string;
	export let updateTag: (tagName: string, newName: string) => void;
	export let deleteTag: (tagName: string) => void;

	let newName = tag;
	let isEditing = false;
	let isNewNameValid = false;
	$: isNewNameValid = validateTagName(newName);

	function startEdit() {
		newName = tag;
		isEditing = !isEditing;
	}

	function saveEdit() {
		if (isNewNameValid) {
			updateTag(tag, newName);

			isEditing = !isEditing;
		}
	}

	function cancelEdit() {
		isEditing = !isEditing;
	}

	function deleteThisTag() {
		deleteTag(tag);
	}
</script>

<article class="tag">
	{#if isEditing}
		<!-- prettier-ignore -->
		<input type="text" bind:value={newName}>
	{:else}
		<p title="tag name">{tag}</p>
	{/if}

	<div class="actions">
		{#if isEditing}
			<!-- prettier-ignore -->
			<button on:click={saveEdit} disabled={!isNewNameValid}>
				<Icon icon={IconType.SAVE} />
			</button>

			<button on:click={cancelEdit}>
				<Icon icon={IconType.X} />
			</button>
		{:else}
			<!-- prettier-ignore -->
			<button class="hover-only" on:click={startEdit}>
				<Icon icon={IconType.EDIT_TAG} />
			</button>

			<!-- prettier-ignore -->
			<button class="hover-only" on:click={deleteThisTag}>
				<Icon icon={IconType.DELETE} />
			</button>
		{/if}
	</div>
</article>

<style lang="scss">
	.tag {
		padding: 0.5rem 1rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.hover-only {
		visibility: hidden;
	}

	.tag:hover .hover-only {
		visibility: visible;
	}
</style>
