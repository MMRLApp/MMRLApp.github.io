<script lang="ts" setup>
import { computed } from "vue";
import { EXTERNAL_URL_RE, normalizeLink } from "../../helper/vite-util";

const props = defineProps<{
  tag?: string;
  href?: string;
  noIcon?: boolean;
  target?: string;
  rel?: string;
  decoration?: string;
}>();

const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));

const decoration = computed(() => props.decoration ?? "underline");
const isExternal = computed(() => (props.href && EXTERNAL_URL_RE.test(props.href)) || props.target === "_blank");
</script>

<template>
  <component
    :is="tag"
    class="VPLink"
    :style="{
      cursor: props.href ? 'pointer' : 'default',
      textDecoration: decoration,
    }"
    :class="{
      link: href,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon,
    }"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>
