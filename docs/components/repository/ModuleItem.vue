<script setup>
import { toFormattedFileSize } from "../../helper/toFormattedFileSize";
import { useData } from "vitepress";
import VPLink from "../vite/VPLink.vue";

const props = defineProps(["module", "params"]);

const { lang } = useData();

const timestamp = props.module.timestamp;
const params = props.params;
const module = props.module;

const getLastUpdated = () => {
  if (!timestamp) {
    return "Invalid date";
  }

  return Intl.DateTimeFormat(lang, {
    year: "numeric",
    day: "2-digit",
    month: "short",
    hour12: true,
  }).format(new Date(timestamp * 1000));
};
</script>

<template>
  <VPLink decoration="none" :href="'repository/' + params.name + '/' + module.id">
    <div :class="$style.feature">
      <article>
        <img v-if="module.cover" :style="{ borderRadius: '12px 12px 0px 0px' }" :src="module.cover" />
        <article :class="$style.box">
          <h2 :class="$style.title" :id="module.id">{{ module.name }}</h2>
          <span :class="$style.author">{{ module.version }} ({{ module.versionCode }}) by {{ module.author }}</span>
          <span :class="$style.details">{{ module.description }}</span>
          <ul :class="$style.moduleMetaContainer">
            <li :class="$style.moduleMeta" v-if="module.size">
              <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M6 20.735A2 2 0 0 1 5 19V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-1" />
                  <path
                    d="M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2m0-12h-1m3 2h-1m-1 2h-1m3 2h-1m-1 2h-1m3 2h-1"
                  />
                </g>
              </svg>
              {{ toFormattedFileSize(module.size) }}
            </li>
            <li :class="$style.moduleMeta" v-if="module.categories">
              <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
                />
              </svg>
              {{ module.categories[0] }}
            </li>
            <li :class="$style.moduleMeta" v-if="module.track.antifeatures">
              <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v4m-1.637-9.409L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0zM12 16h.01"
                />
              </svg>
              Anti-Features
            </li>
            <li :class="$style.moduleMeta" v-if="module.timestamp">
              <svg :class="$style.moduleMetaIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
                  <path d="M12 7v5l3 3" />
                </g>
              </svg>
              {{ getLastUpdated() }}
            </li>
          </ul>
        </article>
      </article>
    </div>
  </VPLink>
</template>

<style module>
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
