<script>
	import { count } from "../stores/teststores";

	function increment() {
		count.update(n => n + 1);
	}
</script>

<button on:click={increment}>
	+
</button>