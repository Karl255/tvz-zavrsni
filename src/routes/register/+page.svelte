<script lang="ts">
	import { goto } from "$app/navigation";
	import { httpClient } from "$lib/api/httpClient";
	import { validateRegister } from "$lib/service/validation.service";

	let email = "";
	let password = "";
	let passwordRepeat = "";

	let isValid = false;
	$: isValid = validateRegister(email, password, passwordRepeat);

	async function register() {
		if (isValid) {
			const response = await httpClient.post("/api/users", { email, password });

			if (response.ok) {
				goto("/");
			} else {
				console.log(response);
				// TODO: display error
			}
		}
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

	<button
		class="btn--primary"
		on:click={register}
		disabled={!isValid}
	>
		Register
	</button>
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
