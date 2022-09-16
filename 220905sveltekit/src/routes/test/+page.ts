import type { LoadEvent } from '@sveltejs/kit'
export async function load(context:LoadEvent){
    console.log(context);
    const res = await context.fetch('/api');
    const txt = await res.text();
    return {
        god:true, txt
    }
}