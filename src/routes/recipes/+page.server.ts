import type { PageServerLoad } from "./$types";
import getUser from "$db/getUser";
import type { Actions } from './$types';
import { DATABASE_NAME } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { encryptUserId, hashPassword, validatePassword } from '$db/security';
import clientPromise from "$db/mongo";
import ip from "ip";
import { list_arr } from "$lib/stores/teststores";
import { goto } from "$app/navigation";
import { recipe_list_arr } from "$lib/stores/recipes";
import { get } from "svelte/store";


const test_Arr = [1, 2, 3, 4, 5];



export const load: PageServerLoad = async ({ cookies }) => {
  const {user, db} = await getUser(cookies);
  const fct_data = await db.collection<food_item>("fct").find({}).toArray();
  const recipes_data = await db.collection<recipe>("recipes").find({user:user.email}).toArray();

  
  return {
    foodItems: fct_data.map(v => ({ ...v, _id: v._id.toString() })),
    recipes: recipes_data.map(r => ({ ...r, _id: r._id.toString() })),

    user: {
      email: user.email
    },
  }
};



export const actions: Actions = {
    append_recipes: async({ cookies, request }) => {

      const form_data = await request.formData();
      const append_input = form_data.get("append_input") as string
      const {user, db} = await getUser(cookies)
      const recipes_data = await db.collection<recipe>("recipes").find({user:user.email}).toArray();
      const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})
      //const db = (await clientPromise).db(DATABASE_NAME)
      if(append_input == "" || recipes_names.includes(append_input)){ // if empty string or if name already exists for user (will make a replace method later)
        //console.log(recipes_names.includes(append_input))
      }else{
        db.collection<recipe>("recipes").insertOne({user:user.email, name:append_input, food_items:[] });
      }
      
     // console.log("result:")
      //console.log(recipes_names.includes(append_input)) // IT FUCKING WORKS LET'S GOOOOOOOOOOOOOO
      //goto("/recipes")
    },

    remove_recipes: async({ cookies , request}) => {
      const {user, db} = await getUser(cookies)
      const index_data = await request.formData();
      const index = Number(index_data.get("index"))
      const recipes_data = await db.collection<recipe>("recipes").find({user:user.email}).toArray();
      const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

      db.collection<recipe>("recipes").deleteOne({user:user.email, name:recipes_names[index], food_items:[] });
      
      
      //console.log(recipes_names[2])
      //console.log("called delete method")
      //console.log(test_Arr)
      //console.log(myValue)
      //console.log(Number(index_data.get("index")))
    },

    save_recipes: async({ cookies }) => {
      const {user, db} = await getUser(cookies)

      //Goal: replace each matched named recipe's 
      //(that belong's to the logged in user) data to the one in the array store
      
      const recipes_data = await db.collection<recipe>("recipes").find({user:user.email}).toArray();
      //console.log(recipes_data)
    }

    , 
    
}



