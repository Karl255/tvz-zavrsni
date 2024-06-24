<script lang="ts">
	import type { DetailedTransaction } from "$lib/model/transaction.model";
	import Value from "../Value.svelte";

	export let transactions: DetailedTransaction[];

	function sum(transactions: DetailedTransaction[]) {
		return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
	}

	function min(transactions: DetailedTransaction[]) {
		if (transactions.length === 0) {
			return null;
		}

		return transactions.reduce((minimum, transaction) => (transaction.amount < minimum ? transaction.amount : minimum), Infinity);
	}

	function max(transactions: DetailedTransaction[]) {
		if (transactions.length === 0) {
			return null;
		}

		return transactions.reduce((minimum, transaction) => (transaction.amount > minimum ? transaction.amount : minimum), -Infinity);
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
	<dd>
		<Value amount={sum(transactions)} />
	</dd>

	<dt>Average</dt>
	<dd>
		<Value amount={transactions.length === 0 ? null : sum(transactions) / transactions.length} />
	</dd>

	<dt>Min/max gained</dt>
	<dd><Value amount={min(positive(transactions))} />, <Value amount={max(positive(transactions))} /></dd>

	<dt>Min/max spend</dt>
	<dd>
		<Value amount={max(negative(transactions))} />, <Value amount={min(negative(transactions))} />
	</dd>
</dl>
