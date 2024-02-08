<script lang="ts">
	function initDb() {
		// no tables exist rn
	}

	function seedDb() {
		// no tables exist rn
	}
</script>

<h1>Development stuff</h1>

<section>
	<h2>Actions</h2>

	<ul>
		<li><button on:click={initDb}>Initialize DB</button></li>
		<li><button on:click={seedDb}>Seed DB</button></li>
	</ul>
</section>

<style lang="scss">
	:global(body) {
		padding: 1rem;
	}
</style>
