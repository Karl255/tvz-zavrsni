<script lang="ts">
	import { getAppContext } from "$lib/app.context";
	import Button from "../Button.svelte";

	const appContext = getAppContext();

	export let hasTags: string[] = [];
	export let doesntHaveTags: string[] = [];
	export let onClose: () => void;
</script>

<div class="tag-picker">
	<div class="columns">
		<div class="column">
			<label for="has-tags">Has tags</label>
			<select
				id="has-tags"
				multiple
				size={appContext.availableTags.length}
				bind:value={hasTags}
			>
				{#each appContext.availableTags as tag}
					<option>{tag}</option>
				{/each}
			</select>
		</div>

		<div class="column">
			<label for="doesnt-have-tags">Doesn't have tags</label>
			<select
				id="doesnt-have-tags"
				multiple
				size={appContext.availableTags.length}
				bind:value={doesntHaveTags}
			>
				{#each appContext.availableTags as tag}
					<option>{tag}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- prettier-ignore -->
	<Button type="primary" on:click={onClose}>Close</Button>
</div>

<style lang="scss">
	.tag-picker {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		font-weight: $fw-bold;
	}

	select {
		overflow-y: auto;
	}
</style>
