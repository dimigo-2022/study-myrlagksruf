<script lang="ts">
  let count: number = 0
  const decrement = () => {
    count -= 1
  }
</script>

<button on:click={decrement}>
  Click - {count}
</button>

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
