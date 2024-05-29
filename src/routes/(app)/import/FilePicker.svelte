<script lang="ts">
	export let onPick: (file: File) => void;
	let files: FileList | undefined;

	$: {
		const file = files?.[0];
		if (file) {
			onPick(file);
		}
	}
</script>

<input
	value=""
	type="file"
	bind:files
	accept="text/csv,text/plain"
/>
