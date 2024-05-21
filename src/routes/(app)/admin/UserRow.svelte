<script lang="ts">
	import Icon, { IconType } from "$lib/component/Icon.svelte";
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
			<Icon icon={IconType.CHECK} />
		</button>

		<button on:click={() => (isDeleting = false)}>
			<Icon icon={IconType.X} />
		</button>
	{:else}
		<button on:click={() => (isDeleting = true)}>
			<Icon icon={IconType.DELETE} />
		</button>
	{/if}
</td>

<style lang="scss">
	.actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
