<script lang="ts">
import type { ContainerDirective } from "mdast-util-directive"
import BlocksArray from "./BlocksArray.svelte"

export let block: ContainerDirective

</script>
<details>
    <summary>Spoiler</summary>
    <div class="content">
        <BlocksArray blocks={block.children}/>
    </div>
</details>
<style>

details {
    border: 1px solid rgba(var(--foreground-rgb), 0.1);
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

details summary {
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    outline: none;
}

details summary:hover,
details summary:focus {
    background-color: rgba(var(--foreground-rgb), 0.1);
}

details .content {
    padding: 16px;
}
</style>