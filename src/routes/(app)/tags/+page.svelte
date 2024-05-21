<script lang="ts">
	import { TagApi } from "$lib/api/tag.api";
	import type { Tag } from "$lib/model/tag.model";
	import { validateTagName } from "$lib/service/validation.service";
	import type { PageData } from "./$types";
	import TagRow from "./TagRow.svelte";

	export let data: PageData;

	const tagApi = new TagApi();

	let searchInput = "";
	let isValidTagName = false;
	$: isValidTagName = validateTagName(searchInput);

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

	async function updateTag(newTag: Tag) {
		const response = await tagApi.update(newTag.id, newTag.name);

		if (response.ok) {
			data.tags = data.tags.map((tag) => (tag.id === newTag.id ? newTag : tag));
		}
	}

	async function deleteTag(tagId: number) {
		const resposne = await tagApi.delete(tagId);

		if (resposne.ok) {
			data.tags = data.tags.filter((tag) => tag.id !== tagId);
		}
	}

	function searchAndSort(tags: Tag[], search: string) {
		const searches = search.split(/\s+/);

		// prettier-ignore
		return tags
			.filter((tag) => searches.every((s) => tag.name.includes(s)))
			.toSorted((a, b) => (a.name > b.name ? 1 : 0));
	}
</script>

<div class="content">
	<h1 class="title">My tag</h1>

	<p>Here you can create tags. Tags help you categorise your transactions.</p>

	<div class="search">
		<!-- prettier-ignore -->
		<input type="search" placeholder="Search" bind:value={searchInput}>

		<button
			class="btn--tertiary"
			on:click={createTag}
			disabled={!isValidTagName}
		>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m0 0A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m14.91 6.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l.41.4a5.62 5.62 0 0 1 2.08-.74L4 11V4h7l9 9l-7 7l-1.08-1.08a5.57 5.57 0 0 1-.74 2.08l.41.41A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5M10 19H7v3H5v-3H2v-2h3v-3h2v3h3Z"/></svg>
			Create
		</button>
	</div>

	<ul class="list">
		{#each searchAndSort(data.tags, searchInput) as tag}
			<li class="tag">
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
