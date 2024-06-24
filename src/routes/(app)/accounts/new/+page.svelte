<script lang="ts">
	import { goto } from "$app/navigation";
	import { AccountApi } from "$lib/api/account.api";
	import Button from "$lib/component/Button.svelte";
	import { AccountType } from "$lib/model/account.model";
	import { validateAccountName, validateAccountType } from "$lib/service/validation.service";

	const accountApi = new AccountApi();

	let name = "";
	let type = AccountType.CHECKING;

	let isValid = false;
	$: isValid = validate(name, type);

	function validate(name: string, type: AccountType) {
		return validateAccountName(name) && validateAccountType(type);
	}

	async function create() {
		await accountApi.create(name, type);
		goto(`/accounts`, { invalidateAll: true });
	}
</script>

<svelte:head>
	<title>Create account</title>
</svelte:head>

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
	<Button type="primary" submit disabled={!isValid}>Create</Button>
</form>

<style lang="scss">
	form {
		margin-top: 1rem;
		max-width: 24rem;

		> * {
			display: block;
		}

		> :global(*) + :global(*) {
			margin-top: 1rem;
		}

		> label + * {
			margin-top: 0.25rem;
		}
	}
</style>
