<PageHead
    description="Access Lumina services with your Lumina account"
    title="Auth Portal"
/>
<script lang="ts">
import AuthorisationInfo from "./AuthorisationInfo.svelte"
import Tag from "$lib/display/Tag.svelte"
import Logo from "$lib/icons/Logo.svelte"
import Authorize from "./Authorize.svelte"
import CreateAccount from "./CreateAccount.svelte"
import Login from "./Login.svelte"
import Select from "./Select.svelte"
import Button from "$lib/controls/Button.svelte"
import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte"
import { page } from "$app/stores"
import {goto, invalidateAll} from "$app/navigation"
import PageHead from "$lib/components/PageHead.svelte"
import { onMount } from "svelte"
import ForgotPassword from "./ForgotPassword.svelte"

let {
    data,
} = $props()

let auth_page = $state("select")
let user = $derived(data.user)

async function next() {
    if (data.app_info){
        auth_page = "authorize"
    } else {
        await invalidateAll()
        // we are authenticated
        let redirect = $page.url.searchParams.get("redirect")
        await goto(redirect ?? "/")
    }
}

onMount(() => {
    let referral = $page.url.searchParams.get("referral")
    $page.url.searchParams.delete("referral")
    if(referral) {
        localStorage.setItem("referral", referral)
        goto($page.url)
    }
})

</script>
<svelte:head>
    <link
        href="https://lumina.app/auth"
        rel="canonical" />
</svelte:head>
<div class="flex">
    <div class="inner">
        <Tag text="Auth Portal"/>
        <Logo/>
        <br/>
        {#if auth_page == "select"}
            <Select
                next={next}
                user={user}
                bind:auth_page={ auth_page }/>
        {:else if auth_page == "authorize" && $page.data.user_store.user}
            <Authorize
                user={$page.data.user_store.user}
                bind:auth_page={ auth_page }/>
        {:else}
            {#if auth_page == "login"}
                <Login
                    next={next}
                    bind:auth_page={ auth_page }/>
            {:else if auth_page == "forgot-password"}
                <ForgotPassword/>
            {:else if auth_page == "create"}
                <CreateAccount next={next}/>
            {/if}
            <Button
                style="transparent"
                label="Back"
                left_icon={ArrowLeft}
                onclick={() => auth_page = "select"}/>
        {/if}
    </div>
    {#if data.app_info}
        <div class="card">
            <AuthorisationInfo
                app={data.app_info.app}
                app_slug={data.app_info.slug}
                redirect={data.app_info.redirect}
                user_selected={auth_page == "authorize"}
            />
        </div>
    {/if}
</div>
<style>
.card {
    width: 100%;
    max-width: 600px;
    padding: 24px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(var(--foreground-rgb), 0.04);
}

.flex {
    display: flex;
    height: 100%;
    padding: 36px;
    align-items: center;
    gap: 36px;
    flex-direction: column;
}

.inner {
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}
</style>