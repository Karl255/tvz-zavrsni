<script lang="ts">
	let email = "";
	let password = "";

	// TODO #6: validation

	function login() {
		// TODO #4
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
