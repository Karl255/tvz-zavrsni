<script lang="ts">
	import type { Tag } from "$lib/model/tag.model";
	import { validateTagName } from "$lib/service/validation.service";

	export let tag: Tag;
	export let updateTag: (newTag: Tag) => void;
	export let deleteTag: (tagid: number) => void;

	let newName = tag.name;
	let isEditing = false;
	let isNewNameValid = false;
	$: isNewNameValid = validateTagName(newName);

	function startEdit() {
		newName = tag.name;
		isEditing = !isEditing;
	}

	function saveEdit() {
		if (isNewNameValid) {
			updateTag({
				id: tag.id,
				name: newName,
				userId: tag.userId,
			});

			isEditing = !isEditing;
		}
	}

	function cancelEdit() {
		isEditing = !isEditing;
	}

	function deleteThisTag() {
		deleteTag(tag.id);
	}
</script>

<article class="tag">
	{#if isEditing}
		<!-- prettier-ignore -->
		<input type="text" bind:value={newName}>
	{:else}
		<p title="tag name">{tag.name}</p>
	{/if}

	<div class="actions">
		{#if isEditing}
			<!-- prettier-ignore -->
			<button on:click={saveEdit} disabled={!isNewNameValid}>
				<!-- prettier-ignore -->
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"/></svg>
			</button>

			<button on:click={cancelEdit}>
				<!-- prettier-ignore -->
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
			</button>
		{:else}
			<!-- prettier-ignore -->
			<button class="hover-only" on:click={startEdit}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9C12.04 2.21 11.53 2 11 2H4c-.53 0-1.04.21-1.41.59C2.21 2.96 2 3.47 2 4v7c0 .26.05.53.15.77c.1.23.25.46.44.65l1.98 1.98L6 13l-2-2V4h7l9 9l-7 7l-2.13-2.13l-.17.17v-.01l-1.25 1.25l2.14 2.14c.38.37.88.58 1.41.58c.53 0 1.04-.21 1.41-.59l7-7c.38-.37.59-.88.59-1.41c0-.26-.05-.5-.15-.77c-.1-.23-.25-.46-.44-.65M6.5 5a1.5 1.5 0 0 1 1.39.93c.11.27.14.57.08.86c-.06.29-.2.56-.41.77c-.21.21-.48.35-.77.41c-.29.06-.59.03-.86-.08A1.5 1.5 0 0 1 6.5 5m4.2 10.35l1-1a.55.55 0 0 0 0-.77l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1zm-2.64-1.47L2 19.94V22h2.06l6.05-6.07z"/></svg>
			</button>

			<!-- prettier-ignore -->
			<button class="hover-only" on:click={deleteThisTag}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
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

	svg {
		color: $clr-bold-text;
		display: block;
	}
</style>
