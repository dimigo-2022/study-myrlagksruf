<script lang="ts">
  import logo from './assets/svelte.png';
  import Table from './lib/Table.svelte';
  import TableTest from './lib/TableTest.svelte';
</script>

<main>
  <!-- 3 x 3 -->
  <TableTest td={3} tr={3}>
    <h1>어떤일?</h1>
  </TableTest>
  
  <!-- 5 x 5 -->
  <TableTest />
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
