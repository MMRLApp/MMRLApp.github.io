---
editLink: false
prev: false
next: false
---

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { params } = useData()

const module = ref(params.value.module)

const openUrl = (url) => {
  window.open(url);
};
</script>


<img v-if="module.cover" :class="$style.moduleCover" :src="module.cover"/>

# {{ module.name }}

<Badge :style="{ marginTop: '8px' }" type="tip" :text="module.version" /> <Badge type="warning" :text="module.versionCode" /> <span v-if="module.verified" :class="[$style.chip, $style.chipGreen]">Verified</span>

<div v-if="module.note">

> [!NOTE]
> {{ module.note.message }}

</div>

{{ module.description }}

<div :class="$style.moduleActions">
    <a v-if="module.versions" :href="module.versions.toReversed()[0].zipUrl" target="_blank" :class="[$style.VPButton, $style.VPButton_medium, $style.VPButton_brand]">Download latest version</a>
    <a v-if="module.support" :href="module.support" target="_blank" :class="[$style.VPButton, $style.VPButton_medium, $style.VPButton_alt]">Support</a>
</div>

<div v-if="module.screenshots && module.screenshots.length">
    <h2>Screenshots</h2>
    <div :class="$style.screenshotsContainer">
        <div v-for="(screenshot, index) in module.screenshots" :key="index" :class="$style.screenshot">
            <img :src="screenshot" alt="Module Screenshot" />
        </div>
    </div>
</div>


## Versions

<ul v-for="(version, index) in module.versions.toReversed()">
    <li>
        <a :href="version.zipUrl" :key="index">{{ version.version }} ({{ version.versionCode }})</a>
    </li>
</ul>

## More

<div :class="$style.feature">
    <article :class="$style.box">
        License: {{ module.license }}<br/>
        Timestamp: {{ new Date(module.timestamp * 1000) }}
    </article>
</div>


<style module>
.moduleCover {
    width: 100%;
    margin-bottom: 16px;
    border-radius: 16px;
}

.moduleActions {
    display: flex;
    gap: 8px;
}

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

.screenshotsContainer {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}

.screenshot img {
  width: 200px;
  height: auto;
  border-radius: 12px;
}

.feature {
    display: block;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
}

.box {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
}

.chipContainer {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding-top: 20px;
}

.chipGreen {
    border-color: transparent;
    color: #b3ffa8;
    background-color: rgb(100 255 119 / 16%);
}

.chipInfo {
    border-color: var(--vp-badge-info-border);
    color: var(--vp-badge-info-text);
    background-color: var(--vp-badge-info-bg);
}

.chipDanger {
    border-color: var(--vp-badge-danger-border);
    color: var(--vp-badge-danger-text);
    background-color: var(--vp-badge-danger-bg);
}

.chip {
    border-style: solid;
    border-width: 1px;
    display: inline-block;
    border-radius: 12px;
    padding: 0 10px;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
    margin: 4px;
    transform: translateY(-2px);
}
</style>
