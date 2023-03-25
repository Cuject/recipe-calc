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
      const {user, db} = await getUser(cookies)
      //const db = (await clientPromise).db(DATABASE_NAME)
      db.collection<recipe>("recipes").insertOne({user:user.email, name:"4hf9a4hfa9hw", food_items:[] });
      console.log("result:")
      console.log(form_data)
      //goto("/recipes")
    },

    remove_recipes: async({ cookies }) => {
      const {user, db} = await getUser(cookies)

      db.collection<recipe>("recipes").deleteOne({user:user.email, name:"4hf9a4hfa9hw", food_items:[] });
      
      const recipes_data = await db.collection<recipe>("recipes").find({user:user.email}).toArray();
      console.log(recipes_data)
    },

    save_recipes: async({ cookies }) => {
      const {user, db} = await getUser(cookies)

      //Goal: replace each matched named recipe's 
      //(that belong's to the logged in user) data to the one in the array store
      
      const recipes_data = await db.collection<recipe>("recipes").find({user:user.email}).toArray();
      //console.log(recipes_data)
    }

    ,
    // This is simply added for testing purposes
    login: async ({ cookies, request }) => {
      try {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        const user = await db
          .collection<User>("users")
          .findOne({ email });
        console.log(data) // print on console the data in the field
        if (user == null) {
          return fail(401, {
            error: "The user doesn't exist, or the email address is not correct."
          });
        }
        if (!validatePassword(password, user.password)) {
          return fail(401, {
            error: "Wrong password, or email address."
          });
        }
        cookies.set("userId", encryptUserId(user._id.toString(), ip.address()), { path: "/", sameSite: true, secure: true });
      } catch (e) {
        return fail(400, {
          error: "Cannot login"
        });
      }
    }, 
    
}



