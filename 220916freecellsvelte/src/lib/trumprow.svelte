<script lang="ts">
    import Trump from "./trump.svelte";
    import { cards, pickStore, moveTo, pickReset } from './state/store';
    import { isPosible } from "./module/function";
    export let row:number;

    const cardClick = (e:MouseEvent) => {
        if($pickStore.index === -1 || $pickStore.row === -1) return;

        let toLastCard = $cards[row].at(-1);

        if($pickStore.row < 9 &&
        (!toLastCard || isPosible($cards[$pickStore.row][$pickStore.index], toLastCard))){
            moveTo($pickStore.row, $pickStore.index, row);
        }
        pickReset();
        e.stopPropagation();
    };
</script>
<div on:click|capture={cardClick}>
    {#each $cards[row] as obj}
        <Trump {...obj} />
    {/each}
</div>
<style lang="scss">
    @import '../assets/global.scss';
    div{
        position: relative;
        display: flex;
        flex-direction: column;
        flex-basis: min(100px, calc(100vw / ($c / $w)));
    }
</style>