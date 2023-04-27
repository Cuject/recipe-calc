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
  import { pie_water } from "$lib/stores/pie_chart";
  import { pie_energy } from "$lib/stores/pie_chart";
  import { pie_protein } from "$lib/stores/pie_chart";
  import { pie_fat } from "$lib/stores/pie_chart";
  import { pie_ash } from "$lib/stores/pie_chart";
  import { pie_carb } from "$lib/stores/pie_chart";
  import { pie_fiber } from "$lib/stores/pie_chart";
  import { pie_sugar } from "$lib/stores/pie_chart";

  let tabValue          = 0;
  let recipe_indexValue = 0;
  let pie_water_value   = 0;
  let pie_energy_value  = 0;
  let pie_protein_value = 0;
  let pie_fat_value     = 0;
  let pie_carb_value    = 0;
  let pie_ash_value     = 0;
  let pie_fiber_value   = 0;
  let pie_sugar_value   = 0;

  const tab_unsub         = tab_select   .subscribe(value => {tabValue          = value;});
  const recipe_unsub      = recipe_index .subscribe(value => {recipe_indexValue = value;});
  const pie_water_unsub   = pie_water    .subscribe(value => {pie_water_value   = value;});
  const pie_energy_unsub  = pie_energy   .subscribe(value => {pie_energy_value  = value;});
  const pie_protein_unsub = pie_protein  .subscribe(value => {pie_protein_value = value;});
  const pie_fat_unsub     = pie_fat      .subscribe(value => {pie_fat_value     = value;});
  const pie_carb_unsub    = pie_carb     .subscribe(value => {pie_carb_value    = value;});
  const pie_ash_unsub     = pie_ash      .subscribe(value => {pie_ash_value     = value;});
  const pie_fiber_unsub   = pie_fiber    .subscribe(value => {pie_fiber_value   = value;});
  const pie_sugar_unsub   = pie_sugar    .subscribe(value => {pie_sugar_value   = value;});


  onDestroy(recipe_unsub);
  onDestroy(tab_unsub);

  onDestroy(pie_water_unsub);
  onDestroy(pie_energy_unsub);
  onDestroy(pie_protein_unsub);
  onDestroy(pie_fat_unsub);
  onDestroy(pie_carb_unsub);
  onDestroy(pie_ash_unsub);
  onDestroy(pie_fiber_unsub);
  onDestroy(pie_sugar_unsub);


  //only for testing
  
  //first change
  //second change
  
  let store_arr: any[];
  $:new_food_item = "";

  const unsubscribe1 = list_arr.subscribe(value => {
		store_arr = value;
	}); 

  onDestroy(unsubscribe1)

  $:reactive_recipeIndex = recipe_indexValue;
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

  function print         (){console.log(data.foodItems)}
  function print_recipes (){console.log(data.recipes)}
  function filter        (){tab_select.set(0);}
  function table         (){tab_select.set(1);}
  function list          (){tab_select.set(2);}

  function array_sum_func(addend_array: string | any[]){
    let sum = 0;
    for(let i = 0; i < addend_array.length; i++){
      sum += addend_array[i];
    }

    return sum

  }

  function recipes_list(){
    tab_select.set(3);
    addToArray();
  }
  function food_item_list(){tab_select.set(4);}


  function display_arr(){console.log(recipe_list_arr)}
  function show_food_items_arr(){console.log(recipe_items[reactive_recipeIndex])}

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


  
  $: water_sum_arr     = [];
  $: energy_sum_arr    = [];
  $: protein_sum_arr   = [] ;
  $: fat_sum_arr       = [];
  $: carb_sum_arr      = [];
  $: ash_sum_arr       = [];
  $: fiber_sum_arr     = [];
  $: sugar_sum_arr     = [];


  $:water_sum   = 0;
  $:energy_sum  = 0;
  $:protein_sum = 0;
  $:fat_sum     = 0;
  $:carb_sum    = 0;
  $:ash_sum     = 0;
  $:fiber_sum   = 0;
  $:sugar_sum   = 0;

  let sample_value = 9;
  let sample_arr = [1,2,3,4,5];


  function sumFunc(sum_arr: number[]){
    let sum = 0

    for(let j = 0; j < sum_arr.length; j++){
    sum += sum_arr[j]
    }

    return sum;
  }

  let can_add = false
  
</script>

<script context="module" lang="ts"> 
    export var myValue = "Hello, world!";
    export function setValue(newValue: string) {
      myValue = newValue;
    }
</script>

<div id="navButtons">
  <button on:click={print}          >  data                </button>
  <button on:click={print_recipes}  >  data recipes        </button>
  <button on:click={filter}         >  filter              </button>
  <button on:click={table}          >  table               </button>
  <button on:click={recipes_list}   >  recipes list        </button>
  <button on:click={food_item_list} >  foodItems list      </button>
  <button on:click={display_arr}    >  recipes store array </button>
  <button on:click={show}           >  show                </button>

  <button on:click={show_food_items_arr}>  food items store array of index {reactive_recipeIndex}</button>
  <button on:click={() => {tab_select.set(6); console.log(tab)}}>Chart Display Test</button>

  <button on:click={() => {console.log("Water Sum Array: " + water_sum_arr)}}     >  show food data array                </button>
  <button on:click={() => {console.log(array_sum_func(water_sum_arr))}}     >  data array sum           </button>


  

  <button on:click={logOut} disabled={loading}>{loading ? "Loading..." : "Log out"}</button>
</div>



<div>
  <h1>  Food Item List from FCT                            </h1>
  <h2>  currently on tab {tabValue}                        </h2>
  <h2>  currently on recipe index {reactive_recipeIndex}   </h2>
  <p>   Connected with email {user.email}                  </p>
  <p>   <a href="/profile">See your profile</a>            </p>
  <hr/>

  
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
    <div style="width:500px; height:500px; display:none">
      <Chart
      water   = {pie_water_value}
      energy  = {pie_energy_value}
      protein = {pie_protein_value}
      fat     = {pie_fat_value}
      carb    = {pie_carb_value}
      ash     = {pie_ash_value}
      fiber   = {pie_fiber_value}
      sugar   = {pie_sugar_value}
      />
    </div>
    {#if recipe_items[reactive_recipeIndex].length != 0}
      <form>
        <input type="text" bind:value={new_food_item}/>
        <button on:click={() => {
          //console.log(recipe_items); 
          recipe_items[reactive_recipeIndex].push({food_ID:new_food_item, qty:100}); 
          recipe_items[reactive_recipeIndex] = recipe_items[reactive_recipeIndex];
          can_add = false

          //console.log(recipe_items[reactive_recipeIndex].map(v => ( v.food_ID )));
          
        

        }}>Add Food Item</button>
      </form>
      
      <h2>'{recipe_list_arr[reactive_recipeIndex].name}' food items:</h2>
      <table>
        <tr style="font-weight: bolder;">
          <td>  Qty. (g)</td>
          <td>  food ID</td>
          <td>  Food name and Description </td>
          <td>  Common Name               </td>
          <td>  Edible Portion (%)        </td>
          <td>  water (g)                 </td>
          <td>  energy (kcal)             </td>
          <td>  protein (g)               </td>
          <td>  total_fat (g)             </td>
          <td>  carbohydrates (g)         </td>
          <td>  ash (g)                   </td>
          <td>  fiber (g)                 </td>
          <td>  sugars (g)                </td>
          <td>                            </td>
        </tr>
        
        {#each recipe_items[reactive_recipeIndex] as foodItem, i}
          <tr>
            <td >
              <form>
                <input type="number" step=0.01 bind:value={foodItem.qty} style="width: 60px;" 
                on:change={() => {can_add = false}}/>
              </form>
            </td>
            <td>{foodItem.food_ID}</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.food_ND       }</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.com_Name      }</td>
            <td>{foodItems.find(element => element.food_ID == foodItem.food_ID)?.edi_Portion   }</td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td style="display:flex;">
              <button>View {i}</button>
              <button>Delete</button>
            </td>

          </tr>
        {/each}

        <tr style="text-align: center; font-weight:bold; font-size:20px">
          <td colspan="5"> Total </td>
          <td></td> 
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

        
        console.log(recipe_items[reactive_recipeIndex]); 
        recipe_items[reactive_recipeIndex].push({food_ID:new_food_item, qty:100}); 
        recipe_items[reactive_recipeIndex] = recipe_items[reactive_recipeIndex];
      

      }}>Add Food Item</button>
    </form>
      <h2>'{recipe_list_arr[reactive_recipeIndex].name}' is empty</h2>
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
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  #Chart{
    
  }
</style>