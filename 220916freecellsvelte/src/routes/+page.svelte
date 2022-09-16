<script lang="ts">
    import Trumprow from '$lib/trumprow.svelte';
    import Trump from '$lib/trump.svelte';
    import { cards, pickStore, moveTo, pickReset, makeCard } from '$lib/state/store';
    import { onMount } from 'svelte';
    let inverse = false;
    onMount(() => {
        const makeCardIns = makeCard();
        let count = 0;
        const loop = () => {
            let res = makeCardIns(count % 8, Math.floor(count++ / 8));
            if(!res) requestAnimationFrame(loop);
        }
        loop();
    })
    const leftClick = (index:number) => (e:MouseEvent) => {
        let row = $pickStore.row;
        let pi = $pickStore.index;
        pickReset();
        if(row !== -1 && pi !== -1) e.stopPropagation();
        if($cards[8][index] || pi + 1 !== $cards[row].length) {
            return;
        }
        moveTo(row, pi, 8, index);
    };
</script>
<svelte:window on:mousemove={e => inverse = innerWidth / 2 > e.clientX} />
<div id="container">
    <header>
        {#each $cards[8] as obj, index}
            <div class="left" on:click|capture={leftClick(index)}>
                {#if obj}
                    <Trump {...obj} isTrans={false} />
                {/if}
            </div>
        {/each}
        <div class="middle" class:inverse></div>
        {#each $cards[9] as obj}
            <div class="right">
                {#if obj}
                    <Trump {...obj} isTrans={false} />
                {/if}
            </div>
        {/each}
    </header>
    <main>
        {#each Array(8) as _, index}
            <Trumprow row={index} />
        {/each}
    </main>
</div>
<style lang="scss">
    @import '../assets/global.scss';
    :global(*){
        box-sizing: border-box;
        user-select: none;
    }
    :global(body){
        margin:0;
        overflow-y: hidden;
        background-color: #007f00;
    }
    #container{
        display: flex;
        width: 100%;
        max-width: $c * 1px;
        height: 100vh;
        flex-direction: column;
        margin:auto;
        header{
            display: flex;
            height: min($h * 1px + 4px, calc(100vw / 6));
            margin-bottom: min($m * 1px, calc(100vw / ($c / $m)));
            div:not(.middle){
                box-sizing: content-box;
                border:2px solid;
                border-color:black #00f500 #00f500 black;
                /* border-radius: 10px; */
                flex-basis: calc(100% / 9);
            }
            .middle{
                position: relative;
                flex-basis: calc(100% / 9);
            }
            .middle::after{
                content: "";
                position: absolute;
                left:50%;
                top:min(25px, calc(100vw / ($c / 25)));
                transform: translateX(-50%);
                width:min(55px, calc(100vw / ($c / 55)));
                height: min(55px, calc(100vw / ($c / 55)));
                border:2px solid;
                border-color:#00f500 black black #00f500;
                background-image: url("../assets/king.png");
                background-repeat: no-repeat;
                background-size: 90% 90%;
                background-position: center;
            }
            .middle.inverse::after{
                transform: translateX(-50%) scaleX(-1);
                border-color:#00f500 #00f500 black black;
            }
        }
        main{
            display: flex;
            flex-grow: 1;
            justify-content: space-around;
            align-items: stretch;
        }
    }
</style>