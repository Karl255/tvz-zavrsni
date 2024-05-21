<script lang="ts">
	import { goto } from "$app/navigation";
	import { HttpClient } from "$lib/api/httpClient";
	import Button from "$lib/component/Button.svelte";
	import LinkButton from "$lib/component/LinkButton.svelte";
	import type { AuthError } from "$lib/model/authError.model";
	import { validateEmail } from "$lib/service/validation.service";

	const httpClient = new HttpClient(fetch);

	let email = "";
	let password = "";

	let isValid = false;
	$: isValid = validateEmail(email);

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

<form class="login">
	<h1 class="title">Login</h1>

	<label for="email">Email</label>
	<!-- prettier-ignore -->
	<input type="text" id="email" bind:value={email} placeholder="your.email@example.com">
	<p class="error">{error?.field === "email" ? error.message : ""}</p>

	<label for="password">Password</label>
	<!-- prettier-ignore -->
	<input type="password" id="password" bind:value={password}>
	<p class="error">{error?.field === "password" ? error.message : ""}</p>

	<!-- prettier-ignore -->
	<Button type="primary" disabled={!isValid} center on:click={login}>Login</Button>

	<!-- prettier-ignore -->
	<LinkButton type="tertiary" href="/register" center>Register instead</LinkButton>
</form>

<style lang="scss">
	.login {
		place-self: center;
		width: 100%;
		max-width: 26rem;
		padding: 1rem;

		display: flex;
		flex-direction: column;
	}

	.login > :global(*) + :global(*) {
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

	.error {
		color: red;
		font-size: 0.875rem;
		height: 1lh;
	}
</style>
