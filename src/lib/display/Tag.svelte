<script lang="ts">

let {
    opacity = false,
    text,
}: {
    opacity?: boolean
    text: string
} = $props()
</script>

<span
    class="tag"
    class:opacity={ opacity }>
    <div class="text">
        { text }
    </div>
</span>
<style>
.tag {
    padding: 0 2px;
    line-height: 1;
    font-weight: 600;
    display: inline-flex;
    border-radius: 4px;
    color: var(--color, var(--brand));
    background: color-mix(in srgb, var(--color, var(--brand)) 16%, transparent);

    & .text {
        padding: 3px 4px;
        line-height: 100%;
    }

    &.opacity {
        opacity: 0.5;
    }
}

</style>

