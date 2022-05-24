<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    export let tr = 5;
    export let td = 5;
    let customValue:string;
    customValue = String(td);
    let tdTag:HTMLTableCellElement;
    let radio:string;
    let check:string[] = [];
    let setT:NodeJS.Timeout;
    $:{
        td = parseInt(customValue) ? parseInt(customValue) : 0;
    }
    onMount(() => {
        console.log(tdTag);
    });
    afterUpdate(() => {
        console.log(radio, check);
        clearTimeout(setT);
        setT = setTimeout(() => {
            radio = '';
            check = check.slice(0, -1);
        }, 1000);
    });
</script>

{#each Array(10) as _,index}
    <input type="radio" bind:group={radio} value="index-{index}">
{/each}

{#each Array(10) as _,index}
    <input type="checkbox" bind:group={check} value="index-{index}">
{/each}

<table>
    {#if $$slots.default}
        <thead>
            <tr>
                <th colspan={td}><slot /></th>
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
                    <td>col : {ind1}, row : {ind2}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table{
        border-collapse: collapse;
    }

    td, th{
        border:1px solid black;
    }
</style>