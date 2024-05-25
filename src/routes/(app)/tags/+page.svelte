<script lang="ts">
	import { TagApi } from "$lib/api/tag.api";
	import Button from "$lib/component/Button.svelte";
	import Icon, { IconType } from "$lib/component/Icon.svelte";
	import type { Tag } from "$lib/model/tag.model";
	import { validateTagName } from "$lib/service/validation.service";
	import type { PageData } from "./$types";
	import TagRow from "./TagRow.svelte";

	export let data: PageData;

	const tagApi = new TagApi();

	let searchInput = "";
	let isValidTagName = false;
	$: isValidTagName = validateTagName(searchInput) && data.tags.every((tag) => tag.name !== searchInput);

	async function createTag() {
		if (isValidTagName) {
			const response = await tagApi.create(searchInput);

			if (response.ok) {
				data.tags.push((await response.json()) as Tag);
				data.tags = data.tags;
				searchInput = "";
			}
		}
	}

	async function updateTag(tagName: string, newName: string) {
		const response = await tagApi.update(tagName, newName);

		if (response.ok) {
			data.tags = data.tags.map((tag) => (tag.name === tagName ? { ...tag, name: newName } : tag));
		}
	}

	async function deleteTag(tagName: string) {
		const resposne = await tagApi.delete(tagName);

		if (resposne.ok) {
			data.tags = data.tags.filter((tag) => tag.name !== tagName);
		}
	}

	function searchAndSort(tags: Tag[], search: string) {
		const searches = search.split(/\s+/);

		// prettier-ignore
		return tags
			.filter((tag) => searches.every((s) => tag.name.includes(s)))
			.toSorted((a, b) => (a.name > b.name ? 1 : -1));
	}
</script>

<div class="content">
	<h1 class="title">My tags</h1>

	<p>Here you can create tags. Tags help you categorise your transactions.</p>

	<div class="search">
		<!-- prettier-ignore -->
		<input type="search" placeholder="Search or create new tag" bind:value={searchInput}>

		<!-- prettier-ignore -->
		<Button type="tertiary" disabled={!isValidTagName} on:click={createTag}>
			<Icon icon={IconType.ADD_TAG} />
			Create
		</Button>
	</div>

	<ul class="list">
		{#each searchAndSort(data.tags, searchInput) as tag}
			<li>
				<TagRow
					{tag}
					{updateTag}
					{deleteTag}
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
