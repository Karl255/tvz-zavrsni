<script lang="ts">
	import { goto } from "$app/navigation";
	import { httpClient } from "$lib/api/httpClient";
	import { validateEmail, validateEqual, validatePassword } from "$lib/service/validation.service";

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

<div class="register">
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

	<button
		class="btn--primary"
		on:click={register}
		disabled={!isValid}
	>
		Register
	</button>

	<!-- prettier-ignore -->
	<a href="/login" class="btn--tertiary">Login instead</a>
</div>

<style lang="scss">
	.register {
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
