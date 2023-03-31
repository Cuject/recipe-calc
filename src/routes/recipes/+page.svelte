<script lang="ts">
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import Box from "$lib/box.svelte";
	import { createSearchStore, searchHandler } from "$lib/stores/search";
	import { beforeUpdate, onDestroy } from "svelte";
  import { onMount } from "svelte";
  import ListArr from "$lib/storeTestcomps/list_arr.svelte";
  import { count, list_arr } from "$lib/stores/teststores";
  import { recipe_list_arr } from "$lib/stores/recipes";
	import FoodItems from "$lib/foodItems.svelte";
  import { tab_select } from "$lib/stores/tabs";
	import { get } from "svelte/store";
  import Count from "$lib/storeTestcomps/count.svelte";
  import { recipe_index } from "$lib/stores/teststores";
	import Chart from "$lib/Chart.svelte";

  let tabValue = 0;
  let recipe_indexValue = 0;

  const tab_unsub = tab_select.subscribe(value => {tabValue = value;});
  const recipe_unsub = recipe_index.subscribe(value => {recipe_indexValue= value;});

  onDestroy(recipe_unsub)
  onDestroy(tab_unsub);


  //only for testing
  
  //first change
  //second change
  
  let store_arr: any[];
  $:new_food_item = "";

  const unsubscribe1 = list_arr.subscribe(value => {
		store_arr = value;
	}); 

  onDestroy(unsubscribe1)

  $:reactive_recipeValue = recipe_indexValue;
  $:tab = tabValue;

  export let data: PageData;
  $: ({foodItems, user, recipes, recipe_items} = data);

  const searchfoodItems = data.foodItems.map((foodItem) => ({
    ...foodItem,
    searchTerms: `${foodItem.food_ID} ${foodItem.food_ND} ${foodItem.com_Name} ${foodItem.edi_Portion}`
  }));



  function addToArray(){
		$list_arr = <any>recipes;
	};

  beforeUpdate(addToArray)

  

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

  function show(){

  }

  function print(){console.log(data.foodItems)}
  function print_recipes(){console.log(data.recipes)}
  function filter(){tab_select.set(0);}
  function table(){tab_select.set(1);}
  function list(){tab_select.set(2);}
  function recipes_list(){
    tab_select.set(3);
    addToArray();
  }
  function food_item_list(){tab_select.set(4);}


  function display_arr(){console.log(recipe_list_arr)}
  function show_food_items_arr(){console.log(recipe_items[reactive_recipeValue])}

  //console.log("Onload FIRE");

  
  function fct_item_name_pass(nameKey: string, myArray: string | any[]){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].food_ID === nameKey) {
            return myArray[i];
        }
    }
  }

  function append_to_food_item_array(){

  }


  let water_sum = 0;
  
</script>

<script context="module" lang="ts"> 
    export var myValue = "Hello, world!";
    export function setValue(newValue: string) {
      myValue = newValue;
    }
</script>

<div id="navButtons">
  <button on:click={print}>data</button>
  <button on:click={print_recipes}>data recipes</button>
  <button on:click={filter}>filter</button>
  <button on:click={table}>table</button>
  <button on:click={recipes_list}>recipes list</button>
  <button on:click={food_item_list}>foodItems list</button>
  <button on:click={display_arr}>recipes store array</button>
  <button on:click={show}>show</button>
  <button on:click={show_food_items_arr}>food items store array of index {reactive_recipeValue}</button>
  <button on:click={() => {tab_select.set(6); console.log(tab)}}>Chart Display Test</button>
  

  <button on:click={logOut} disabled={loading}>{loading ? "Loading..." : "Log out"}</button>
</div>



<div>
  <h1>Food Item List from FCT</h1>
  <h2>currently on tab {tabValue}</h2>
  <h2>currently on recipe index {reactive_recipeValue}</h2>
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
    <ListArr user={user.email} form_call_add="?/append_recipes" form_call_del="?/remove_recipes" />
  {/if}

  {#if tab == 4}
    <h1>FOOD ITEMS</h1>
    {#if recipe_items[reactive_recipeValue].length != 0}
      <form>
        <input type="text" bind:value={new_food_item}/>
        <button on:click={() => {

          
          console.log(recipe_items[reactive_recipeValue]); 
          recipe_items[reactive_recipeValue].push({food_ID:new_food_item, qty:100}); 
          recipe_items[reactive_recipeValue] = recipe_items[reactive_recipeValue];
        

        }}>Add Food Item</button>
      </form>
      
      <h2>'{recipe_list_arr[reactive_recipeValue].name}' food items:</h2>
      <table>
        <tr style="font-weight: bolder;">
          <td>Qty. (g)</td>
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
          <td></td>
        </tr>
        
        {#each recipe_items[reactive_recipeValue] as foodItem, i}
          <tr>
            <td >
              <form on:change={() => {
                console.log(recipe_items[reactive_recipeValue].map(v => ( v.food_ID ))[i]);
                if(foodItems.find(element => element.food_ID == foodItem.food_ID)?.water  == "-"){
                  water_sum += 0;
                }else{ water_sum += ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.water)/100) * foodItem.qty)}

                
                }}>
                <input type="number" step=0.01 bind:value={foodItem.qty} style="width: 60px;"/>
              </form>
            </td>
            <td>{foodItem.food_ID}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.food_ND       }</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.com_Name      }</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.edi_Portion   }</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.water         == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.water)/100)         * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.energy        == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.energy)/100)        * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.protein       == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.protein)/100)       * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.total_fat     == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.total_fat)/100)     * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.carbohydrates == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.carbohydrates)/100) * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.ash           == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.ash)/100)           * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.fiber         == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.fiber)/100)         * foodItem.qty).toFixed(2)}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.sugars        == "-" ? 0 : ((Number(foodItems.find(element => element.food_ID == foodItem.food_ID)?.sugars)/100)        * foodItem.qty).toFixed(2)}</td>
            <td style="display:flex;">
              <button>View {i}</button>
              <button>Delete</button>

            </td>
          </tr>
        {/each}

        <tr>
          <td colspan="5" style="text-align: center; font-weight:bold;">Total</td>
          <td>{(water_sum = water_sum)}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <button on:click={recipes_list}>Back to Recipes List</button>

    {:else}
    <form>
      <input type="text" bind:value={new_food_item}/>
      <button on:click={() => {

        
        console.log(recipe_items[reactive_recipeValue]); 
        recipe_items[reactive_recipeValue].push({food_ID:new_food_item, qty:100}); 
        recipe_items[reactive_recipeValue] = recipe_items[reactive_recipeValue];
      

      }}>Add Food Item</button>
    </form>
      <h2>'{recipe_list_arr[reactive_recipeValue].name}' is empty</h2>
      <button on:click={recipes_list}>Back to Recipes List</button>
    {/if}

  {/if}

  {#if tab==5}
    <Count/>
  {/if}

  {#if tab==6}
    <Chart/>
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