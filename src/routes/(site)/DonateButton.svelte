<script lang="ts">
import Icon from "$lib/display/Icon.svelte"
import HandCoin from "svelte-material-icons/HandCoin.svelte"

</script>
<a href="https://opencollective.com/lumina">
    <Icon icon={HandCoin}/>
    <span>Donate</span>
</a>
<style>
a {
    /* border: 2px solid color-mix(in srgb, var(--brand) 30%, transparent); */
    background: rgba(var(--brand-rgb), 0.1);
    border-radius: 4px;
    padding: 11px;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    font-weight: 500;
    justify-content: center;
    &:hover {
        background: var(--brand);
        color: white;
    }
}

</style>