<script lang="ts">
	import { goto } from "$app/navigation";
	import { http } from "$lib/util/api.util";

	let email = "";
	let password = "";
	let passwordRepeat = "";

	// TODO #6: validation

	async function register() {
		const response = await http.post("/api/users", { email, password });

		console.log(response);

		goto("/");
	}
</script>

<div class="register">
	<label for="email">Email</label>
	<!-- prettier-ignore -->
	<input type="email" id="email" bind:value={email} placeholder="your.email@example.com">

	<label for="password">Password</label>
	<!-- prettier-ignore -->
	<input type="password" name="password" id="password" bind:value={password}>

	<label for="password-repeat">Repeat password</label>
	<!-- prettier-ignore -->
	<input type="password" id="password-repeat" bind:value={passwordRepeat}>

	<button on:click={register}>Register</button>
</div>

<style lang="scss">
	.register {
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
