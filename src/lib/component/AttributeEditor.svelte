<script lang="ts">
	import { getAppContext } from "$lib/app.context";
	import Button from "./Button.svelte";
	import Icon, { IconType } from "./Icon.svelte";

	const appContext = getAppContext();

	export let id: string | null = null;
	export let attributes: Record<string, string>;

	let unsetAttributes: string[] = getUnsetAttributes(attributes, appContext.availableAttributes);
	$: unsetAttributes = getUnsetAttributes(attributes, appContext.availableAttributes);

	let selectedUnsetAttribute: string | null = null;

	function getUnsetAttributes(attributes: Record<string, string>, available: string[]) {
		return available.filter((attributeName) => !Object.hasOwn(attributes, attributeName));
	}

	function addAttribute() {
		if (selectedUnsetAttribute) {
			attributes[selectedUnsetAttribute] = "";
			selectedUnsetAttribute = null;
			attributes = attributes;
		}
	}

	function removeAttribute(name: string) {
		delete attributes[name];
		attributes = attributes;
	}
</script>

<fieldset {id}>
	<div class="attributes">
		{#each Object.keys(attributes) as name}
			<label for="attribute-{name}">{name}</label>

			<input
				type="text"
				id="attribute-{name}"
				bind:value={attributes[name]}
			/>

			<!-- prettier-ignore -->
			<Button type="tertiary" small on:click={() => removeAttribute(name)}>
				<Icon icon={IconType.X} />
			</Button>
		{/each}
	</div>

	{#if unsetAttributes.length > 0}
		<div class="add-attribute">
			<select bind:value={selectedUnsetAttribute}>
				{#each unsetAttributes as unsetAttribute}
					<option>{unsetAttribute}</option>
				{/each}
			</select>

			<!-- prettier-ignore -->
			<Button type="tertiary" on:click={addAttribute}>Add</Button>
		</div>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		border: none;
		margin: 0;
		padding: 0;
	}

	.attributes {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.5rem;

		label {
			padding-right: 0.25rem;
		}
	}

	.add-attribute {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}
</style>
