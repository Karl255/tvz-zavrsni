<script lang="ts">
	import { goto } from "$app/navigation";
	import { httpClient } from "$lib/api/httpClient";

	let email = "";
	let password = "";

	// TODO #6: validation

	async function login() {
		const response = await httpClient.get("/api/users", { email, password });

		if (response.ok) {
			goto("/");
		} else {
			console.log(response);
		}
	}
</script>

<div class="login">
	<label for="email">Email</label>
	<!-- prettier-ignore -->
	<input type="text" id="email" bind:value={email} placeholder="your.email@example.com">

	<label for="password">Password</label>
	<!-- prettier-ignore -->
	<input type="password" id="password" bind:value={password}>

	<button on:click={login}>Login</button>
</div>

<style lang="scss">
	.login {
		max-width: 20rem;
		padding: 1rem;

		display: flex;
		flex-direction: column;
	}

	* + * {
		margin-top: 1rem;
	}

	label + input {
		margin-top: 0.5rem;
	}

	button,
	input {
		font: inherit;
		padding: 0.25rem;
	}
</style>
