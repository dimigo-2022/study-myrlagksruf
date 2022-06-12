<script lang="ts">
    let promise:Promise<string> = new Promise(res => {});
    let value:string;
    const main = async (val:string) => {
        const res = await fetch(`/search?q=${encodeURIComponent(val)}`);
        const text = await res.text();
        const parser = new DOMParser();
        const dom = parser.parseFromString(text, 'text/html');
        document.querySelectorAll('style').forEach(v => v.remove());
        dom.querySelectorAll('style').forEach(v => document.head.append(v));
        const style = document.createElement('style');
        style.innerHTML = '#app, #app table, #app div, #app span, #app p{display:block}';
        document.head.append(style);
        return dom.querySelector('.g').innerHTML;
    };

    const keydown = async (e:KeyboardEvent) => {
        if(e.code !== 'Enter') return;
        promise = main(value)
    };
</script>
<input type="text" bind:value={value} on:keydown={keydown}>
{#await promise}
    <div>Loading.App..</div>
{:then value}
    <div>{@html value}</div>
{:catch err}
    <div>{err}</div>
{/await}