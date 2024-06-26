<script lang="ts">
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import { validateAttributeName } from "$lib/service/validation.service";

	export let attribute: string;
	export let updateAttribute: (attributeName: string, newName: string) => void;
	export let deleteAttribute: (attributeName: string) => void;

	let newName = attribute;
	let isEditing = false;
	let isNewNameValid = false;
	$: isNewNameValid = validateAttributeName(newName);

	function startEdit() {
		newName = attribute;
		isEditing = !isEditing;
	}

	function saveEdit() {
		if (isNewNameValid) {
			updateAttribute(attribute, newName);

			isEditing = !isEditing;
		}
	}

	function cancelEdit() {
		isEditing = !isEditing;
	}

	function deleteThisAttribute() {
		deleteAttribute(attribute);
	}
</script>

<article class="attribute">
	{#if isEditing}
		<!-- prettier-ignore -->
		<input type="text" bind:value={newName}>
	{:else}
		<p title="attribute name">{attribute}</p>
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
