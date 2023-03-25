<script lang="ts">
	import type { ActionData } from './$types';
  import { enhance, type SubmitFunction } from '$app/forms';

  let isConnected: boolean = false;
  let loading = false;

  export let form: ActionData;

  const handleSubmit: SubmitFunction = () => {
    loading = true;

    return async ({result, update}) => {
      await update();
      if (result.type === "success") {
        isConnected = true; 
      }
      loading = false;
    };
  }

  function return_to_login_page(){
    console.log("NO USER FOUND BITCH")
  }
</script>

<main>
  <h1>Food Composition Analysis</h1>
  <p>MongoDB test website</p>
  <hr />
  {#if form?.error}
  <form method="POST" use:enhance={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button formaction="?/login" disabled={loading}>{loading ? "Loading..." : "Log in"}</button>
      <button formaction="?/register" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
      <button>Log in as Guest</button>
    </form>
    <p style="color:red;">{form.error}</p>
  {:else}
    {#if !isConnected}
      <form method="POST" use:enhance={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button formaction="?/login" disabled={loading}>{loading ? "Loading..." : "Log in"}</button>
        <button formaction="?/register" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
        <button>Log in as Guest</button>
      </form>
    {:else}
      <p>Go look at the <a href="/recipes">projects</a></p>
    {/if}
  {/if}
</main>
