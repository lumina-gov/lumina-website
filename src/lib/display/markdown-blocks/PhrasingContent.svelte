<script lang="ts">
import type { PhrasingContent } from "mdast"
import PhrasingContentArray from "./PhrasingContentArray.svelte"
import Unsupported from "./Unsupported.svelte"

export let block: PhrasingContent

</script>
{#if block.type === "text"}
    { block.value }
{:else if block.type === "emphasis"}
    <em>
        <PhrasingContentArray children={block.children}/>
    </em>
{:else if block.type === "strong"}
    <strong>
        <PhrasingContentArray children={block.children}/>
    </strong>
{:else if block.type === "break"}
    <br/>
{:else if block.type === "delete"}
    <del>
        <PhrasingContentArray children={block.children}/>
    </del>
{:else if block.type === "inlineCode"}
    <code class="inline">
        { block.value }
    </code>
{:else if block.type === "link"}
    <a href={block.url}>
        <PhrasingContentArray children={block.children}/>
    </a>
{:else if block.type === "image"}
    <img
        alt={block.alt}
        src={block.url}/>
{:else}
    <Unsupported/>
{/if}
<style>

code {
    font-family: "Source Code Pro", monospace;
    &.inline {
        display: inline;
        background: rgba(var(--foreground-rgb), 0.1);
        padding: 1px 6px;
        margin: 0 4px;
        border-radius: 4px;
    }
}

strong {
    background: rgba(var(--foreground-rgb), 0.1);
    border-radius: 4px;
    padding: 1px 4px;
    color: var(--foreground);
}

img {
    width: 100%;
}
</style>