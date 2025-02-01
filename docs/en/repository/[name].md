---
editLink: false
prev: false
next: false
---

<script setup>
import { ref, onMounted } from "vue";
import { useData } from 'vitepress'
import repositories from '../../data/repositories.yaml'

const { params } = useData()

const name = params.value.name
const repository = repositories.find((repo) => repo.id === name)

const data = ref(null);

onMounted(async () => {
  const response = await fetch(
    `${repository.url}json/modules.json`
  );
  data.value = await response.json();
});

const openUrl = (url) => {
  window.open(url);
};
</script>

<div v-if="data">
    <div :class="$style.repoMetaContainer">
        <img v-if="data.cover" :class="$style.repoCover" :src="data.cover"/>
        <span :class="$style.repoTitle">{{ data.name }}</span>
        <span v-if="data.description" :class="$style.repoDetails">{{ data.description }}</span>
        <div  v-if="data.submission || data.support || data.donate" :class="$style.repoActions">
            <button v-if="data.submission" @click="openUrl(data.submission)" :class="[$style.VPButton, $style.VPButton_medium, $style.VPButton_brand]">Submit Module</button>
            <button v-if="data.support" @click="openUrl(data.support)" :class="[$style.VPButton, $style.VPButton_medium, $style.VPButton_alt]">Support</button>
            <button v-if="data.donate" @click="openUrl(data.donate)" :class="[$style.VPButton, $style.VPButton_medium, $style.VPButton_alt]">☕ Donate</button>
        </div>
    </div>
    <div :class="$style.items" v-for="module in data.modules">
      <div :class="$style.item">
        <div :class="[$style.feature, $style.grid_4]">
          <article :class="$style.box" @click="openUrl($params.name + '/' + module.id)">
            <h2 :class="$style.title" :id="module.id">{{ module.name }}</h2>
            <span :class="$style.author">
              {{ module.version }} ({{ module.versionCode }}) by
              {{ module.author }}</span
            >
            <span :class="$style.details">{{ module.description }}</span>
            <div :class="$style.chipContainer">
              <span
                v-if="module.categories"
                :class="[$style.chip, $style.chipInfo]"
                >{{ module.categories[0] }}</span
              >
              <span
                v-if="module.track.antifeatures"
                :class="[$style.chip, $style.chipDanger]"
                >Anti-Features</span
              >
              <span
                @click="openUrl(module.versions[0].zipUrl)"
                :class="$style.chip"
                >Download</span
              >
            </div>
          </article>
        </div>
      </div>
    </div>
</div>

<style module>

.repoMetaContainer {
    padding-bottom: 16px;
}

.repoActions {
    display: flex;
    gap: 8px;
    padding: 16px 0px 16px 0px;
}

.repoCover {
    width: 100%;
    margin-bottom: 16px;
    border-radius: 16px;
}

.repoTitle {
    display: flex;
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 32px;
}

.repoDetails {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
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

@media (min-width: 960px) {
    item.grid_4 {
        width: calc(100% / 4);
    }
}

@media (min-width: 768px) {
    .item.grid_2,
    .item.grid_4 {
        width: calc(100% / 2);
    }
}

@media (min-width: 640px) {
    .item.grid_2,
    .item.grid_4,
    .item.grid_6 {
        width: calc(100% / 2);
    }
}

.item {
    padding: 8px;
    width: 100%;
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
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

.title {
    margin: unset !important;
    padding-top: unset !important;
    border-top: unset !important;
    line-height: 24px !important;
    font-size: 16px !important;
    font-weight: 600 !important;
}

.author {
    flex-grow: 1;
    line-height: 24px;
    font-size: 13px;
    font-weight: 500;
    color: var(--vp-badge-tip-text);
}

.details {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.chipContainer {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding-top: 20px;
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
    border-color: var(--docsearch-hit-color);
    display: inline-block;
    border-radius: 12px;
    padding: 0 10px;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
    margin: 4px;
    transform: translateY(-2px);
}

.chip:hover {
    background-color: var(--vp-badge-info-bg);
}
</style>
