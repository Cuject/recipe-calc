<script>
    //import Count from "./storeTestcomps/count.svelte";
    //import { recipes_collection } from "./stores/recipes";
    import ListArr from "./storeTestcomps/list_arr.svelte";

    export let word = '';

    function show_recipes(){
        //show_recipes_collection
    }
    

</script>

<div id = "box">
    <button>PRESS ME</button>
    <h2>{word}</h2>
    <ListArr user={word}/>
</div>

<style>
    #box{
        background-color:beige;
        border: 2px solid lightseagreen;
        padding: 1px;
        border-radius: 15px;
    }
</style>