import { list_arr } from "$lib/stores/teststores";

export let recipe_list_arr: any[];

list_arr.subscribe(value => {
		recipe_list_arr = value;
});

export var select_index: number = 1;

export function setIndex(newValue: number) {
	select_index = newValue;
  }