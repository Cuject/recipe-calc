import { list_arr } from "$lib/stores/teststores";

export let recipe_list_arr: any[];

list_arr.subscribe(value => {
		recipe_list_arr = value;
});