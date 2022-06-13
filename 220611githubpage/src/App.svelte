<script lang="ts">
  import { onMount } from 'svelte';
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
  import Countless from './lib/Countless.svelte'
  let flag = false;
  let hash:string;
  hash = location.hash;
  $: if(flag) location.hash = hash;
  onMount(() => flag = true);
  const back = `--logo:url(${logo})`;
</script>
<header style={back}>
  <button on:click={() => hash = '#counter'}>카운터</button>
  <button on:click={() => hash = '#countless'}>카운트리스</button>
  <div></div>
</header>
{#if hash === '#counter'}
  <main>
    <img src={logo} alt="Svelte Logo" />
    <h1>Hello Typescript!</h1>
    {#each Array(50) as _}
      <Counter bind:hash={hash} />
    {/each}
    <p>
      Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
      apps.
    </p>
  
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
  </main>
{:else}
  <main>
    <img src={logo} alt="Svelte Logo" />
    <img src={logo} alt="Svelte Logo" />
    <h1>Hello Typescript!</h1>
    <Countless bind:hash={hash} />
  </main>
{/if}

<style>
  :global(body){
    margin: 0;
  }
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  header{
    position: sticky;
    display: flex;
    top:0;
    background-color: blue;
  }
  header > div{
    color:white;
    background-image: var(--logo);
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
    width:100px;
  }

  main {
    text-align: center;
    padding: 1em;
    overflow: auto;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: white;
    background-color: rgba(255, 62, 0, 0.5);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 1);
  }
</style>
