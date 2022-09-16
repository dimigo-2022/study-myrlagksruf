<script lang="ts">
    import type { PageData } from './$types'
    export let data:PageData;
</script>
<div>{data.god}</div>
<div>{@html data.txt}</div>
<a href="/">Home</a>