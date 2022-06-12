<script lang="ts">
  import logo from './assets/svelte.png';
  import Table from './lib/Table.svelte';
  import TableTest from './lib/TableTest.svelte';
  let x:TableTest;
</script>
<svelte:window on:keydown={(e) => console.log(e.code)} />
<main>
  <button on:click={(e) => {x.$destroy();e.currentTarget.remove()}}>없애자</button>

  <TableTest td={5} tr={5} bind:this={x} />

  <TableTest td={3} tr={3}>
    <h1 slot="header">어떤일?</h1>
    <h2 slot="footer">만든사람 : 김한결</h2>
  </TableTest>
  
  <!-- 5 x 5 -->
  <TableTest items={['하나', '둘', '셋']}>
    <svelte:fragment slot="footer" let:arr={str}>{str}</svelte:fragment>
  </TableTest>
  <Table headers={["id", "name", "age"]} tds={[[0, "김한결", 20], [1, "황승현", 25], [2, "문성준", 30]]} />
</main>
<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
