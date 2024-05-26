<script lang="ts">
	import { DetailedTransaction } from "$lib/model/transaction.model";

	export let allTransactions: DetailedTransaction[];
	export let filteredTransactions = allTransactions;

	const filters = {
		descriptionSearch: "",
	};

	$: filteredTransactions = applyFilter(allTransactions, filters);

	function applyFilter(transactions: DetailedTransaction[], f: typeof filters) {
		const descriptionWords = f.descriptionSearch.split(/ +/).map((word) => word.toLocaleLowerCase());

		return transactions.filter((transaction) => {
			return descriptionWords.every((word) => transaction.description.toLocaleLowerCase().includes(word));
		});
	}
</script>

<input
	type="text"
	bind:value={filters.descriptionSearch}
/>
