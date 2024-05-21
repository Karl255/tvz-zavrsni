<script lang="ts">
	import { goto } from "$app/navigation";
	import { HttpClient } from "$lib/api/httpClient";
	import Button from "$lib/component/Button.svelte";
	import LinkButton from "$lib/component/LinkButton.svelte";
	import { validateEmail, validateEqual, validatePassword } from "$lib/service/validation.service";

	const httpClient = new HttpClient(fetch);

	let email = "";
	let password = "";
	let passwordRepeat = "";

	let isEmailValid = false;
	$: isEmailValid = validateEmail(email);

	let isPasswordValid = false;
	$: isPasswordValid = validatePassword(password);

	let isPasswordRepeatValid = false;
	$: isPasswordRepeatValid = validateEqual(password, passwordRepeat);

	let isValid = false;
	$: isValid = isEmailValid && isPasswordValid && isPasswordRepeatValid;

	let errorMessage: string | null = null;

	async function register() {
		if (isValid) {
			errorMessage = null;

			const response = await httpClient.post("/api/users", { email, password });

			if (response.ok) {
				goto("/");
			} else {
				errorMessage = (await response.json()).message;
			}
		}
	}

	function getEmailErrorMessage(isEmailValid: boolean, email: string, message: string | null) {
		return message ?? (isEmailValid || email === "" ? "" : "Please enter a valid email");
	}
</script>

<form class="register">
	<h1 class="title">Register</h1>

	<label for="email">Email</label>
	<!-- prettier-ignore -->
	<input type="email" id="email" bind:value={email} placeholder="your.email@example.com">
	<p class="error">{getEmailErrorMessage(isEmailValid, email, errorMessage)}</p>

	<label for="password">Password</label>
	<!-- prettier-ignore -->
	<input type="password" name="password" id="password" bind:value={password}>
	<p class="error">{isPasswordValid || password === "" ? "" : "The password should be at least 8 characters long"}</p>

	<label for="password-repeat">Repeat password</label>
	<!-- prettier-ignore -->
	<input type="password" id="password-repeat" bind:value={passwordRepeat}>
	<p class="error">{isPasswordRepeatValid || passwordRepeat === "" ? "" : "The passwords don't match"}</p>

	<!-- prettier-ignore -->
	<Button type="primary" disabled={!isValid} center on:click={register}>Register</Button>

	<!-- prettier-ignore -->
	<LinkButton type="tertiary" href="/login" center>Login instead</LinkButton>
</form>

<style lang="scss">
	.register {
		place-self: center;
		width: 100%;
		max-width: 26rem;
		padding: 1rem;

		display: flex;
		flex-direction: column;
	}

	.register > :global(*) + :global(*) {
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
