<script lang="ts">
import { countries } from "$lib/data/countries"
import Dropdown from "./Dropdown.svelte"
import Country from "../display/Country.svelte"
import type { Country as CountryType} from "$lib/data/countries"
import ChevronDown from "svelte-material-icons/ChevronDown.svelte"
import Options from "./Options.svelte"
import Search from "./Search.svelte"
import ClickoutRegion from "./ClickoutRegion.svelte"
import Inside from "./Inside.svelte"

import InputWrapper from "$lib/display/InputWrapper.svelte"
import { tick } from "svelte"
import { escape_regex } from "$lib/utils/regex"

export let name = "Phone Number"
export let value: {
    country: CountryType | null,
    number: string 
}
export let autocomplete = "tel"
export let placeholder = "Phone Number"
let input_ref: HTMLInputElement
let open = false
let search = ""



$: regex = new RegExp(escape_regex(search), "i")
$: filtered = countries.filter(country => regex.test(country.name) || regex.test(country.code) || regex.test(country.calling_code))

let options: Options<CountryType>
let search_component: Search
</script>
<InputWrapper {name}>
    <ClickoutRegion clicked_outside={() => open = false}>
        <div class="input-wrapper">
            <Inside>
                <div
                    class="country-selector"
                    role="button"
                    tabindex="0"
                    on:keypress={ event => {
                        if (event.key === "Enter") {
                            open = !open
                            tick().then(() => search_component.focus())
                        }
                    } }
                    on:click={ () => open = !open }>
                    <div class="country-data">
                        <div class="country-data-flag">
                            <div
                                class="iti-flag {value.country?.code.toLowerCase() || ""}"
                                class:flag={ value.country }></div>
                        </div>
                        <div
                            class="country-data-label"
                            class:placeholder={ !value.country }>{ value.country?.calling_code || "+0" }</div>
                    </div>
                    <ChevronDown size={20}/>
                </div>
            </Inside>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="input-pseudo-wrapper"
                on:keypress={ event => {
                    if (event.key === "Enter") {
                        input_ref.focus()
                    }
                } }
                on:click={ () => input_ref.focus() }>
                <input
                    bind:this={ input_ref }
                    name={autocomplete}
                    {autocomplete}
                    {placeholder}
                    on:keyup
                    on:keydown
                    on:keyup
                    bind:value={ value.number }/>
            </div>
        </div>
        <Inside>
            {#if open}
                <Dropdown>
                    <Search
                        bind:this={ search_component }
                        bind:search={ search }
                        on:keyup={ e => { if (e.key === "ArrowDown") options.focus() } }/>
                    <Options
                        bind:this={ options }
                        options={filtered}
                        on:keyup={ e => { if (e.detail.key === "ArrowUp") search_component.focus() } }
                        on:select={ e => {
                            value.country = e.detail
                            open = false
                        } }
                        let:option>
                        <Country
                            country={option}
                            selected={value.country}/>
                    </Options>
                </Dropdown>
            {/if}
        </Inside>
    </ClickoutRegion>
</InputWrapper>
<style>
.input-wrapper {
    display: flex;
    align-items: center;

    & .input-pseudo-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        background-color: rgba(var(--foreground-rgb), 0.1);
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    & input {
        appearance: none;
        border: none;
        outline: none;
        background: none;
        color: inherit;
        line-height: 1;
        flex: 1;
        width: 100%;
        font-size: 16px;
        padding: 12px 16px;
        padding-left: 6px;
        margin: 0;

        &::placeholder {
            color: var(--foreground-rgb);
            opacity: 0.3;
        }
    }

    & .country-selector {
        border-top-left-radius: 4px;
        margin-right: 1px;
        border-bottom-left-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: 6px;
        height: 44px;
        background-color: rgba(var(--foreground-rgb), 0.1);

        &:focus,
        &:hover {
            outline: none;
            cursor: pointer;
            background-color: rgba(var(--foreground-rgb), 0.15);
        }

        & .country-data {
            display: flex;
            align-items: center;

            & .country-data-label {
                font-size: 16px;
                padding-left: 5px;
                padding-right: 5px;
                flex: 1;

                &.placeholder {
                    opacity: 0.5;
                }
            }
        }

        /* & .country-title {
            font-size: 13px;
            text-transform: uppercase;
            font-weight: 500;
            color: color-mix(in srgb, var(--background) rgba(var(--foreground-rgb), 0.8));
        } */
    }
}
:global {
    .iti-flag.flag {
        background-image: url("/flags.png");
        image-rendering: pixelated;
    }

    .country-data-flag {
        outline: 1px solid transparent;
        transform: scale(0.7);
    }


    .iti-flag {
        /* background-size: 5630px 15px; */
        background-size: 11304px 30px;
    }

    .iti-flag {
        width: 40px;
    }

    .iti-flag.be {
        width: 36px;
    }

    .iti-flag.ch {
        width: 30px;
    }

    .iti-flag.mc {
        width: 38px;
    }

    .iti-flag.ne {
        width: 36px;
    }

    .iti-flag.np {
        width: 26px;
    }

    .iti-flag.va {
        width: 30px;
    }

    .iti-flag.ac {
        height: 20px;
        background-position: 0px 0px;
    }

    .iti-flag.ad {
        height: 28px;
        background-position: -44px 0px;
    }

    .iti-flag.ae {
        height: 20px;
        background-position: -88px 0px;
    }

    .iti-flag.af {
        height: 28px;
        background-position: -132px 0px;
    }

    .iti-flag.ag {
        height: 28px;
        background-position: -176px 0px;
    }

    .iti-flag.ai {
        height: 20px;
        background-position: -220px 0px;
    }

    .iti-flag.al {
        height: 30px;
        background-position: -264px 0px;
    }

    .iti-flag.am {
        height: 20px;
        background-position: -308px 0px;
    }

    .iti-flag.ao {
        height: 28px;
        background-position: -352px 0px;
    }

    .iti-flag.aq {
        height: 28px;
        background-position: -396px 0px;
    }

    .iti-flag.ar {
        height: 26px;
        background-position: -440px 0px;
    }

    .iti-flag.as {
        height: 20px;
        background-position: -484px 0px;
    }

    .iti-flag.at {
        height: 28px;
        background-position: -528px 0px;
    }

    .iti-flag.au {
        height: 20px;
        background-position: -572px 0px;
    }

    .iti-flag.aw {
        height: 28px;
        background-position: -616px 0px;
    }

    .iti-flag.ax {
        height: 26px;
        background-position: -660px 0px;
    }

    .iti-flag.az {
        height: 20px;
        background-position: -704px 0px;
    }

    .iti-flag.ba {
        height: 20px;
        background-position: -748px 0px;
    }

    .iti-flag.bb {
        height: 28px;
        background-position: -792px 0px;
    }

    .iti-flag.bd {
        height: 24px;
        background-position: -836px 0px;
    }

    .iti-flag.be {
        height: 30px;
        background-position: -880px 0px;
    }

    .iti-flag.bf {
        height: 28px;
        background-position: -920px 0px;
    }

    .iti-flag.bg {
        height: 24px;
        background-position: -964px 0px;
    }

    .iti-flag.bh {
        height: 24px;
        background-position: -1008px 0px;
    }

    .iti-flag.bi {
        height: 24px;
        background-position: -1052px 0px;
    }

    .iti-flag.bj {
        height: 28px;
        background-position: -1096px 0px;
    }

    .iti-flag.bl {
        height: 28px;
        background-position: -1140px 0px;
    }

    .iti-flag.bm {
        height: 20px;
        background-position: -1184px 0px;
    }

    .iti-flag.bn {
        height: 20px;
        background-position: -1228px 0px;
    }

    .iti-flag.bo {
        height: 28px;
        background-position: -1272px 0px;
    }

    .iti-flag.bq {
        height: 28px;
        background-position: -1316px 0px;
    }

    .iti-flag.br {
        height: 28px;
        background-position: -1360px 0px;
    }

    .iti-flag.bs {
        height: 20px;
        background-position: -1404px 0px;
    }

    .iti-flag.bt {
        height: 28px;
        background-position: -1448px 0px;
    }

    .iti-flag.bv {
        height: 30px;
        background-position: -1492px 0px;
    }

    .iti-flag.bw {
        height: 28px;
        background-position: -1536px 0px;
    }

    .iti-flag.by {
        height: 20px;
        background-position: -1580px 0px;
    }

    .iti-flag.bz {
        height: 28px;
        background-position: -1624px 0px;
    }

    .iti-flag.ca {
        height: 20px;
        background-position: -1668px 0px;
    }

    .iti-flag.cc {
        height: 20px;
        background-position: -1712px 0px;
    }

    .iti-flag.cd {
        height: 30px;
        background-position: -1756px 0px;
    }

    .iti-flag.cf {
        height: 28px;
        background-position: -1800px 0px;
    }

    .iti-flag.cg {
        height: 28px;
        background-position: -1844px 0px;
    }

    .iti-flag.ch {
        height: 30px;
        background-position: -1888px 0px;
    }

    .iti-flag.ci {
        height: 28px;
        background-position: -1922px 0px;
    }

    .iti-flag.ck {
        height: 20px;
        background-position: -1966px 0px;
    }

    .iti-flag.cl {
        height: 28px;
        background-position: -2010px 0px;
    }

    .iti-flag.cm {
        height: 28px;
        background-position: -2054px 0px;
    }

    .iti-flag.cn {
        height: 28px;
        background-position: -2098px 0px;
    }

    .iti-flag.co {
        height: 28px;
        background-position: -2142px 0px;
    }

    .iti-flag.cp {
        height: 28px;
        background-position: -2186px 0px;
    }

    .iti-flag.cr {
        height: 24px;
        background-position: -2230px 0px;
    }

    .iti-flag.cu {
        height: 20px;
        background-position: -2274px 0px;
    }

    .iti-flag.cv {
        height: 24px;
        background-position: -2318px 0px;
    }

    .iti-flag.cw {
        height: 28px;
        background-position: -2362px 0px;
    }

    .iti-flag.cx {
        height: 20px;
        background-position: -2406px 0px;
    }

    .iti-flag.cy {
        height: 28px;
        background-position: -2450px 0px;
    }

    .iti-flag.cz {
        height: 28px;
        background-position: -2494px 0px;
    }

    .iti-flag.de {
        height: 24px;
        background-position: -2538px 0px;
    }

    .iti-flag.dg {
        height: 20px;
        background-position: -2582px 0px;
    }

    .iti-flag.dj {
        height: 28px;
        background-position: -2626px 0px;
    }

    .iti-flag.dk {
        height: 30px;
        background-position: -2670px 0px;
    }

    .iti-flag.dm {
        height: 20px;
        background-position: -2714px 0px;
    }

    .iti-flag.do {
        height: 26px;
        background-position: -2758px 0px;
    }

    .iti-flag.dz {
        height: 28px;
        background-position: -2802px 0px;
    }

    .iti-flag.ea {
        height: 28px;
        background-position: -2846px 0px;
    }

    .iti-flag.ec {
        height: 28px;
        background-position: -2890px 0px;
    }

    .iti-flag.ee {
        height: 26px;
        background-position: -2934px 0px;
    }

    .iti-flag.eg {
        height: 28px;
        background-position: -2978px 0px;
    }

    .iti-flag.eh {
        height: 20px;
        background-position: -3022px 0px;
    }

    .iti-flag.er {
        height: 20px;
        background-position: -3066px 0px;
    }

    .iti-flag.es {
        height: 28px;
        background-position: -3110px 0px;
    }

    .iti-flag.et {
        height: 20px;
        background-position: -3154px 0px;
    }

    .iti-flag.eu {
        height: 28px;
        background-position: -3198px 0px;
    }

    .iti-flag.fi {
        height: 24px;
        background-position: -3242px 0px;
    }

    .iti-flag.fj {
        height: 20px;
        background-position: -3286px 0px;
    }

    .iti-flag.fk {
        height: 20px;
        background-position: -3330px 0px;
    }

    .iti-flag.fm {
        height: 22px;
        background-position: -3374px 0px;
    }

    .iti-flag.fo {
        height: 30px;
        background-position: -3418px 0px;
    }

    .iti-flag.fr {
        height: 28px;
        background-position: -3462px 0px;
    }

    .iti-flag.ga {
        height: 30px;
        background-position: -3506px 0px;
    }

    .iti-flag.gb {
        height: 20px;
        background-position: -3550px 0px;
    }

    .iti-flag.gd {
        height: 24px;
        background-position: -3594px 0px;
    }

    .iti-flag.ge {
        height: 28px;
        background-position: -3638px 0px;
    }

    .iti-flag.gf {
        height: 28px;
        background-position: -3682px 0px;
    }

    .iti-flag.gg {
        height: 28px;
        background-position: -3726px 0px;
    }

    .iti-flag.gh {
        height: 28px;
        background-position: -3770px 0px;
    }

    .iti-flag.gi {
        height: 20px;
        background-position: -3814px 0px;
    }

    .iti-flag.gl {
        height: 28px;
        background-position: -3858px 0px;
    }

    .iti-flag.gm {
        height: 28px;
        background-position: -3902px 0px;
    }

    .iti-flag.gn {
        height: 28px;
        background-position: -3946px 0px;
    }

    .iti-flag.gp {
        height: 28px;
        background-position: -3990px 0px;
    }

    .iti-flag.gq {
        height: 28px;
        background-position: -4034px 0px;
    }

    .iti-flag.gr {
        height: 28px;
        background-position: -4078px 0px;
    }

    .iti-flag.gs {
        height: 20px;
        background-position: -4122px 0px;
    }

    .iti-flag.gt {
        height: 26px;
        background-position: -4166px 0px;
    }

    .iti-flag.gu {
        height: 22px;
        background-position: -4210px 0px;
    }

    .iti-flag.gw {
        height: 20px;
        background-position: -4254px 0px;
    }

    .iti-flag.gy {
        height: 24px;
        background-position: -4298px 0px;
    }

    .iti-flag.hk {
        height: 28px;
        background-position: -4342px 0px;
    }

    .iti-flag.hm {
        height: 20px;
        background-position: -4386px 0px;
    }

    .iti-flag.hn {
        height: 20px;
        background-position: -4430px 0px;
    }

    .iti-flag.hr {
        height: 20px;
        background-position: -4474px 0px;
    }

    .iti-flag.ht {
        height: 24px;
        background-position: -4518px 0px;
    }

    .iti-flag.hu {
        height: 20px;
        background-position: -4562px 0px;
    }

    .iti-flag.ic {
        height: 28px;
        background-position: -4606px 0px;
    }

    .iti-flag.id {
        height: 28px;
        background-position: -4650px 0px;
    }

    .iti-flag.ie {
        height: 20px;
        background-position: -4694px 0px;
    }

    .iti-flag.il {
        height: 30px;
        background-position: -4738px 0px;
    }

    .iti-flag.im {
        height: 20px;
        background-position: -4782px 0px;
    }

    .iti-flag.in {
        height: 28px;
        background-position: -4826px 0px;
    }

    .iti-flag.io {
        height: 20px;
        background-position: -4870px 0px;
    }

    .iti-flag.iq {
        height: 28px;
        background-position: -4914px 0px;
    }

    .iti-flag.ir {
        height: 24px;
        background-position: -4958px 0px;
    }

    .iti-flag.is {
        height: 30px;
        background-position: -5002px 0px;
    }

    .iti-flag.it {
        height: 28px;
        background-position: -5046px 0px;
    }

    .iti-flag.je {
        height: 24px;
        background-position: -5090px 0px;
    }

    .iti-flag.jm {
        height: 20px;
        background-position: -5134px 0px;
    }

    .iti-flag.jo {
        height: 20px;
        background-position: -5178px 0px;
    }

    .iti-flag.jp {
        height: 28px;
        background-position: -5222px 0px;
    }

    .iti-flag.ke {
        height: 28px;
        background-position: -5266px 0px;
    }

    .iti-flag.kg {
        height: 24px;
        background-position: -5310px 0px;
    }

    .iti-flag.kh {
        height: 26px;
        background-position: -5354px 0px;
    }

    .iti-flag.ki {
        height: 20px;
        background-position: -5398px 0px;
    }

    .iti-flag.km {
        height: 24px;
        background-position: -5442px 0px;
    }

    .iti-flag.kn {
        height: 28px;
        background-position: -5486px 0px;
    }

    .iti-flag.kp {
        height: 20px;
        background-position: -5530px 0px;
    }

    .iti-flag.kr {
        height: 28px;
        background-position: -5574px 0px;
    }

    .iti-flag.kw {
        height: 20px;
        background-position: -5618px 0px;
    }

    .iti-flag.ky {
        height: 20px;
        background-position: -5662px 0px;
    }

    .iti-flag.kz {
        height: 20px;
        background-position: -5706px 0px;
    }

    .iti-flag.la {
        height: 28px;
        background-position: -5750px 0px;
    }

    .iti-flag.lb {
        height: 28px;
        background-position: -5794px 0px;
    }

    .iti-flag.lc {
        height: 20px;
        background-position: -5838px 0px;
    }

    .iti-flag.li {
        height: 24px;
        background-position: -5882px 0px;
    }

    .iti-flag.lk {
        height: 20px;
        background-position: -5926px 0px;
    }

    .iti-flag.lr {
        height: 22px;
        background-position: -5970px 0px;
    }

    .iti-flag.ls {
        height: 28px;
        background-position: -6014px 0px;
    }

    .iti-flag.lt {
        height: 24px;
        background-position: -6058px 0px;
    }

    .iti-flag.lu {
        height: 24px;
        background-position: -6102px 0px;
    }

    .iti-flag.lv {
        height: 20px;
        background-position: -6146px 0px;
    }

    .iti-flag.ly {
        height: 20px;
        background-position: -6190px 0px;
    }

    .iti-flag.ma {
        height: 28px;
        background-position: -6234px 0px;
    }

    .iti-flag.mc {
        height: 30px;
        background-position: -6278px 0px;
    }

    .iti-flag.md {
        height: 20px;
        background-position: -6320px 0px;
    }

    .iti-flag.me {
        height: 20px;
        background-position: -6364px 0px;
    }

    .iti-flag.mf {
        height: 28px;
        background-position: -6408px 0px;
    }

    .iti-flag.mg {
        height: 28px;
        background-position: -6452px 0px;
    }

    .iti-flag.mh {
        height: 22px;
        background-position: -6496px 0px;
    }

    .iti-flag.mk {
        height: 20px;
        background-position: -6540px 0px;
    }

    .iti-flag.ml {
        height: 28px;
        background-position: -6584px 0px;
    }

    .iti-flag.mm {
        height: 28px;
        background-position: -6628px 0px;
    }

    .iti-flag.mn {
        height: 20px;
        background-position: -6672px 0px;
    }

    .iti-flag.mo {
        height: 28px;
        background-position: -6716px 0px;
    }

    .iti-flag.mp {
        height: 20px;
        background-position: -6760px 0px;
    }

    .iti-flag.mq {
        height: 28px;
        background-position: -6804px 0px;
    }

    .iti-flag.mr {
        height: 28px;
        background-position: -6848px 0px;
    }

    .iti-flag.ms {
        height: 20px;
        background-position: -6892px 0px;
    }

    .iti-flag.mt {
        height: 28px;
        background-position: -6936px 0px;
    }

    .iti-flag.mu {
        height: 28px;
        background-position: -6980px 0px;
    }

    .iti-flag.mv {
        height: 28px;
        background-position: -7024px 0px;
    }

    .iti-flag.mw {
        height: 28px;
        background-position: -7068px 0px;
    }

    .iti-flag.mx {
        height: 24px;
        background-position: -7112px 0px;
    }

    .iti-flag.my {
        height: 20px;
        background-position: -7156px 0px;
    }

    .iti-flag.mz {
        height: 28px;
        background-position: -7200px 0px;
    }

    .iti-flag.na {
        height: 28px;
        background-position: -7244px 0px;
    }

    .iti-flag.nc {
        height: 20px;
        background-position: -7288px 0px;
    }

    .iti-flag.ne {
        height: 30px;
        background-position: -7332px 0px;
    }

    .iti-flag.nf {
        height: 20px;
        background-position: -7372px 0px;
    }

    .iti-flag.ng {
        height: 20px;
        background-position: -7416px 0px;
    }

    .iti-flag.ni {
        height: 24px;
        background-position: -7460px 0px;
    }

    .iti-flag.nl {
        height: 28px;
        background-position: -7504px 0px;
    }

    .iti-flag.no {
        height: 30px;
        background-position: -7548px 0px;
    }

    .iti-flag.np {
        height: 30px;
        background-position: -7592px 0px;
    }

    .iti-flag.nr {
        height: 20px;
        background-position: -7622px 0px;
    }

    .iti-flag.nu {
        height: 20px;
        background-position: -7666px 0px;
    }

    .iti-flag.nz {
        height: 20px;
        background-position: -7710px 0px;
    }

    .iti-flag.om {
        height: 20px;
        background-position: -7754px 0px;
    }

    .iti-flag.pa {
        height: 28px;
        background-position: -7798px 0px;
    }

    .iti-flag.pe {
        height: 28px;
        background-position: -7842px 0px;
    }

    .iti-flag.pf {
        height: 28px;
        background-position: -7886px 0px;
    }

    .iti-flag.pg {
        height: 30px;
        background-position: -7930px 0px;
    }

    .iti-flag.ph {
        height: 20px;
        background-position: -7974px 0px;
    }

    .iti-flag.pk {
        height: 28px;
        background-position: -8018px 0px;
    }

    .iti-flag.pl {
        height: 26px;
        background-position: -8062px 0px;
    }

    .iti-flag.pm {
        height: 28px;
        background-position: -8106px 0px;
    }

    .iti-flag.pn {
        height: 20px;
        background-position: -8150px 0px;
    }

    .iti-flag.pr {
        height: 28px;
        background-position: -8194px 0px;
    }

    .iti-flag.ps {
        height: 20px;
        background-position: -8238px 0px;
    }

    .iti-flag.pt {
        height: 28px;
        background-position: -8282px 0px;
    }

    .iti-flag.pw {
        height: 26px;
        background-position: -8326px 0px;
    }

    .iti-flag.py {
        height: 22px;
        background-position: -8370px 0px;
    }

    .iti-flag.qa {
        height: 16px;
        background-position: -8414px 0px;
    }

    .iti-flag.re {
        height: 28px;
        background-position: -8458px 0px;
    }

    .iti-flag.ro {
        height: 28px;
        background-position: -8502px 0px;
    }

    .iti-flag.rs {
        height: 28px;
        background-position: -8546px 0px;
    }

    .iti-flag.ru {
        height: 28px;
        background-position: -8590px 0px;
    }

    .iti-flag.rw {
        height: 28px;
        background-position: -8634px 0px;
    }

    .iti-flag.sa {
        height: 28px;
        background-position: -8678px 0px;
    }

    .iti-flag.sb {
        height: 20px;
        background-position: -8722px 0px;
    }

    .iti-flag.sc {
        height: 20px;
        background-position: -8766px 0px;
    }

    .iti-flag.sd {
        height: 20px;
        background-position: -8810px 0px;
    }

    .iti-flag.se {
        height: 26px;
        background-position: -8854px 0px;
    }

    .iti-flag.sg {
        height: 28px;
        background-position: -8898px 0px;
    }

    .iti-flag.sh {
        height: 20px;
        background-position: -8942px 0px;
    }

    .iti-flag.si {
        height: 20px;
        background-position: -8986px 0px;
    }

    .iti-flag.sj {
        height: 30px;
        background-position: -9030px 0px;
    }

    .iti-flag.sk {
        height: 28px;
        background-position: -9074px 0px;
    }

    .iti-flag.sl {
        height: 28px;
        background-position: -9118px 0px;
    }

    .iti-flag.sm {
        height: 30px;
        background-position: -9162px 0px;
    }

    .iti-flag.sn {
        height: 28px;
        background-position: -9206px 0px;
    }

    .iti-flag.so {
        height: 28px;
        background-position: -9250px 0px;
    }

    .iti-flag.sr {
        height: 28px;
        background-position: -9294px 0px;
    }

    .iti-flag.ss {
        height: 20px;
        background-position: -9338px 0px;
    }

    .iti-flag.st {
        height: 20px;
        background-position: -9382px 0px;
    }

    .iti-flag.sv {
        height: 24px;
        background-position: -9426px 0px;
    }

    .iti-flag.sx {
        height: 28px;
        background-position: -9470px 0px;
    }

    .iti-flag.sy {
        height: 28px;
        background-position: -9514px 0px;
    }

    .iti-flag.sz {
        height: 28px;
        background-position: -9558px 0px;
    }

    .iti-flag.ta {
        height: 20px;
        background-position: -9602px 0px;
    }

    .iti-flag.tc {
        height: 20px;
        background-position: -9646px 0px;
    }

    .iti-flag.td {
        height: 28px;
        background-position: -9690px 0px;
    }

    .iti-flag.tf {
        height: 28px;
        background-position: -9734px 0px;
    }

    .iti-flag.tg {
        height: 26px;
        background-position: -9778px 0px;
    }

    .iti-flag.th {
        height: 28px;
        background-position: -9822px 0px;
    }

    .iti-flag.tj {
        height: 20px;
        background-position: -9866px 0px;
    }

    .iti-flag.tk {
        height: 20px;
        background-position: -9910px 0px;
    }

    .iti-flag.tl {
        height: 20px;
        background-position: -9954px 0px;
    }

    .iti-flag.tm {
        height: 28px;
        background-position: -9998px 0px;
    }

    .iti-flag.tn {
        height: 28px;
        background-position: -10042px 0px;
    }

    .iti-flag.to {
        height: 20px;
        background-position: -10086px 0px;
    }

    .iti-flag.tr {
        height: 28px;
        background-position: -10130px 0px;
    }

    .iti-flag.tt {
        height: 24px;
        background-position: -10174px 0px;
    }

    .iti-flag.tv {
        height: 20px;
        background-position: -10218px 0px;
    }

    .iti-flag.tw {
        height: 28px;
        background-position: -10262px 0px;
    }

    .iti-flag.tz {
        height: 28px;
        background-position: -10306px 0px;
    }

    .iti-flag.ua {
        height: 28px;
        background-position: -10350px 0px;
    }

    .iti-flag.ug {
        height: 28px;
        background-position: -10394px 0px;
    }

    .iti-flag.um {
        height: 22px;
        background-position: -10438px 0px;
    }

    .iti-flag.us {
        height: 22px;
        background-position: -10482px 0px;
    }

    .iti-flag.uy {
        height: 28px;
        background-position: -10526px 0px;
    }

    .iti-flag.uz {
        height: 20px;
        background-position: -10570px 0px;
    }

    .iti-flag.va {
        height: 30px;
        background-position: -10614px 0px;
    }

    .iti-flag.vc {
        height: 28px;
        background-position: -10648px 0px;
    }

    .iti-flag.ve {
        height: 28px;
        background-position: -10692px 0px;
    }

    .iti-flag.vg {
        height: 20px;
        background-position: -10736px 0px;
    }

    .iti-flag.vi {
        height: 28px;
        background-position: -10780px 0px;
    }

    .iti-flag.vn {
        height: 28px;
        background-position: -10824px 0px;
    }

    .iti-flag.vu {
        height: 24px;
        background-position: -10868px 0px;
    }

    .iti-flag.wf {
        height: 28px;
        background-position: -10912px 0px;
    }

    .iti-flag.ws {
        height: 20px;
        background-position: -10956px 0px;
    }

    .iti-flag.xk {
        height: 30px;
        background-position: -11000px 0px;
    }

    .iti-flag.ye {
        height: 28px;
        background-position: -11044px 0px;
    }

    .iti-flag.yt {
        height: 28px;
        background-position: -11088px 0px;
    }

    .iti-flag.za {
        height: 28px;
        background-position: -11132px 0px;
    }

    .iti-flag.zm {
        height: 28px;
        background-position: -11176px 0px;
    }

    .iti-flag.zw {
        height: 20px;
        background-position: -11220px 0px;
    }

    .iti-flag.po {
        height: 20px;
        background-position: -11264px 0px;
    }

    .iti-flag {
        width: 40px;
        height: 30px;
        background-repeat: no-repeat;
        background-color: rgba(var(--foreground-rgb), 0.1);
        background-position: 0px 0;
    }

    .iti-flag.np {
        background-color: transparent;
    }
}
</style>