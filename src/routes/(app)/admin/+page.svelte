<script lang="ts">
	import { UserAdminApi } from "$lib/api/user.adminApi";
	import type { User } from "$lib/model/user.model";
	import type { PageData } from "./$types";
	import UserRow from "./UserRow.svelte";

	export let data: PageData;

	const userAdminApi = new UserAdminApi();

	async function updateUser(newUser: User) {
		const response = await userAdminApi.update(newUser.id, newUser.isAdmin);

		if (response.ok) {
			data.users = data.users.map((user) => (user.id === newUser.id ? newUser : user));
		}
	}

	async function deleteUser(userId: number) {
		userAdminApi.delete(userId);

		data.users = data.users.filter((user) => user.id !== userId);
	}
</script>

<div class="content">
	<h1 class="title">Admin panel</h1>

	<h2 class="subtitle">Users</h2>

	<table>
		<tr>
			<th>Id</th>
			<th>Eamil</th>
			<th>Is admin</th>
			<th>Actions</th>
		</tr>

		{#each data.users as user}
			<tr>
				<UserRow
					{user}
					{updateUser}
					{deleteUser}
				/>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	.content > * + * {
		margin-top: 1rem;
	}

	.title {
		margin-bottom: 2rem;
	}

	.subtitle {
		font-weight: $fw-bold;
	}

	table {
		border-collapse: collapse;
		table-layout: auto;
		max-width: 100%;
	}

	tr:nth-child(even) {
		background-color: $clr-light-gray;
	}

	th {
		font-weight: $fw-bold;
	}

	th,
	:global(td) {
		padding: 0.5rem 1.5rem;
	}
</style>
