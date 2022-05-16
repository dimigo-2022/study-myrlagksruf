<script lang="ts">
    let time = new Date();
    let hour:number, minu:number, seco:number, ms:number;
    // assignment 할당
    let arr:number[] = [10,20,30];
    $:{
        hour = time.getHours();
        minu = time.getMinutes();
        seco = time.getSeconds();
        ms = time.getMilliseconds();
    }
    let count = 0;
    let view = true;
    const increment = (e:MouseEvent) => {
        if(e.button === 0){
            // 왼쪽 클릭
            arr = arr.slice(1);
        } else if (e.button === 2){
            // 오른쪽 클릭
            arr = [Math.floor(Math.random() * 100), ...arr];
        }
    }

    const ani = () => {
        time = new Date();
        requestAnimationFrame(ani);
    }

    ani();
</script>
<main>
    <button on:click={() => view = !view}>토글</button>
    {#if view}
        <button on:click={increment} on:contextmenu|preventDefault={increment}>누를 때마다</button>
        {#each arr as val, index}
        <div class={`c c${index % 3}`} style={`transform: translate(-50%, -50%) rotate(${index * 10 + Math.floor(Number(time) / 10) % 360}deg)`}>값 : {val}, 인덱스 : {index}</div>
        {/each}
    {:else}
        <div>Hello World {hour}시 {minu}분 {seco}.{ms.toString().padStart(3, '0')}초</div>
    {/if}
    
</main>

<style>
    main{
        position: relative;
    }
    div.c{
        color:white;
        position: absolute;
        top:100px;
        left:50%;
        width: max-content;
    }
    div.c1{
        background-color: red;
    }
    div.c2{
        background-color: green;
    }
    div.c0{
        background-color: blue;
    }
</style>