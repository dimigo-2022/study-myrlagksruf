<script lang="ts">
  import Clock from './lib/Clock.svelte';
  import Counter from './lib/Counter.svelte';
  import Test1 from './lib/test1.svelte';

  const arr = [{
    Tar:Clock,
    props:{
      size:'400px'
    },
    hash:'#clock'
  }, {
    Tar:Test1,
    hash:'#test1'
  }, {
    Tar: Counter,
    hash:'#counter'
  }]
  
  let hash = '';
  $:{
    location.hash = hash;
  }

  const clickEvent = (e:MouseEvent) => {
    const tar = e.target;
    if(tar instanceof HTMLButtonElement){
      hash = tar.dataset.hash;
    }
  };
</script>
<header>
  {#each arr as {hash:h}}
    <button class="hash {h === hash ? 'active' : ''}" data-hash={h} on:click={clickEvent}>{h.slice(1)}</button>
  {/each}
</header>
<a href="/lib">테스트</a>
<main>
  {#each arr as {Tar, props, hash:h}}
    {#if h === hash}
      <Tar {...props}/>
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