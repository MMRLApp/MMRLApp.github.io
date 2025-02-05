<script setup>
import { ref } from 'vue'
import { VPTeamMembers, VPButton } from 'vitepress/theme'

defineProps(["repo", "internalRepo"]);

const showModal = ref(false)
</script>

<template>
  <div :class="$style.repoMetaContainer">
    <img v-if="repo.cover" :class="$style.repoCover" :src="repo.cover" />
    <span :class="$style.repoTitle">{{ repo.name }}</span>
    <span v-if="repo.description" :class="$style.repoDetails">{{ repo.description }}</span>
    <div v-if="repo.submission || repo.support || repo.donate" :class="$style.repoActions">
      <VPButton tag="a" v-if="repo.submission" text="Submit Module" size="medium" theme="brand" :href="repo.submission" />
      <VPButton tag="a" v-if="repo.support" text="Support" size="medium" theme="alt" :href="repo.support" />
      <VPButton v-if="internalRepo.members" text="Team" size="medium" theme="alt" @click="showModal = true" />
      <VPButton tag="a" v-if="repo.donate" text="Donate" size="medium" theme="sponsor" :href="repo.donate" />
    </div>
  </div>
  <Teleport v-if="internalRepo.members" to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <div>
            <h2 class="modal-title">Repository Members</h2>
            <VPTeamMembers size="small" :members="internalRepo.members" />
          </div>
          <div class="model-footer">
            <VPButton size="medium" theme="alt" text="Close" @click="showModal = false" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

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

<style scoped>
a {
    color: inherit !important;
    text-decoration: inherit !important;
}

.modal-title {
  display: flex;
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  margin-bottom: 16px;
}

.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 88%;
  max-width: 1152px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin-top: 16px;
  text-align: right;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>