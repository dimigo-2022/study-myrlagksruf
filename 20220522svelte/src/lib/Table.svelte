<script lang="ts">
  export let tds:any[][] = [];
  export let headers:any[] = [];
  let ths:any[] = [];

  $:{
    ths = [...headers, ...new Array(Math.max(tds.length - headers.length, 0)).fill('')];
  }
</script>
<table>
  <thead>
    <tr>
      <th colspan={ths.length}>
        <select>
          {#each tds as tr} 
            <option value={tr[0]}>{tr[1]}</option>
          {/each}
        </select>
      </th>
    </tr>
    <tr>
      {#each ths as th}
        <th>{th}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each tds as tr}
      <tr>
        {#each tr as td}
          <td>{td}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table{
    border-collapse: collapse;
  }

  td, th{
    border:1px solid black;
    padding:5px;
  }
</style>