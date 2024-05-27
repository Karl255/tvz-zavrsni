<script lang="ts">
	import type { DetailedTransaction } from "$lib/model/transaction.model";

	export let transactions: DetailedTransaction[];

	function sum(transactions: DetailedTransaction[]) {
		return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
	}

	function min(transactions: DetailedTransaction[]) {
		return transactions.reduce((a, b) => (a.amount < b.amount ? a : b)).amount;
	}

	function max(transactions: DetailedTransaction[]) {
		return transactions.reduce((a, b) => (a.amount > b.amount ? a : b)).amount;
	}

	function positive(transactions: DetailedTransaction[]): DetailedTransaction[] {
		return transactions.filter((transaction) => transaction.amount > 0);
	}

	function negative(transactions: DetailedTransaction[]): DetailedTransaction[] {
		return transactions.filter((transaction) => transaction.amount < 0);
	}
</script>

<dl>
	<dt>Sum</dt>
	<dd>{sum(transactions).toFixed(2)} €</dd>

	<dt>Average</dt>
	<dd>{(sum(transactions) / transactions.length).toFixed(2)} €</dd>

	<dt>Min/max spend</dt>
	<dd>{max(negative(transactions)).toFixed(2)} €, {min(negative(transactions)).toFixed(2)} €</dd>

	<dt>Min/max gained</dt>
	<dd>{min(positive(transactions)).toFixed(2)} €, {max(positive(transactions)).toFixed(2)} €</dd>
</dl>
