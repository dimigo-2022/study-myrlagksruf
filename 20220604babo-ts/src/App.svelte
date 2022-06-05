<script lang="ts">
</script>

<main>
  {#each Array(30) as _,index}
    <div>{index}</div>
  {/each}
</main>

<style>
  :global(body){
    margin: 0;
  }
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main{
    display: flex;
    flex-wrap: wrap;
    width:100vw;
  }

  main > div{
    display: block;
    box-sizing: border-box;
    height: 100px;
    flex-basis: calc(100% / 4);
    font-size: 2em;
    border:1px solid black;
    color:white;
    background-color: black;
  }

  @media (max-width: 1180px) {
    main > div{
      flex-basis: calc(100% / 3);
      background-color: red;
    }
  }

  @media (max-width: 820px) {
    main > div{
      flex-basis: calc(100% / 2);
      background-color: blue;
    }
  }
  @media (max-width: 625px) {
    main{
      display: none;
    }
    main > div{
      flex-basis: calc(100% / 1);
      background-color: green;
    }
  }
</style>
