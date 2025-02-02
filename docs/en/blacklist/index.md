---
title: Blacklist
descriptions: A list of blacklisted modules in MMRL
editLink: false
prev: false
next: false
---

<script setup>
import blacklist from '../../../meta/blacklist.yaml'

const openUrl = (url) => {
  window.open(url);
};
</script>

# Blacklist

A list of blacklisted modules

<div v-for="module in blacklist">

## {{ module.id }}

<a :href="module.source" target="_blank" :class="[$style.VPButton, $style.VPButton_medium, $style.VPButton_alt]">{{ module.source }}</a>

<template v-if="module.notes && module.note !== ''">

> [!NOTE]
> {{ module.notes }}

</template>


<template v-if="module.antifeatures && module.antifeatures.length !== 0">
    <ul v-for="af in module.antifeatures">
        <li>
            <a href="/guide/antifeatures">
                {{ af }}
            </a>
        </li>
    </ul>
</template>

</div>



<style module>
.VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    color: unset !important;
    text-decoration: unset !important;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.VPButton_medium {
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
}

.VPButton_alt {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
}

.VPButton_brand {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
}
</style>
