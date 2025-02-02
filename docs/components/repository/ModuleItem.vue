<script setup>
import { toFormattedFileSize } from "../../helper/toFormattedFileSize";
import VPLink from "../vite/VPLink.vue";

defineProps(["module", "params"]);
</script>

<template>
  <VPLink decoration="none" :href="'repository/' + params.name + '/' + module.id">
    <div :class="$style.feature">
      <article :class="$style.box">
        <h2 :class="$style.title" :id="module.id">{{ module.name }}</h2>
        <span :class="$style.author"> {{ module.version }} ({{ module.versionCode }}) by {{ module.author }}</span>
        <span :class="$style.details">{{ module.description }}</span>
        <div :class="$style.actionsContainer">
          <Badge v-if="module.size" type="info" :text="toFormattedFileSize(module.size)" />
          <Badge v-if="module.categories" type="info" :text="module.categories[0]" />
          <Badge v-if="module.track.antifeatures" type="danger" text="Anti-Features" />
        </div>
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

.actionsContainer {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
  padding-top: 20px;
  gap: 4px;
}
</style>
