<script lang="ts">
  import { fade } from 'svelte/transition'
  interface iData{
    data:{
      ally_tips:string[];
      enemy_tips:string[];
      id:number;
      image_url:string;
      key:string;
      name:string;
      passive:{
        description:string;
        image_url:string;
        name:string;
        video_url:string;
      };
      spells:{
        cooldown_burn:number[];
        cost_burn:number[];
        description:string;
        image_url: string;
        key: "Q"|"W"|"E"|"R";
        max_rank: number;
        name: string;
      }[];
    }[];
  }

  const main = async() => {
    const res = await fetch('/api/meta/champions?hl=ko_KR');
    const json = (await res.json()) as iData;
    return json;
  }
  let promise = main();
</script>

<main>
  {#await promise}
    <div transition:fade id="loader"></div>
  {:then value} 
    <table>
      <thead>
        <tr>
          <th>챔피언</th>
          <th>패시브</th>
          <th>Q</th>
          <th>W</th>
          <th>E</th>
          <th>R</th>
        </tr>
      </thead>
      <tbody>
        {#each value.data as data}
          <tr>
            <td><img width={64} src={data.image_url} alt={data.name}><br>{data.name}</td>
            <td><img src={data.passive.image_url} alt={data.passive.name} /><br>{data.passive.name}</td>
            {#each data.spells as spell}
              <td><img src={spell.image_url} alt={spell.name} /><br>{spell.name}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/await}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  table{
    border-collapse: collapse;
  }

  td, th{
    text-align: left;
    border:1px solid black;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  #loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9999;
      transition: 0.2s ease;
  }

  #loader::before{
      content:"Now Loading";
      color:white;
      font-size: 50px;
      animation:loader 1.5s steps(4) infinite alternate;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }

    @keyframes loader{
        0%{
            content:"Now Loading";
        }
        25%{
            content:"Now Loading.";
        }
        50%{
            content:"Now Loading..";
        }
        75%{
            content:"Now Loading...";
        }
        100%{
            content:"Now Loading....";
        }
    }
</style>
