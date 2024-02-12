<script lang="ts">
	import { goto } from "$app/navigation";
	import { httpClient } from "$lib/api/httpClient";
	import type { AuthError } from "$lib/model/AuthError.model";
	import { validateEmail } from "$lib/service/validation.service";

	let email = "";
	let password = "";

	let isValid = false;
	$: isValid = validateEmail(email);
	$: console.log("isValid", isValid);

	let error: AuthError | null;

	async function login() {
		error = null;
		const response = await httpClient.get("/api/users", { email, password });

		if (response.ok) {
			goto("/");
		} else {
			error = await response.json();
		}
	}
</script>

<div class="login">
	<h1 class="title">Login</h1>

	<label for="email">Email</label>
	<!-- prettier-ignore -->
	<input type="text" id="email" bind:value={email} placeholder="your.email@example.com">
	<p class="error">{error?.field === "email" ? error.message : ""}</p>

	<label for="password">Password</label>
	<!-- prettier-ignore -->
	<input type="password" id="password" bind:value={password}>
	<p class="error">{error?.field === "password" ? error.message : ""}</p>

	<button
		class="btn--primary"
		on:click={login}
		disabled={!isValid}
	>
		Login
	</button>

	<!-- prettier-ignore -->
	<a href="/register" class="btn--tertiary">Register instead</a>
</div>

<style lang="scss">
	.login {
		place-self: center;
		width: 100%;
		max-width: 26rem;
		padding: 1rem;

		display: flex;
		flex-direction: column;
	}

	* + * {
		margin-top: 0.25rem;
	}

	.title {
		font-size: $fz-jumbo;
		text-align: center;
		margin-bottom: 4rem;
	}

	input {
		font: inherit;
		padding: 0.25rem;
	}

	.btn--primary,
	.btn--tertiary {
		justify-content: center;
	}

	.error {
		color: red;
		font-size: 0.875rem;
		height: 1lh;
	}
</style>
