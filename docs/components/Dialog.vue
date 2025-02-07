<script setup>
import { VPButton } from "vitepress/theme";

defineProps(["title", "open", "onClose", "onOpen", "contentStyle"]);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-show="open" class="modal-mask">
        <div class="modal-container">
          <h2 class="modal-title">{{ title }}</h2>
          <div class="modal-content" :style="contentStyle">
            <slot />
          </div>
          <div class="model-footer">
            <VPButton size="medium" theme="alt" text="Close" @click="onClose" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-title {
  display: flex;
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  margin: 16px 26px;
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

.modal-content {
  mask-image: linear-gradient(to bottom, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%);
  overflow: scroll;
  height: inherit;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.modal-container {
  position: relative;
  width: 88%;
  height: 88%;
  max-width: 1152px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin: 16px 26px;
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
