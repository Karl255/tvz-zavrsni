<script lang="ts">
	import { http } from "$lib/utils/api.utils";

	let output = "";

	async function callAction(action: string) {
		const response = await http.post<unknown>("/api/dev", { action });

		output = JSON.stringify(response);
	}

	async function initDb() {
		await callAction("initDb");
	}

	async function seedDb() {
		await callAction("seedDb");
	}
</script>

<h1>Development stuff</h1>

<section>
	<h2>Actions</h2>

	<ul>
		<li><button on:click={initDb}>Initialize DB</button></li>
		<li><button on:click={seedDb}>Seed DB</button></li>
	</ul>

	<!-- prettier-ignore -->
	<textarea readonly bind:value={output}></textarea>
</section>

<style lang="scss">
	:global(body) {
		padding: 1rem;
	}

	textarea {
		width: 100%;
		max-width: 96rem;
		min-height: 16rem;
		font: inherit;
		font-family: monospace;
		font-size: 1rem;
	}
</style>
