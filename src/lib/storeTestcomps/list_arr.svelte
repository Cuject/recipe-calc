<script lang="js">
	import { list_arr } from "../stores/teststores";
	export let user = "";
	export let form_call_add = "";
	export let form_call_del = "";


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
		const name_arr = $list_arr.map(n => ( n.name.toString() ));
		if(name_arr.includes(recipe_name) || recipe_name == ""){
			console.log("empty string or name already exists")
		}else{
			$list_arr = [...$list_arr, {
			name: recipe_name,
			user: user,
			food_items: []
			}];

		}
	};

	const subtractFromArray = () => {
		
	};
	
	function show (){
		console.log($list_arr)
	}

	function show_food_items(){
		console.log("you pressed on a recipe " + String(count_pressed) + " times")
		count_pressed += 1
	}
</script>

<form method="POST" style="display:inline-flex">
	<input type="text" name="append_input" placeholder="Add a food item" bind:value={recipe_name}/>
	<button on:click={addToArray} formaction={form_call_add}>Add item</button>
</form>

<button on:click={show}>
	Show
</button>

{#each $list_arr as item}
<div id = "recipe_box">
	{item.name}
	<div>	
		<button>View</button>
		<form method="POST" style="display:inline-flex"><button formaction={form_call_del}>Delete</button></form>
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