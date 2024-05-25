<script lang="ts">
	import { AttributeApi } from "$lib/api/attribute.api";
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { Attribute } from "$lib/model/attribute.model";
	import { validateAttributeName } from "$lib/service/validation.service";
	import type { PageData } from "./$types";
	import AttributeRow from "./AttributeRow.svelte";

	export let data: PageData;

	const attributeApi = new AttributeApi();

	let searchInput = "";
	let isValidAttributeName = false;
	$: isValidAttributeName = validateAttributeName(searchInput) && data.attributes.every((attribute) => attribute.name !== searchInput);

	async function createAttribute() {
		if (isValidAttributeName) {
			const response = await attributeApi.create(searchInput);

			if (response.ok) {
				data.attributes.push((await response.json()) as Attribute);
				data.attributes = data.attributes;
				searchInput = "";
			}
		}
	}

	async function updateAttribute(newAttribute: Attribute) {
		const response = await attributeApi.update(newAttribute.id, newAttribute.name);

		if (response.ok) {
			data.attributes = data.attributes.map((attribute) => (attribute.id === newAttribute.id ? newAttribute : attribute));
		}
	}

	async function deleteAttribute(attributeId: number) {
		const resposne = await attributeApi.delete(attributeId);

		if (resposne.ok) {
			data.attributes = data.attributes.filter((attribute) => attribute.id !== attributeId);
		}
	}

	function searchAndSort(attributes: Attribute[], search: string) {
		const searches = search.split(/\s+/);

		// prettier-ignore
		return attributes
			.filter((attribute) => searches.every((s) => attribute.name.includes(s)))
			.toSorted((a, b) => (a.name > b.name ? 1 : -1));
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
		{#each searchAndSort(data.attributes, searchInput) as attribute}
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
