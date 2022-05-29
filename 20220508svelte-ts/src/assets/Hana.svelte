<script lang="ts">
    import {beforeUpdate, onMount} from 'svelte';
    export let inner:string = '';
    export let num:number = 2;
    let inner2:string;
    let check = false;
    let n = 0;
    let way = 1;
    let div:HTMLDivElement[] = [];
    let pre = 0;
    $: {
        inner2 = `<strong style="color:rgb(255,${256 - n},${256 - n});background-color:rgb(255,${n},${n})">${inner}</strong>`.repeat(num);
    }

    const main = () => {
        n += way;
        if(n === 0 || n === 256){
            way = -way;
        }

        if(div.length !== pre){
            console.log(div);
            pre = div.length;
        }
        requestAnimationFrame(main);
    };
    main();
</script>
<main>
    <input list="list" type="text" bind:value={inner} autocomplete="on">
    <datalist id="list">
        <option value="이비즈니스"></option>
        <option value="디지털컨텐츠"></option>
        <option value="해킹방어"></option>
        <option value="웹프로그래밍"></option>
    </datalist>
    <input type="checkbox" bind:checked={check}>
    {#if check}
        {#each Array(num) as _, index}
            <div bind:this={div[index]} on:contextmenu|preventDefault>{@html inner2}</div>
        {/each}
    {:else}
        <div bind:this={div[0]} on:contextmenu|preventDefault>{@html inner2}</div>
    {/if}
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
    }
</style>