<script lang="ts">
    export let num = 10;
    let group:number[] = [];
    let arr:undefined[];
    let radio:number;
    $:{
        arr = Array(num);
        group = group.filter(v => v <= num - 1);
    }
</script>
<main>
    <input list="input-list" type="number" bind:value={radio} autocomplete="off">
    <datalist id="input-list">
        {#each group as val}
            <option value={val}>
        {/each}
    </datalist>
    <div id="button-container">
        <button on:click={() => num = Math.max(num - 1, 0)}>▼</button>
        <span>{num}</span>
        <button on:click={() => num++}>▲</button>
    </div>
    <div id="big-container">
        <div>
            {#each group as val}
                <div class="input-container">
                    <input on:input={() => setTimeout(() => console.log(radio))} id="rad-{val}" type="radio" checked={radio === val ? true : false} bind:group={radio} value={val} />
                    <label for="rad-{val}">{val} 선택하기</label>
                </div>
            {/each}
        </div>
        <div>
            {#each arr as _, val}
                <div class="input-container {radio === val && group.includes(val) ? 'active' : ''}">
                    <input type="checkbox" id="val-{val}" bind:group={group} value={val} />
                    <label for="val-{val}">{val} 선택하기</label>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
    }
    .active{
        background-color: red;
    }
    span{
        color:red;
        font-weight: 900;
        font-size: 2em;
    }

    #button-container{
        display: flex;
        flex-basis: 100%;
        align-items: center;
        justify-content: space-between;
    }

    #big-container{
        display: flex;
        flex-direction: row;
    }

    #big-container > div{
        flex-basis: 50%;
        white-space: nowrap;
    }

    .input-container{
        transition: all 0.5s;
    }
</style>