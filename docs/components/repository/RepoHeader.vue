<script setup>
import VPButton from "../vite/VPButton.vue";

defineProps(["repo"]);
</script>

<template>
  <div :class="$style.repoMetaContainer">
    <img v-if="repo.cover" :class="$style.repoCover" :src="repo.cover" />
    <span :class="$style.repoTitle">{{ repo.name }}</span>
    <span v-if="repo.description" :class="$style.repoDetails">{{ repo.description }}</span>
    <div v-if="repo.submission || repo.support || repo.donate" :class="$style.repoActions">
      <VPButton v-if="repo.submission" text="Submit Module" size="medium" theme="brand" :href="repo.submission" />
      <VPButton v-if="repo.support" text="Support" size="medium" theme="alt" :href="repo.support" />
      <VPButton v-if="repo.donate" text="Donate" size="medium" theme="sponsor" :href="repo.donate" />
    </div>
  </div>
</template>

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
  aspect-ratio: 2.048;
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
</style>
