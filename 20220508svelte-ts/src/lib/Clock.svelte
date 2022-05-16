<script lang="ts">
    let time = new Date();
    let ms:number;
    let second:number;
    let minute:number;
    let hour:number;
    export let size:string;
    const arr = new Array(12).fill(0);
    $:{
        ms = time.getMilliseconds();
        second = time.getSeconds();
        minute = time.getMinutes();
        hour = time.getHours();
    }

    const main = () => {
        time = new Date();
        requestAnimationFrame(main);
    }

    main();
</script>

<main style="--size:{size}">
    <div class="second" style={`transform:translateX(-50%) rotate(${(second * 6 + ms * 6 / 1000).toFixed(2)}deg)`}></div>
    <div class="minute" style={`transform:translateX(-50%) rotate(${(minute * 6 + second / 10 + ms / 10000).toFixed(2)}deg)`}></div>
    <div class="hour" style={`transform:translateX(-50%) rotate(${(hour * 30 + minute / 2 + second / 120 + ms / 120000).toFixed(2)}deg)`}></div>
    <div class="circle"></div>
    {#each [1,2,3,4,5,6,7,8,9,10,11,12] as val, index}
        <div class="ll ll-{val}" style={`transform: translateX(-50%) rotate(calc(${val} * 30deg))`}></div>
        {#each [1,2,3,4] as val2}
            <div class="lll lll-{val}-{val2}" style={`transform: translateX(-50%) rotate(calc(${val} * 30deg + ${val2} * 6deg))`}></div>            
        {/each}
    {/each}
</main>

<style lang="scss">
    main{
        position:relative;
        width: var(--size);
        height: var(--size);
        background-color: white;
        border-radius: 50%;
        border:1px solid black;
    }
    .hour, .minute, .second, .circle{
        position: absolute;
        left:50%;
        bottom: 50%;
        transform-origin: bottom center;
        transform: translateX(-50%);
    }
    .circle{
        width: calc(var(--size) / 10);
        height: calc(var(--size) / 10);
        background-color: black;
        border-radius: 50%;
        transform: translate(-50%, 50%);
    }
    .hour{
        background-color: black;
        width:calc(var(--size) / 30);
        height: calc(var(--size) / 4);
    }
    .minute{
        background-color: blue;
        width:calc(var(--size) / 50);
        height: calc(var(--size) / 3);
    }

    .second{
        background-color: red;
        width:calc(var(--size) / 100);
        height: calc(var(--size) / 2.5);
    }
    .lll, .ll{
        position: absolute;
        left:50%;
        top:0;
        transform-origin: center calc(var(--size) / 2);
    }
    .lll{
        width:1px;
        height: calc(var(--size) / 15);
        background-color: gray;
    }
    .ll{
        width:2px;
        height: calc(var(--size) / 10);
        background-color: black;
    }

    // @for $i from 1 through 12{
    //     .ll-#{$i}{
    //         transform: translateX(-50%) rotate($i * 30deg);
    //     }
    //     @for $j from 1 through 4{
    //         .lll-#{$i}-#{$j}{
    //             transform: translateX(-50%) rotate($i * 30deg + $j * 6deg);
    //         }
    //     }
    // }
</style>