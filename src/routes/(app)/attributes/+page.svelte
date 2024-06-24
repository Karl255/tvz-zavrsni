<script lang="ts">
	import { AttributeApi } from "$lib/api/attribute.api";
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import { validateAttributeName } from "$lib/service/validation.service";
	import type { PageData } from "./$types";
	import AttributeRow from "./AttributeRow.svelte";

	export let data: PageData;

	const attributeApi = new AttributeApi();

	let searchInput = "";
	let isValidAttributeName = false;
	$: isValidAttributeName = validateAttributeName(searchInput) && data.availableAttributes.every((attribute) => attribute !== searchInput);

	async function createAttribute() {
		if (isValidAttributeName) {
			const response = await attributeApi.create(searchInput);

			if (response.ok) {
				data.availableAttributes.push((await response.json()) as string);
				data.availableAttributes = data.availableAttributes;
				searchInput = "";
			}
		}
	}

	async function updateAttribute(attributeName: string, newName: string) {
		const response = await attributeApi.update(attributeName, newName);

		if (response.ok) {
			data.availableAttributes = data.availableAttributes.map((a) => (a === attributeName ? newName : a));
		}
	}

	async function deleteAttribute(attributeName: string) {
		const resposne = await attributeApi.delete(attributeName);

		if (resposne.ok) {
			data.availableAttributes = data.availableAttributes.filter((a) => a !== attributeName);
		}
	}

	function searchAndSort(attributes: string[], search: string) {
		const searches = search.split(/\s+/);

		// prettier-ignore
		return attributes
			.filter((attribute) => searches.every((s) => attribute.includes(s)))
			.toSorted((a, b) => (a > b ? 1 : -1));
	}
</script>

<div class="content">
	<h1 class="title">My attributes</h1>

	<p>Here you can create attributes. Attributes allow you to add additional data to your transactions.</p>

	<div class="search">
		<!-- prettier-ignore -->
		<input type="search" placeholder="Search or create new attribute" bind:value={searchInput}>

		<!-- prettier-ignore -->
		<Button type="tertiary" disabled={!isValidAttributeName} on:click={createAttribute}>
			<Icon icon={IconType.ADD_TAG} />
			Create
		</Button>
	</div>

	<ul class="list">
		{#each searchAndSort(data.availableAttributes, searchInput) as attribute}
			<li>
				<AttributeRow
					{attribute}
					{updateAttribute}
					{deleteAttribute}
				/>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.content > * + * {
		margin-top: 1rem;
	}

	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	.list li:nth-child(odd) {
		background-color: $clr-light-gray;
	}
</style>
