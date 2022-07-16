<script lang="ts">
    import { afterUpdate, onMount, beforeUpdate, onDestroy } from "svelte";
    export let tr = 5;
    export let td = 5;
    export let items:string[] = [];
    let customValue:string;
    let table:HTMLTableElement;
    customValue = String(td);
    let tdTag:HTMLTableCellElement;
    let radio:string;
    let check:string[] = [];
    let count = 0;
    let setT:NodeJS.Timeout;
    let req:number;
    $:{
        td = parseInt(customValue) ? parseInt(customValue) : 0;
    }
    onMount(() => {
        console.log(table);
    });

    // beforeUpdate(() => {
    //     console.log('업데이트 전');
    // });
    
    // afterUpdate(() => {
    //     console.log('업데이트 후');
    // });

    // onDestroy(() => {
    //     console.log('없어짐');
    //     cancelAnimationFrame(req);
    // });

    // const main = () => {
    //     count++;
    //     console.log(count);
    //     req = requestAnimationFrame(main);
    // }

    // req = requestAnimationFrame(main);

    // afterUpdate(() => {
    //     console.log(radio, check);
    //     clearTimeout(setT);
    //     setT = setTimeout(() => {
    //         radio = '';
    //         check = check.slice(0, -1);
    //     }, 1000);
    // });
</script>

{#each Array(10) as _,index}
    <input type="radio" bind:group={radio} value="index-{index}">
{/each}

{#each Array(10) as _,index}
    <input type="checkbox" bind:group={check} value="index-{index}">
{/each}

<table bind:this={table}>
    {#if $$slots.header}
        <thead>
            <tr>
                <th colspan={td}><slot name="header" /></th>
            </tr>
        </thead>
    {/if}
    <tbody>
        <tr>
            <td bind:this={tdTag} colspan={td} contenteditable bind:innerHTML={customValue}></td>
        </tr>
        {#each Array(tr) as _, ind1}
            <tr>
                {#each Array(td) as _, ind2}
                    <td>col : {ind1 + count}, row : {ind2 + count}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
    {#if $$slots.footer}
        <tbody>
            {#each items as item}
                <tr>
                    <th colspan={td}><slot name="footer" arr={item} /></th>
                </tr>
            {/each}
        </tbody>
    {/if}
</table>

<style>
    table{
        border-collapse: collapse;
    }

    td, th{
        border:1px solid black;
    }
</style>