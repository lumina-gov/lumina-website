<script lang="ts">
import Calendar from "svelte-material-icons/Calendar.svelte"
import {onMount, onDestroy} from "svelte"

// if the date difference is less than 3 days, we want to show something like:
// "3 hours ago", "2 days ago", "10 minutes ago", etc.

export let date: Date
export let use_ago = false

function get_day_suffix(day: number) {
    switch (day % 10) {
        case 1: return "st"
        case 2: return "nd"
        case 3: return "rd"
        default: return "th"
    }
}

let now = new Date()

let interval: ReturnType<typeof setInterval> | null = null
onMount(() => {
    interval = setInterval(() => {
        now = new Date()
    }, 5000)
})

onDestroy(() => {
    if (interval) clearInterval(interval)
})

$: diff = now.getTime() - date.getTime()
$: diff_in_seconds = diff / 1000
$: diff_in_minutes = diff_in_seconds / 60
$: diff_in_hours = diff_in_minutes / 60
$: diff_in_days = diff_in_hours / 24
$: diff_in_months = diff_in_days / 30

$: use_ago = diff_in_months <= 2
$: units_ago = diff_in_hours <= 1 ? "minute" : diff_in_days <= 1 ? "hour" : diff_in_months <= 1 ? "day" : "month"
$: units = diff_in_hours <= 1 ? diff_in_minutes : diff_in_days <= 1 ? diff_in_hours : diff_in_months <= 1 ? diff_in_days : diff_in_months
$: ago = `${Math.ceil(units)} ${units_ago}${units > 1 ? "s" : ""} ago`

$: day_with_suffix = date.getDate() + get_day_suffix(date.getDate())
$: month = date.toLocaleString("en-us", { month: "short" })
$: year = date.getFullYear()

</script>
<div class="date">
    <Calendar size={18}/>
    <span>
        {#if use_ago}
            <span>{ ago } - </span>
            <!-- {:else} -->
        {/if}
        <span>{ day_with_suffix } { month } { year }</span>
    </span>
</div>
<style>

.date {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    opacity: 0.5;
    font-weight: 600;
}

</style>