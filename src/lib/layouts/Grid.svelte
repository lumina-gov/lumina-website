<script lang="ts">

export let padding_vertical: number | undefined = undefined
export let vertical_gap: number | undefined = undefined
export let horizontal_gap: number | undefined = undefined
export let flex: string | undefined = undefined
export let side_padding = true
export let columns: {
    "mobile": number,
    "tablet": number,
    "laptop": number,
} = {
    "mobile": 4,
    "tablet": 8,
    "laptop": 16,
}

</script>
<div class="container">
    <div
        style:--mobile-columns={ columns.mobile }
        style:--tablet-columns={ columns.tablet }
        style:--laptop-columns={ columns.laptop }
        style:padding-top={ padding_vertical ? `${padding_vertical}px` : undefined }
        style:padding-bottom={ padding_vertical ? `${padding_vertical}px` : undefined }
        style:grid-row-gap={ vertical_gap ? `${vertical_gap}px` : undefined }
        style:grid-column-gap={ horizontal_gap ? `${horizontal_gap}px` : undefined }
        style:flex={ flex }
        class="grid"
        class:side_padding={ side_padding }>
        <slot/>
    </div>
</div>

<style>

.container {
    container-type: inline-size;
    width: 100%;
}

.grid {
    display: grid;
    max-width: 1200px;
    margin: 0 auto;
    gap: 16px;
    width: 100%;
    grid-template-columns: repeat(var(--laptop-columns), 1fr);
    &.side_padding {
        padding: 0 24px;
    }
    @container (max-width: 900px) {
        grid-template-columns: repeat(var(--tablet-columns), 1fr);
    }
    @container (max-width: 600px) {
        grid-template-columns: repeat(var(--mobile-columns), 1fr);
    }
}
</style>