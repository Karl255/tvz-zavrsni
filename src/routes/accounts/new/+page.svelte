<script lang="ts">
	import { goto } from "$app/navigation";
	import { accountApi } from "$lib/api/account.api";
	import { AccountType } from "$lib/model/account.model";

	let name = "";
	let type = AccountType.CHECKING;

	let isValid = false;
	$: isValid = validate(name, type);

	function validate(name: string, type: AccountType) {
		return name.length >= 5 && Object.values(AccountType).includes(type);
	}

	async function create() {
		const account = await accountApi.create(name, type);
		goto(`/accounts/${account.id}`);
	}
</script>

<h1 class="title">Create account</h1>

<form on:submit={create}>
	<label for="name">Name</label>
	<!-- prettier-ignore -->
	<input type="text" id="name" bind:value={name} placeholder="Checking account 1">

	<label for="type">Type</label>
	<!-- prettier-ignore -->
	<select id="type" bind:value={type}>
		<option value={AccountType.CHECKING} selected>Checking</option>
		<option value={AccountType.SAVING}>Saving</option>
	</select>

	<!-- prettier-ignore -->
	<button class="btn--primary" disabled={!isValid}>Create</button>
</form>

<style lang="scss">
	form {
		margin-top: 1rem;
		max-width: 24rem;

		> * {
			display: block;
		}

		> * + * {
			margin-top: 1rem;
		}

		> label + * {
			margin-top: 0.25rem;
		}
	}

	button:disabled {
		opacity: 0.7;
		cursor: default;
	}
</style>
