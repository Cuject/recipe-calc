<script>
	import { count } from "../stores/teststores";

	function reset() {
		count.set(0);
	}
</script>

<button on:click={reset}>
	reset
</button>