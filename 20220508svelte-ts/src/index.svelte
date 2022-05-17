<script lang="ts">
  import { onMount, type SvelteComponent } from 'svelte';
  import ReloadPrompt from './components/ReloadPrompt.svelte';
  
  class Component {
    Tar:typeof SvelteComponent;
    path:string;
    hash:string;
    promise = new Promise(res => {});
    on = false;
    static hash = location.hash;
    static arr:Component[] = [];
    constructor(obj:{path:string, hash:string}){
      this.path = obj.path;
      this.hash = obj.hash;
      Component.arr = [...Component.arr, this];
    }
    async getComponent() {
      try{
        this.on = true;
        const data = await import(`./assets/${this.path}.svelte`);
        this.Tar = data.default;
      } catch(err){
        this.on = false;
        throw err;
      }
    }
  }

  $:{
    location.hash = Component.hash;
    const comp = Component.arr.find(v => v.hash === Component.hash);
    if(comp && !comp.on){
      comp.promise = comp.getComponent();
    }
  }


  new Component({
    path:'Home',
    hash:'#home'
  });
  new Component({
    path:'Clock',
    hash:'#clock',
  });
  new Component({
    path:'Counter',
    hash:'#test1',
  });
  new Component({
    path:'test1',
    hash:'#counter',
  });

  const clickEvent = (e:MouseEvent) => {
    const tar = e.target;
    if(tar instanceof HTMLButtonElement){
      Component.hash = tar.dataset.hash;
    }
  };

  onMount(() => {
    if(!Component.arr.find(v => v.hash === Component.hash)){
      Component.hash = Component.arr[0].hash;
    }
  })
</script>
<header>
  {#each Component.arr as {hash:h}}
    <button class="hash {h === Component.hash ? 'active' : ''}" data-hash={h} on:click={clickEvent}>{h.slice(1)}</button>
  {/each}
</header>
<ReloadPrompt />
<main>
  {#each Component.arr as comp}
    {#if comp.hash === Component.hash}
      {#await comp.promise}
        <div>loading...</div>
      {:then _} 
        <svelte:component this={comp.Tar} />
      {:catch err}
        <div>{err}</div>
      {/await}
    {/if}
  {/each}
</main>

<style lang="scss" scoped>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body){
    margin: 0;
  }

  header {
    background-color: ghostwhite;
    padding: 10px;
    border:3px solid black;
    display: flex;
    justify-content: center;
  }

  main {
    display: flex;
    justify-content: center;
    padding: 1em;
    margin: 0 auto;

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
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>

<svelte:head>
  <title>시발?</title>
  <style>
    button {
      font-family: inherit;
      font-size: inherit;
      padding: 1em 2em;
      color: #ff3e00;
      background-color: rgba(255, 62, 0, 0.1);
      border-radius: 2em;
      border: 2px solid rgba(255, 62, 0, 0);
      outline: none;
      width: 200px;
      font-variant-numeric: tabular-nums;
      cursor: pointer;
    }

    button:hover{
      background-color: rgba(255, 62, 0, 0.2);
    }
  
    button:focus {
      border: 2px solid #ff3e00;
    }
  
    button:active, button.active {
      background-color: rgba(255, 62, 0, 0.4);
    }
    button:disabled{
      background-color: rgb(80, 80, 80);
      color:gray;
    }
  </style>  
</svelte:head>