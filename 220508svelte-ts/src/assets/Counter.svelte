<script lang="ts">
  let count: number = 0
  let time = new Date();
  let letter: string;
  const increment = () => count += 2;
  const refresh = () => time = new Date();
  $:{
    time = new Date();
    letter = `${time.getFullYear()}/${(time.getMonth() + 1).toString().padStart(2, '0')}/${time.getDate().toString().padStart(2, '0')} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}.${time.getMilliseconds().toString().padStart(3, '0')}초 ${count}번 누름`;
  }
</script>
<main>
  <button on:click={increment}>
    Count: {count}
  </button>
  <button on:click={refresh}>
    TimeRefresh: {letter}
  </button>
</main>