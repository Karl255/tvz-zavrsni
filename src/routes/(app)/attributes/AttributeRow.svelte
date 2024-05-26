<script lang="ts">
	import Button from "$lib/component/Button.svelte";
import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { Attribute } from "$lib/model/attribute.model";
	import { validateAttributeName } from "$lib/service/validation.service";

	export let attribute: Attribute;
	export let updateAttribute: (newAttribute: Attribute) => void;
	export let deleteAttribute: (attributeId: number) => void;

	let newName = attribute.name;
	let isEditing = false;
	let isNewNameValid = false;
	$: isNewNameValid = validateAttributeName(newName);

	function startEdit() {
		newName = attribute.name;
		isEditing = !isEditing;
	}

	function saveEdit() {
		if (isNewNameValid) {
			updateAttribute({
				id: attribute.id,
				name: newName,
				userId: attribute.userId,
			});

			isEditing = !isEditing;
		}
	}

	function cancelEdit() {
		isEditing = !isEditing;
	}

	function deleteThisAttribute() {
		deleteAttribute(attribute.id);
	}
</script>

<article class="attribute">
	{#if isEditing}
		<!-- prettier-ignore -->
		<input type="text" bind:value={newName}>
	{:else}
		<p title="attribute name">{attribute.name}</p>
	{/if}

	<div class="actions">
		{#if isEditing}
			<!-- prettier-ignore -->
			<Button type="icon" on:click={saveEdit} disabled={!isNewNameValid}>
				<Icon icon={IconType.SAVE} />
			</Button>

			<!-- prettier-ignore -->
			<Button type="icon" on:click={cancelEdit}>
				<Icon icon={IconType.X} />
			</Button>
		{:else}
			<!-- prettier-ignore -->
			<Button type="icon" class="hover-only" on:click={startEdit}>
				<Icon icon={IconType.EDIT_TAG} />
			</Button>

			<!-- prettier-ignore -->
			<Button type="icon" class="hover-only" on:click={deleteThisAttribute}>
				<Icon icon={IconType.DELETE} />
			</Button>
		{/if}
	</div>
</article>

<style lang="scss">
	.attribute {
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
		color: $clr-icon;
	}

	:global(.hover-only) {
		visibility: hidden;
	}

	.attribute:hover :global(.hover-only) {
		visibility: visible;
	}
</style>
