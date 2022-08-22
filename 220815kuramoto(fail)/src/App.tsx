import { Component, createSignal, For, Accessor, Setter, batch, onMount } from 'solid-js';
import './App.scss';
import Bird from './Bird';

const App: Component = () => {
  const arr = Array(100);
  let div:Element[] = [];
  onMount(()=>console.log(div));
  return (
    <>
      {/* <button onClick={addArr}>클릭하면 늘어남</button>
      <button onClick={removeArr}>클릭하면 줄어듬</button> */}
      <For ref={div} each={arr} fallback={<>로딩중...</>}>
        {(item, ind) => <Bird ref={div[ind()]} />}
      </For>
    </>
  );
};

export default App;
