<script lang="ts">
	import { goto } from "$app/navigation";
	import { httpClient } from "$lib/api/httpClient";
	import { validateEmail } from "$lib/service/validation.service";

	let email = "";
	let password = "";

	let isValid = false;
	$: isValid = validateEmail(email);
	$: console.log("isValid", isValid);

	async function login() {
		const response = await httpClient.get("/api/users", { email, password });

		if (response.ok) {
			goto("/");
		} else {
			console.log(response);
			// TODO: display error
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

	<button
		class="btn--primary"
		on:click={login}
		disabled={!isValid}
	>
		Login
	</button>
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
		margin-top: 0.25rem;
	}

	input {
		font: inherit;
		padding: 0.25rem;
	}

	button {
		justify-content: center;
	}
</style>
