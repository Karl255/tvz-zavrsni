<script lang="ts">
	import { httpClient } from "$lib/api/httpClient";

	let output = "";

	async function callAction(action: string) {
		const response = await httpClient.post("/api/dev", { action });

		output = JSON.stringify(response);
	}

	async function initDb() {
		await callAction("initDb");
	}

	async function seedDb() {
		await callAction("seedDb");
	}

	async function dropTables() {
		await callAction("dropTables");
	}
</script>

<div class="content">
	<h1 class="title">Development stuff</h1>

	<section class="content">
		<h2>Actions</h2>

		<ul>
			<li><button on:click={initDb}>Initialize DB</button></li>
			<li><button on:click={seedDb}>Seed DB</button></li>
			<li><button on:click={dropTables}>Drop tables</button></li>
		</ul>

		<!-- prettier-ignore -->
		<textarea readonly bind:value={output}></textarea>
	</section>
</div>

<style lang="scss">
	textarea {
		width: 100%;
		max-width: 96rem;
		min-height: 16rem;
		font: inherit;
		font-family: monospace;
		font-size: 1rem;
	}

	.content > * + * {
		margin-top: 1rem;
	}

	ul {
		padding-left: 1rem;
		list-style-type: disc;
	}
</style>
