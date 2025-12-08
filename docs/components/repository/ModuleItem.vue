<script setup>
import { computed } from "vue";
import { toFormattedFileSize } from "../../helper/toFormattedFileSize";
import { Repository } from "../../data/repositories";
import { useData } from "vitepress";

import { VPLink } from "vitepress/theme";

const { lang, params } = useData();

const props = defineProps(["module"]);
const repo = computed(() => new Repository(params.value.url));

const timestamp = computed(() => props.module.timestamp);
const module = computed(() => props.module);

// Label types enum
const LabelType = {
  LICENSE: "LICENSE",
  ANTIFEATURES: "ANTIFEATURES",
  CATEGORY: "CATEGORY",
  METAMODULE: "METAMODULE",
};

// Labels to show logic
const labelsToShow = computed(() => {
  const labels = [];

  if (module.value.license) {
    labels.push({
      type: LabelType.LICENSE,
      text: module.value.license,
      icon: "tag",
      style: "default",
    });
  }

  if (module.value.track?.antifeatures) {
    labels.push({
      type: LabelType.ANTIFEATURES,
      text: "Anti-Features",
      icon: "alert-triangle",
      style: "warning",
    });
  }

  if (module.value.categories?.length > 0) {
    labels.push({
      type: LabelType.CATEGORY,
      text: module.value.categories[0],
      icon: "category",
      style: "secondary",
    });
  }

  if (module.value.metamodule && (module.value.metamodule == "true" || module.value.metamodule == "1")) {
    labels.push({
      type: LabelType.METAMODULE,
      text: "META",
      style: "success",
    });
  }

  return labels;
});

const hasLabels = computed(() => labelsToShow.value.length > 0);

const getLastUpdated = () => {
  if (!timestamp.value) {
    return "Invalid date";
  }

  return Intl.DateTimeFormat(lang, {
    year: "numeric",
    day: "2-digit",
    month: "long",
    hour12: true,
  }).format(new Date(timestamp.value * 1000));
};
</script>

<template>
  <VPLink decoration="none" :href="'repository/' + repo.id + '/' + module.id">
    <div :class="$style.feature">
      <article>
        <img v-if="module.cover" :class="$style.moduleCover" :src="module.cover" />
        <article :class="$style.box">
          <h2 :class="$style.title" :id="module.id">{{ module.name }}</h2>
          <span :class="$style.author">{{ module.version }} ({{ module.versionCode }}) by {{ module.author }}</span>
          <span :class="$style.lastUpdated" v-if="module.timestamp">
            {{ getLastUpdated() }}
            <span :class="$style.stars" v-if="module.stars">
              <span>•</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                <use :href="`/assets/icons/star.svg`"></use>
              </svg>
              <span>{{ module.stars }}</span>
            </span>
          </span>

          <span :class="$style.details">{{ module.description }}</span>

          <!-- Labels -->
          <div v-if="hasLabels" :class="$style.labelsContainer">
            <div
              v-for="label in labelsToShow"
              :key="label.type"
              :class="[$style.label, $style[`label${label.style.charAt(0).toUpperCase() + label.style.slice(1)}`]]"
            >
              <svg
                v-if="label.icon"
                :class="$style.labelIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <use :href="`/assets/icons/${label.icon}.svg`"></use>
              </svg>
              <span :class="$style.labelText">{{ label.text }}</span>
            </div>
          </div>
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

.lastUpdated {
  flex-grow: 1;
  line-height: 24px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-gray-1);
}

.stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 6px;
  color: var(--vp-c-yellow-5);
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

.moduleMetaContainer {
  color: var(--vp-c-text-3);
  margin: 0px !important;
  padding: 0px !important;
  padding-top: 20px !important;
}

/* Labels Section */
.labelsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
  padding-top: 8px;
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.label:hover {
  transform: scale(1.05);
}

.labelIcon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.labelText {
  font-weight: 600;
}

/* Label Variants */
.labelDefault {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-border);
}

.labelSuccess {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  border-color: rgba(34, 197, 94, 0.3);
}

.labelWarning {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  border-color: rgba(245, 158, 11, 0.3);
}

.labelError {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border-color: rgba(239, 68, 68, 0.3);
}

.labelSecondary {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-soft);
}

@media (max-width: 768px) {
  .label {
    padding: 1px 4px;
    font-size: 9px;
  }

  .labelIcon {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .labelsContainer {
    gap: 4px;
  }
}
</style>
