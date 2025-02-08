---
editLink: false
prev: false
next: false
---

# MMRL Downloads

<script setup>
import { data } from '../data/downloads.data.ts'
const data = releases

import { toFormattedFileSize } from "../helper/toFormattedFileSize";
import { VPLink } from "vitepress/theme";
import { useData } from "vitepress";
import DownloadItem from "../components/download/DownloadItem.vue"

const { lang } = useData();

const getLastUpdated = (timestamp) => {
  if (!timestamp) {
    return "Invalid date";
  }

  return Intl.DateTimeFormat(lang, {
    year: "numeric",
    day: "2-digit",
    month: "short",
    hour12: true,
  }).format(new Date(timestamp));
};
</script>

<div  :class="$style.items">
<div v-for="release in data">
    <DownloadItem :release="release" />
</div>
</div>

<style scoped>
a {
    text-decoration: none !important;
}
</style>

<style module>
.item {
    padding: 8px;
    width: 100%;
}

.items {
    /* display: flex; */
    flex-wrap: wrap;
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
