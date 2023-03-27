<script lang="js">
	import { list_arr } from "../stores/teststores";
	import { setIndex } from "$lib/stores/recipes";
	import { tab_select } from "$lib/stores/tabs";
	import { recipe_index } from "$lib/stores/teststores";

	export let user = "";
	export let form_call_add = "";
	export let form_call_del = "";
	//export let form_call_foodItems = "";

	function tab_change(){tab_select.set(4)}



  /*const handleSubmit: SubmitFunction = () => {
    return async ({result, update}) => {
      await update();
      if (result.type === "success") {
        console.log("sent to mongo database")
      }
    };
  }*/


	$: recipe_name = ""
	let count_pressed = 0
	
	const addToArray = () => {

			$list_arr = [...$list_arr, {
			name: recipe_name,
			user: user,
			food_items: []
			}];

		
	};

	const subtractFromArray = () => {
		
	};
	
	function show (){
		console.log($list_arr)
	}

	/**
	 * @param {any} index
	 */
	function show_food_index(index){
		console.log(index);
		recipe_index.set(index);
		tab_select.set(4)

	}
</script>

<form method="POST" style="display:inline-flex">
	<input type="text" name="append_input" placeholder="Add new recipe" bind:value={recipe_name}/>
	<button on:click={addToArray} formaction={form_call_add}>Add recipe</button>
</form>

<button on:click={show}>
	Show
</button>

<button on:click={() => setIndex(5)}>Set Index</button>

{#each $list_arr as item, i}
<div id = "recipe_box">
	{item.name}
	<div>	
		<button on:click={() => show_food_index(i)}>View</button>
		<form method="POST" style="display:inline-flex">
			<input type="number" name="index" bind:value={i} />
			<button formaction={form_call_del} >Delete</button>
		</form>
	</div>
</div>

{/each}


<style>
	#recipe_box{
		display: flex;
		justify-content: space-between;
		padding: 3px;
		margin-bottom: 2px;
		background-color: cadetblue;
	}
</style>