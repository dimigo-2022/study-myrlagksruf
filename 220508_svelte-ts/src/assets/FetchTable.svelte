<script lang="ts">
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
  <main>
    <button { disabled } on:click={() => promise = search()}>fetch</button>
    {#await promise}
      <div>loading...</div>  
    {:then value} 
      <div>{@html value }</div>
    {:catch err}
      <div>{ err }</div>
    {/await}
  </main>