<script>
	import { count } from "../stores/teststores";
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
	import { onDestroy } from 'svelte';

    let countValue = 0;

    const unsubscribe = count.subscribe(value => {countValue = value;});

    onDestroy(unsubscribe);
</script>

<h1>The count is {countValue}</h1>

<Incrementer/>
<Decrementer/>
<Resetter/>
