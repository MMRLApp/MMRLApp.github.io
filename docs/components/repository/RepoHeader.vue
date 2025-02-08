<script setup>
import { ref, computed } from "vue";
import Dialog from "../Dialog.vue";
import { VPTeamMembers, VPButton } from "vitepress/theme";
import { Repository } from "../../data/repositories";

const props = defineProps(["repo"]);
const internalRepo = computed(() => new Repository(props.repo.url));

console.log(internalRepo.value.members);

const showModal = ref(false);

const openModal = () => {
  document.body.style.overflow = "hidden";
  showModal.value = true;
};

const closeModal = () => {
  document.body.style.overflow = "unset";
  showModal.value = false;
};
</script>

<template>
  <div :class="$style.repoMetaContainer">
    <img v-if="props.repo.cover" :class="$style.repoCover" :src="props.repo.cover" />
    <span :class="$style.repoTitle">{{ props.repo.name }}</span>
    <span v-if="props.repo.description" :class="$style.repoDetails">{{ props.repo.description }}</span>
    <div v-if="props.repo.submission || props.repo.support || props.repo.donate || props.repo.memebers" :class="$style.repoActions">
      <VPButton tag="a" v-if="props.repo.submission" text="Submit Module" size="medium" theme="brand" :href="props.repo.submission" />
      <VPButton tag="a" v-if="props.repo.support" text="Support" size="medium" theme="alt" :href="props.repo.support" />
      <VPButton v-if="internalRepo.members.length !== 0" text="Team" size="medium" theme="alt" @click="openModal" />
      <VPButton tag="a" v-if="props.repo.donate" text="Donate" size="medium" theme="sponsor" :href="props.repo.donate" />
    </div>
    <details class="details custom-block">
      <summary>Repository URL to add it to MMRL</summary>

      <div class="language-text vp-adaptive-theme line-numbers-mode">
        <button title="Copy Code" class="copy"></button>
        <span class="lang">ts</span>
        <pre
          class="shiki shiki-themes github-light github-dark vp-code"
          tabindex="0"
        ><code><span class="line">{{ internalRepo.mmrlUrl }}</span></code></pre>
        <div class="line-numbers-wrapper" aria-hidden="true">
          <span class="line-number">1</span>
          <br />
        </div>
      </div>
    </details>
  </div>
  <Dialog :open="showModal" :onClose="closeModal" :onOpen="openModal" :contentStyle="{ padding: '16px 26px' }" title="Repository Members">
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
