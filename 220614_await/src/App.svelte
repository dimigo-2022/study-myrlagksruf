<script lang="ts">
  import logo from './assets/svelte.png'
  let x:Promise<iData[]>;
  let value = '';

  interface iData {
    name:string;
    age:number;
    height:number;
    weight:number;
  }

  const main = async () => {
    const res = await fetch('/student.json');
    const json = (await res.json()) as iData[];
    return json;
  };

  // 바로 실행이 되지 않고, 몇 틱 후에 실행된다.
  x = main();
</script>
<input type="text" bind:value={value}>
<main>
  {#await x}
    <div>로딩 중...</div>
  {:then v} 
    {#each v as {age, name}}
      {#if name.includes(value)}
        <div>{name} : {age}</div>
      {/if}
    {/each}
  {/await}
</main>
<style>
  
</style>
