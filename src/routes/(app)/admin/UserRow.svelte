<script lang="ts">
	import type { User } from "$lib/model/user.model";

	export let user: User;
	export let updateUser: (newUser: User) => void;
	export let deleteUser: (userId: number) => void;

	let isDeleting = false;

	function promoteOrDemote() {
		updateUser({ ...user, isAdmin: !user.isAdmin });
	}

	function deleteThisUser() {
		deleteUser(user.id);
	}
</script>

<td>{user.id}</td>
<td>{user.email}</td>
<td>{user.isAdmin}</td>

<td class="actions">
	<button on:click={promoteOrDemote}>{user.isAdmin ? "Demote" : "Promote"}</button>

	{#if isDeleting}
		<button on:click={deleteThisUser}>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"/></svg>
		</button>

		<button on:click={() => (isDeleting = false)}>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
		</button>
	{:else}
		<button on:click={() => (isDeleting = true)}>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
		</button>
	{/if}
</td>

<style lang="scss">
	.actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	svg {
		color: $clr-bold-text;
		display: block;
	}
</style>
