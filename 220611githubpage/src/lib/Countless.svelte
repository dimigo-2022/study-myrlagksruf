<script lang="ts">
  let count: number = 0;
  let value:string;
  interface Student{
    name:string;
    age:number;
    height:number;
    weight:number;
  }
  let obj:Student[] = [];
  let query:URLSearchParams;
  export let hash:string;
  const decrement = () => {
    count -= 1
  };
  const main = async () => {
    // 코드 입력
  };

  const enter = (e:KeyboardEvent) => {
    //코드 입력
  };
  let promise = main();
</script>
<input type="text" on:keydown={enter} bind:value={value}>
{#await promise}
  <div>기다려</div>
{:then _} 
  {#each obj as val}
    {#if val.name.includes(query.get('name') ?? '')}
      <div>{val.name}</div>
    {/if}
  {/each}
{/await}

<button on:click={decrement}>
  Click - {count}
</button>
<button on:click={() => hash = '#counter'}>카운터로</button>

<style>
  :root{
    --jin:#003eff;
    --shit:rgba(0, 62, 255, 0);
    --shit1:rgba(0, 62, 255, 0.1);
    --shit2:rgba(0, 62, 255, 0.2);
  }
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: var(--jin);
    background-color: var(--shit1);
    border-radius: 2em;
    border: 2px solid var(--shit);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid var(--jin);
  }

  button:active {
    background-color: var(--shit2);
  }
</style>
