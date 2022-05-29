<script lang="ts">
  const arr:{v:number,w:number}[][] = [];
  for(let i = 0; i < 30; i++){
    arr.push([]);
    for(let j = 0; j < 30; j++){
      arr[i][j] = {v:0,w:1};
    }
  }
  const queue:[number, number][] = [];
  const haveTo = new Set<string>();

  const click = (_x:number, _y:number) => {
    if(haveTo.has(`${_x},${_y}`)) return;
    haveTo.add(`${_x},${_y}`);
    for(let i of [[0, 1], [0, -1], [1, 0], [-1, 0]]){
      const x = _x + i[0];
      const y = _y + i[1];
      if(x >= 0 && x < 30 && y >= 0 && y < 30 && arr[y][x].v === 0 && !queue.some(v => v[0] === x && v[1] === y)){
        queue.push([x, y]);
      }
    }
  }

  const main = () => {
    haveTo.forEach(v => {
      const [x, y] = v.split(',');
      const t = arr[y][x];
      t.v += t.w * 5;
      if(t.v === 0 || t.v === 255) t.w = -t.w;
      arr[y][x] = { ...t };
      if(t.v === 0) haveTo.delete(`${x},${y}`);
    });
    let len = queue.length;
    for(let i = 0; i < len; i++){
      click(...queue[i]);
    }
    for(let i = 0; i < len; i++) queue.shift();
    requestAnimationFrame(main);
  }
  main();
</script>
<main>
  <table>
    <tbody>
      {#each arr as arrOne,y}
        <tr>
          {#each arrOne as val,x}
            <td on:click={() => click(x, y)} style="background-color:rgb(255,{255-val.v},{255-val.v}); border:1px solid {val.v > 0 ? 'black' : 'white'}"></td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  :global(body){
    margin: 0;
  }
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  table{
    border-collapse: collapse;
  }

  td, th{
    text-align: left;
    width: 20px;
    height: 20px;
  }

  main {
    text-align: center;
    margin: 0 auto;
  }
</style>
