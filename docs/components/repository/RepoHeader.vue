<script setup>
import { ref } from 'vue'
import Dialog from '../Dialog.vue'
import { VPTeamMembers, VPButton } from 'vitepress/theme'

defineProps(["repo", "internalRepo"]);

const showModal = ref(false)

const openModal = () => {
  document.body.style.overflow = 'hidden'
  showModal.value = true
}

const closeModal = () => {
  document.body.style.overflow = 'unset'
  showModal.value = false
}
</script>

<template>
  <div :class="$style.repoMetaContainer">
    <img v-if="repo.cover" :class="$style.repoCover" :src="repo.cover" />
    <span :class="$style.repoTitle">{{ repo.name }}</span>
    <span v-if="repo.description" :class="$style.repoDetails">{{ repo.description }}</span>
    <div v-if="repo.submission || repo.support || repo.donate" :class="$style.repoActions">
      <VPButton tag="a" v-if="repo.submission" text="Submit Module" size="medium" theme="brand" :href="repo.submission" />
      <VPButton tag="a" v-if="repo.support" text="Support" size="medium" theme="alt" :href="repo.support" />
      <VPButton v-if="internalRepo.members" text="Team" size="medium" theme="alt" @click="openModal" />
      <VPButton tag="a" v-if="repo.donate" text="Donate" size="medium" theme="sponsor" :href="repo.donate" />
    </div>
  </div>
  <Dialog :open="showModal" :onClose="closeModal" :onOpen="openModal" :contentStyle="{ padding: '16px 26px' }" title="Repository Member">
    <VPTeamMembers size="small" :members="internalRepo.members" />
  </Dialog>
</template>

<style scoped>
a {
    color: inherit !important;
    text-decoration: none !important;
}
</style>

<style module>
.repoMetaContainer {
  padding-bottom: 16px;
}

.repoActions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
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
