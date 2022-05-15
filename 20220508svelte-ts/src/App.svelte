<script lang="ts">
  import Clock from './lib/Clock.svelte';
  import Test1 from './lib/test1.svelte';
</script>

<main>
  <Test1 />
  <Clock --size="400px"/>
</main>

<style lang="scss" scoped>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
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
  
    button:focus {
      border: 2px solid #ff3e00;
    }
  
    button:active {
      background-color: rgba(255, 62, 0, 0.2);
    }
    button:disabled{
      background-color: rgb(80, 80, 80);
      color:gray;
    }
  </style>  
</svelte:head>