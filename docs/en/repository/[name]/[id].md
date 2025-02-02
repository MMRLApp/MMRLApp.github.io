---
editLink: false
prev: false
next: false
---

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

import VPLink from "../../../components/vite/VPLink.vue"
import VPButton from "../../../components/vite/VPButton.vue"

const { params } = useData()

const module = ref(params.value.module)
const showModal = ref(false)

const versions = computed(() => {
  return module.value.versions.toReversed();
}); 

const latestVersion = computed(() => {
  return versions.value[0];
});
</script>

<img v-if="module.cover" :class="$style.moduleCover" :src="module.cover"/>

# {{ module.name }}

<div :class="$style.moduleDetailsContainer">
    <span :class="$style.author">{{ module.author }}</span>
    <span v-if="module.track.antifeatures && module.track.antifeatures.lenght !== 0" :class="$style.details">Contains Anti-Features.</span>
</div>

<Badge :style="{ marginTop: '8px' }" type="tip" :text="module.version" /> <Badge type="warning" :text="module.versionCode" /> <span v-if="module.verified" :class="[$style.chip, $style.chipGreen]">Verified</span>

<div v-if="module.note">

> [!NOTE]
> {{ module.note.message }}

</div>

{{ module.description }}

<div :class="$style.moduleActions">
    <VPButton text="Download latest version" size="medium" target="_blank" theme="brand" :href="latestVersion.zipUrl" />
    <VPButton v-if="module.support" :href="module.support" target="_blank" text="Support" size="medium" theme="alt" />
</div>

<div v-if="module.screenshots && module.screenshots.length">
    <h2>Screenshots</h2>
    <div :class="$style.screenshotsContainer">
        <div v-for="(screenshot, index) in module.screenshots" :key="index" :class="$style.screenshot">
            <img :src="screenshot" alt="Module Screenshot" />
        </div>
    </div>
</div>



<div v-if="module.track.antifeatures && module.track.antifeatures.length">
    <h2>Anti-Features</h2>
    <p>The following Anti-Features have been found.</p>
    <ul v-for="(af, index) in module.track.antifeatures">
        <li>
            <VPLink :href="'/guide/antifeatures#' + af.toLowerCase()" :key="index" target="_blank">{{ af }}</VPLink>
        </li>
    </ul>
</div>

## Versions

<ul v-for="(version, index) in versions">
    <li>
        <VPLink :href="version.zipUrl" :key="index" target="_blank">{{ version.version }} ({{ version.versionCode }})</VPLink>
    </li>
</ul>

## More

<div :class="$style.feature">
    <article :class="$style.box">
        License: {{ module.license }}<br/>
        Timestamp: {{ new Date(module.timestamp * 1000) }}
    </article>
</div>

<Teleport to="body">
  <Transition name="modal">
    <div v-show="showModal" class="modal-mask">
      <div class="modal-container">
        <p>Hello from the modal!</p>
        <div class="model-footer">
          <button class="modal-button" @click="showModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</Teleport>

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

.moduleDetailsContainer {
    margin-top: 8px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
}

.author {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-badge-tip-text);
}

.details {
  flex-grow: 1;
  line-height: 24px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
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

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin-top: 8px;
  text-align: right;
}

.modal-button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
