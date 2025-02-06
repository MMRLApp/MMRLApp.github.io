---
editLink: false
prev: false
next: false
---

# MMRL Downloads

<script setup>
import { data } from '../data/downloads.data.ts'
import { toFormattedFileSize } from "../helper/toFormattedFileSize";
import { VPLink } from "vitepress/theme";
import { useData } from "vitepress";

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

<div :class="$style.items" v-for="release in data">
    <VPLink :class="$style.item" decoration="none" :href="release.assets[0].browser_download_url" target="_blank">
        <div :class="$style.feature">
            <article :class="$style.box">
                <h2 :class="$style.title" :id="release.id">{{ release.tag_name }}</h2>
                <ul :class="$style.moduleMetaContainer">
                    <li :class="$style.moduleMeta" v-if="release.assets[0].size">
                        <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-git-branch"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 8l0 8" /><path d="M9 18h6a2 2 0 0 0 2 -2v-5" /><path d="M14 14l3 -3l3 3" /></svg>
                        {{ release.target_commitish }}
                    </li>
                    <li :class="$style.moduleMeta" v-if="release.assets[0].size">
                        <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        {{ release.assets[0].download_count }}
                    </li>
                    <li :class="$style.moduleMeta" v-if="release.assets[0].size">
                        <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 20.735A2 2 0 0 1 5 19V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-1" /><path d="M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2m0-12h-1m3 2h-1m-1 2h-1m3 2h-1m-1 2h-1m3 2h-1" /></g></svg>
                        {{ toFormattedFileSize(release.assets[0].size) }}
                    </li>
                      <li :class="$style.moduleMeta" v-if="release.published_at">
                        <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" /><path d="M12 7v5l3 3" /></g></svg>
                        {{ getLastUpdated(release.published_at) }}
                    </li>
                    <li :class="$style.moduleMeta" v-if="release.assets[0].size">
                        <img :style="{borderRadius:'100%'}" :class="$style.moduleMetaIcon" :src="release.assets[0].uploader.avatar_url" />
                        <VPLink decoration="none" :style="{marginRight: '6px'}" :href="release.assets[0].uploader.html_url" target="_blank">{{ release.assets[0].uploader.login }}</VPLink>  uploaded this
                    </li>
                </ul>
            </article>
        </div>
    </VPLink>
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
    display: flex;
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
