<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { pickStore, cards } from './state/store';
    import type { iTrump } from './module/trump';
    import { isPosible } from './module/function';

    const obj = { H:0, S:1, D:2, C:3, X:-1 };
    export let shape:iTrump['shape'];
    export let num:number;
    export let index:number = -1;
    export let row:number = -1;
    export let isTrans = true;

    let shapeToObj:number;
    $: shapeToObj = obj[shape];
    let pick = false;
    const unsub = pickStore.subscribe(v => {
        if(v.index === index && v.row === row) pick = true;
        else pick = false;
    });

    onDestroy(unsub);

    const cardPick = () => {
        if(row < 8){
            for(let i = index; i < $cards[row].length; i++){
                if(!($cards[row][i + 1])) break;
                if(!isPosible($cards[row][i + 1], $cards[row][i])) return;
            }
        }
        pickStore.set({row, index});
    };
</script>
<div on:click={cardPick}
    style:--index={isTrans ? index : 0}
    class="trump"
    class:pick
    data-shape={shapeToObj}
    data-num={num}></div>
<style lang="scss">
    @import '../assets/global.scss';
    $width:min($w * 1px, calc(100vw / ($c / $w)));
    $height:min($h * 1px, calc(100vw / ($c/ $h)));
    .trump{
        --index:0;
        transition: filter 0.3s;
        position: relative;
        transform: translateY(calc(var(--index) * $height / 5));
        &[data-shape][data-num]::before{
            content: "";
            position: absolute;
            left:0;
            top:0;
            background-image: url("../assets/com.png");
            background-size: 1300% 400%;
            width:$width;
            height: $height;
        }
        // &[data-shape][data-num]:last-child{
        //     height: $height;
        // }
        &[data-shape="-1"][data-num="-1"]::before{
            background: transparent;
        }
        @for $var from 1 through 13 {
            &[data-num="#{$var}"]::before{
                background-position-x: calc(100% / 12 * ($var - 1));
            }
        }
        @for $var from 0 through 3 {
            &[data-shape="#{$var}"]::before{
                background-position-y:calc(100% / 3 * ($var - 1));
            }
        }
    }
    .pick{
        filter: invert(1);
    }
</style>