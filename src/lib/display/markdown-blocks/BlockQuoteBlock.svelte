<script lang="ts">
import type { Blockquote } from "mdast"
import BlocksArray from "./BlocksArray.svelte"

export let block: Blockquote

</script>
<blockquote>
    <BlocksArray blocks={block.children}/>
</blockquote>
<style>
blockquote {
    margin: 0;
    border-left: 4px solid rgba(var(--foreground-rgb), 0.15);
    background: rgba(var(--foreground-rgb), 0.05);
    padding: 12px;
}
</style>