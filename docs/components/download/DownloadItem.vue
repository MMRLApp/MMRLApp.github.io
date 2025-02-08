<script setup>
import { computed, ref } from "vue";
import AssetCard from "./AssetCard.vue";
import Dialog from "../Dialog.vue";
import { useData } from "vitepress";
import { VPButton } from "vitepress/theme";
import markdownit from "markdown-it";

const md = markdownit();

const { lang } = useData();

const props = defineProps({
  release: Object,
});

const countAssetsDownloads = computed(() => {
  return props.release.assets.reduce((acc, asset) => acc + asset.download_count, 0);
});

const showAssetsModal = ref(false);
const showNotesModal = ref(false);

const openAssetsModal = () => {
  document.body.style.overflow = "hidden";
  showAssetsModal.value = true;
};

const closeAssetsModal = () => {
  document.body.style.overflow = "unset";
  showAssetsModal.value = false;
};

const openNotesModal = () => {
  document.body.style.overflow = "hidden";
  showNotesModal.value = true;
};

const closeNotesModal = () => {
  document.body.style.overflow = "unset";
  showNotesModal.value = false;
};

const getLastUpdated = (timestamp) => {
  if (!timestamp) {
    return "Invalid date";
  }

  return Intl.DateTimeFormat(lang, {
    year: "numeric",
    day: "2-digit",
    month: "long",
    hour12: true,
  }).format(new Date(timestamp));
};
</script>

<template>
  <div :class="$style.item">
    <div :class="$style.feature">
      <article :class="$style.box">
        <h2 :class="$style.title" :id="props.release.id">
          {{ props.release.tag_name }} <Badge v-if="props.release.prerelease" type="danger" text="Pre-release" />
        </h2>
        <ul :class="$style.moduleMetaContainer">
          <li :class="$style.moduleMeta">
            <svg
              :class="$style.moduleMetaIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-git-branch"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M7 8l0 8" />
              <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
              <path d="M14 14l3 -3l3 3" />
            </svg>
            {{ props.release.target_commitish }}
          </li>
          <li :class="$style.moduleMeta">
            <svg
              :class="$style.moduleMetaIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-download"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 11l5 5l5 -5" />
              <path d="M12 4l0 12" />
            </svg>
            {{ countAssetsDownloads }} <sup>(all assets)</sup>
          </li>
          <li :class="$style.moduleMeta">
            <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
                <path d="M12 7v5l3 3" />
              </g>
            </svg>
            {{ getLastUpdated(props.release.published_at) }}
          </li>
        </ul>

        <div :style="{ display: 'flex', gap: '8px', marginTop: '16px' }">
          <VPButton text="Notes" size="medium" theme="brand" @click="openNotesModal" />
          <VPButton text="Assets" size="medium" theme="alt" @click="openAssetsModal" />
        </div>
      </article>
    </div>
  </div>

  <Dialog
    :open="showAssetsModal"
    :onClose="closeAssetsModal"
    :onOpen="openAssetsModal"
    :contentStyle="{ padding: '16px 26px' }"
    title="Assets downloads"
  >
    <div :class="$style.item" v-for="asset in release.assets" :key="asset.id">
      <AssetCard :asset="asset" />
    </div>
  </Dialog>

  <Dialog
    :open="showNotesModal"
    :onClose="closeNotesModal"
    :onOpen="openNotesModal"
    :contentStyle="{ padding: '16px 26px' }"
    title="Notes"
  >
    <div class="vp-doc" v-html="md.render(props.release.body)" />
  </Dialog>
</template>

<style module>
.item {
  padding: 8px;
  width: 100%;
}

.feature {
  user-select: none;
  cursor: pointer;
  text-decoration: none !important;
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
  color: initial !important;
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

.moduleCover {
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  height: 100%;
  aspect-ratio: 2.048;
  object-fit: cover;
}

.moduleMeta {
  align-items: center;
  align-self: end;
  display: flex;
  line-height: 20px;
  word-break: break-word;
}

.moduleMetaIcon {
  flex-shrink: 0;
  width: 20px;
  line-height: 20px;
  margin-right: 4px;
  height: 20px;
}

.moduleMetaContainer {
  color: var(--vp-c-text-3);
  margin: 0px !important;
  padding: 0px !important;
  padding-top: 20px !important;
}
</style>
