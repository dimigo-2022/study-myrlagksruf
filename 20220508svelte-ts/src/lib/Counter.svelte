<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 2
  }

  let promise = Promise.resolve('');

  let disabled = false;

  async function search(){
    disabled = true;
    try{
      const res = await fetch('https://dummy.in-coding.com/fetch001/champion.html');
      const txt = res.text();
      await new Promise(res => setTimeout(res, 3000));
      disabled = false;
      return txt;
    } catch(err){
      disabled = false;
      throw err;
    }
  }
</script>

<button on:click={increment}>
  Clicks: {count}
</button>
<button { disabled } on:click={() => promise = search()}>fetch</button>
{#await promise}
  <div>loading...</div>  
{:then value} 
  <div>{@html value }</div>
{:catch err}
  <div>{ err }</div>
{/await}


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
