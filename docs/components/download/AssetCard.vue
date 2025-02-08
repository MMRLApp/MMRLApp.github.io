<script setup>
import { toFormattedFileSize } from "../../helper/toFormattedFileSize";
import { VPLink } from "vitepress/theme";
import { useData } from "vitepress";

const { lang } = useData();

const props = defineProps({
  asset: Object,
});

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
  <VPLink :class="$style.feature" decoration="none" :href="props.asset.browser_download_url" target="_blank">
    <article :class="$style.box">
      <h2 :class="$style.title" :id="props.asset.id">{{ props.asset.name }}</h2>
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-file"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          </svg>
          {{ props.asset.content_type }}
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
          {{ props.asset.download_count }}
        </li>
        <li :class="$style.moduleMeta">
          <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M6 20.735A2 2 0 0 1 5 19V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-1" />
              <path
                d="M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2m0-12h-1m3 2h-1m-1 2h-1m3 2h-1m-1 2h-1m3 2h-1"
              />
            </g>
          </svg>
          {{ toFormattedFileSize(props.asset.size) }}
        </li>
        <li :class="$style.moduleMeta">
          <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
              <path d="M12 7v5l3 3" />
            </g>
          </svg>
          {{ getLastUpdated(props.asset.created_at) }}
        </li>
      </ul>
    </article>
  </VPLink>
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

.feature:hover {
  border-color: var(--vp-badge-tip-text);
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
