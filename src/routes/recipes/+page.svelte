<script lang="ts">
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import Box from "$lib/box.svelte";
	import { createSearchStore, searchHandler } from "$lib/stores/search";
	import { onDestroy } from "svelte";
  import { onMount } from "svelte";
  import ListArr from "$lib/storeTestcomps/list_arr.svelte";
  import { list_arr } from "$lib/stores/teststores";
  import { recipe_list_arr } from "$lib/stores/recipes";

  //first change
  
  let store_arr: any[];

  const unsubscribe1 = list_arr.subscribe(value => {
		store_arr = value;
	});

  onDestroy(unsubscribe1)


  let tab = 3;

  export let data: PageData;
  $: ({foodItems, user, recipes} = data);

  const searchfoodItems = data.foodItems.map((foodItem) => ({
    ...foodItem,
    searchTerms: `${foodItem.food_ID} ${foodItem.food_ND} ${foodItem.com_Name} ${foodItem.edi_Portion}`
  }));



  function addToArray(){
		$list_arr = <any>recipes;
	};

  onMount(addToArray)

  

  const searchStore = createSearchStore(searchfoodItems)

  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  })

  let loading = false;

  async function logOut() {
    loading = true;

    const response = await fetch("/api/logOut", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    loading = false;

    if (response.status === 200) {
      goto("/");
    }

  }

  function print(){console.log(data.foodItems)}
  function print_recipes(){console.log(data.recipes)}
  function filter(){tab = 0}
  function table(){tab = 1}
  function list(){tab = 2}
  function recipes_list(){
    tab = 3;
    addToArray();
  }



  function display_arr(){console.log(recipe_list_arr)}

  //console.log("Onload FIRE");
  
</script>

<div id="navButtons">
  <button on:click={print}>data</button>
  <button on:click={print_recipes}>data recipes</button>
  <button on:click={filter}>filter</button>
  <button on:click={table}>table</button>
  <button on:click={list}>list</button>
  <button on:click={recipes_list}>recipe list</button>
  <button on:click={display_arr}>display store array</button>
  <button on:click={logOut} disabled={loading}>{loading ? "Loading..." : "Log out"}</button>
</div>





<div>
  <h1>Food Item List from FCT</h1>
  <p>Connected with email {user.email}</p>
  <p><a href="/profile">See your profile</a></p>
  <hr />

  
  {#if tab == 0}
  <form>
    <input type="search" placeholder="Search e.g. 'Corn'" bind:value={$searchStore.search}/>
  </form>
  <pre>{JSON.stringify($searchStore.filtered, null, 2)}</pre>
  {/if}

  {#if tab == 1}
  <table>
    <tr style="font-weight:bolder">
      <td>food ID</td>
      <td>Food name and Description</td>
      <td>Common Name</td>
      <td>Edible Portion (%)</td>
      <td>water (g)</td>
      <td>energy (kcal)</td>
      <td>protein (g)</td>
      <td>total_fat (g)</td>
      <td>carbohydrates (g)</td>
      <td>ash (g)</td>
      <td>fiber (g)</td>
      <td>sugars (g)</td>
    </tr>
    
    
    {#if foodItems != null}
      {#each foodItems as foodItem}
        <tr>
          <td>{foodItem.food_ID}</td>
          <td>{foodItem.food_ND}</td>
          <td>{foodItem.com_Name}</td>
          <td>{foodItem.edi_Portion}</td>
          <td>{foodItem.water}</td>
          <td>{foodItem.energy}</td>
          <td>{foodItem.protein}</td>
          <td>{foodItem.total_fat}</td>
          <td>{foodItem.carbohydrates}</td>
          <td>{foodItem.ash}</td>
          <td>{foodItem.fiber}</td>
          <td>{foodItem.sugars}</td>
        </tr>
      {/each}
    {/if}
  </table>
  {/if}



  {#if tab == 3}
    
    <ListArr user={user.email} form_function_call="?/remove_recipes"/>
    <form method="POST">
      <button formaction="?/append_recipes">FOR TESTING APPEND RECIPES</button>
    </form>
  {/if}
</div>


<style>
  td{
    background-color: beige;
    padding: 5px;
    border-radius: 1.5px;
    

  }

  table{
    background-color: rgb(59, 178, 32);
    border-radius: 5px;
    padding: 4px;
  }
</style>