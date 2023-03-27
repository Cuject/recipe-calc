import { writable } from 'svelte/store';

export const count = writable(0);
export const list_arr = writable([]);
export const recipe_index = writable(0)