<script lang="ts">
import { tweened } from "svelte/motion"
import { cubicOut } from "svelte/easing"
import {afterNavigate, beforeNavigate} from "$app/navigation"
import { fade } from "svelte/transition"

export let loading = false

const progress = tweened(0, {
    easing: cubicOut
})

beforeNavigate(async () => {
    loading = true
    await progress.set(0, { duration: 0 })
    await progress.set(0.9, { duration: 4000 })
})

afterNavigate(async () => {
    loading = false
    await progress.set(1, { duration: 500 })
})

</script>

{#if $progress !== 1}
    <div
        class="progress-bar"
        out:fade|local={ { delay: 500 } }>
        <div
            style:--width="{ $progress * 100 }%"
            class="progress-sliver"></div>
    </div>
{/if}

<style>
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    z-index: 1000;
}

.progress-bar .progress-sliver {
    width: var(--width);
    background-color: var(--brand);
    height: 100%;
}
</style>