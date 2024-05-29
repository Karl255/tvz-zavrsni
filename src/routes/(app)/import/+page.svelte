<script lang="ts">
	import ImportProgress from "./ImportProgress.svelte";

	let files: FileList;
	let step = 1;
</script>

<ImportProgress {step} />

<input
	type="file"
	bind:files
	accept="text/csv,text/plain"
/>

<input
	type="number"
	bind:value={step}
/>

<style lang="scss">
</style>
