<script lang="ts">
import LogoEdge from "$lib/icons/LogoEdge.svelte"
export let size = "48px"

</script>
<div
    style:--size={ size }
    class="icon">
    <LogoEdge/>
</div>
<style>
.icon {
    font-size: var(--size);
    display: inline-flex;
    color: var(--brand);
    animation: spin 1s infinite ease-in-out;
}

@keyframes spin {
    from {
        transform: rotate(180deg);
    }
    50% {
        transform: rotate(90deg);
    }
    to {
        transform: rotate(0deg);
    }
}
</style>