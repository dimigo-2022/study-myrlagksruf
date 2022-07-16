<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
</script>

<Counter on:inc={(e) => {console.log(e.detail.count)}}/>
<main>
  <div class="red">
    <div></div>
  </div>
  <div class="orange"></div>
  <div class="yellow"></div>
  <div class="green"></div>
  <div class="blue"></div>
  <div class="navy"></div>
  <div class="purple"></div>
</main>

<style lang="scss">
  $size:50px;
  $colors:(red, orange, yellow, green, blue, navy, purple);
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;

    & > div{
      border: 1px solid black;
      padding: 30px;
      height: $size * 2;
      background-color: red;
      box-sizing: border-box;
    }

    @for $i from 1 through 7{
      & > div.#{"" + nth($colors, $i)}{
        width: $size * $i;
        background-color: nth($colors, $i);
      }
    }
  }
</style>