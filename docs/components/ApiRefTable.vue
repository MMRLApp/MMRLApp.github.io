<script setup lang="ts">
import { ref } from "vue";

interface ApiProp {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  fullType?: string;
}

interface ApiRefTableProps {
  title: string;
  props: ApiProp[];
}

const componentProps = defineProps<ApiRefTableProps>();
const openRows = ref<Record<number, boolean>>({});

function hasDetails(prop: ApiProp): boolean {
  return Boolean(prop.description || prop.fullType);
}

function toggleRow(index: number, prop: ApiProp): void {
  if (!hasDetails(prop)) {
    return;
  }

  openRows.value[index] = !openRows.value[index];
}

function rowOpen(index: number): boolean {
  return Boolean(openRows.value[index]);
}

function typeColorClass(type: string): string {
  const base = type.replace(/[\[\]?|]/g, "").trim().toLowerCase();

  if (base === "string") return "type-string";
  if (base === "number") return "type-number";
  if (base === "boolean") return "type-boolean";
  if (base === "function") return "type-function";
  if (base === "reactnode" || base === "react.reactnode") return "type-reactnode";
  if (base === "undefined") return "type-undefined";
  if (base === "null") return "type-null";

  return "type-other";
}

function parseType(type: string): Array<{ value: string; delimiter: boolean }> {
  const parts = type.split(/(\s*\|\s*)/).filter((part) => part.length > 0);

  return parts.map((part) => {
    const trimmed = part.trim();
    return {
      value: trimmed,
      delimiter: trimmed === "|",
    };
  });
}
</script>

<template>
  <div data-slot="api-ref-table" class="api-ref-table">
    <div class="api-ref-table__heading">
      <h3>{{ componentProps.title }}</h3>
    </div>

    <div class="api-ref-table__columns">
      <span class="api-ref-table__column-name">Prop</span>
      <span class="api-ref-table__column-type">Type</span>
    </div>

    <div
      v-for="(prop, index) in componentProps.props"
      :key="`${prop.name}-${index}`"
      class="api-ref-table__row"
    >
      <button
        type="button"
        class="api-ref-table__row-button"
        :class="{ 'is-clickable': hasDetails(prop) }"
        :disabled="!hasDetails(prop)"
        :aria-expanded="hasDetails(prop) ? rowOpen(index) : undefined"
        @click="toggleRow(index, prop)"
      >
        <span class="api-ref-table__prop-name">
          <span class="api-ref-table__prop-name-text">{{ prop.name }}</span>
          <span v-if="!prop.required" class="api-ref-table__optional">?</span>
        </span>

        <span class="api-ref-table__prop-type">
          <span class="type-display">
            <template v-for="(part, partIndex) in parseType(prop.type)" :key="`${prop.name}-${index}-type-${partIndex}`">
              <span v-if="part.delimiter" class="type-delimiter"> | </span>
              <span v-else :class="typeColorClass(part.value)">{{ part.value }}</span>
            </template>
          </span>
        </span>

        <svg
          v-if="hasDetails(prop)"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="api-ref-table__chevron"
          :class="{ 'is-open': rowOpen(index) }"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <Transition name="api-ref-table-expand">
        <div v-if="rowOpen(index) && hasDetails(prop)" class="api-ref-table__details">
          <p v-if="prop.description" class="api-ref-table__description">{{ prop.description }}</p>
          <div v-if="prop.fullType" class="api-ref-table__full-type">
            <span class="api-ref-table__full-type-label">Type</span>
            <span class="type-display">
              <template v-for="(part, partIndex) in parseType(prop.fullType)" :key="`${prop.name}-${index}-full-${partIndex}`">
                <span v-if="part.delimiter" class="type-delimiter"> | </span>
                <span v-else :class="typeColorClass(part.value)">{{ part.value }}</span>
              </template>
            </span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.api-ref-table {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 10px 28px -24px rgba(0, 0, 0, 0.45);
}

.api-ref-table__heading {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 14px 16px;
}

.api-ref-table__heading h3 {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.api-ref-table__columns {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 70%, var(--vp-c-default-soft) 30%);
  padding: 10px 16px;
}

.api-ref-table__column-name {
  min-width: 180px;
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.api-ref-table__column-type {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.api-ref-table__row {
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
}

.api-ref-table__row:last-child {
  border-bottom: 0;
}

.api-ref-table__row-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  text-align: left;
  transition: background-color 0.2s ease;
}

.api-ref-table__row-button.is-clickable {
  cursor: pointer;
}

.api-ref-table__row-button.is-clickable:hover {
  background: color-mix(in srgb, var(--vp-c-bg-soft) 64%, var(--vp-c-default-soft) 36%);
}

.api-ref-table__row-button:disabled {
  cursor: default;
}

.api-ref-table__prop-name {
  min-width: 180px;
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.86rem;
}

.api-ref-table__prop-name-text {
  color: var(--vp-c-brand-1);
}

.api-ref-table__optional {
  margin-left: 3px;
  color: var(--vp-c-text-3);
}

.api-ref-table__prop-type {
  flex: 1;
}

.type-display {
  font-family: var(--vp-font-family-mono);
  font-size: 0.86rem;
}

.type-delimiter {
  color: var(--vp-c-text-3);
}

.api-ref-table__chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: transform 0.2s ease;
}

.api-ref-table__chevron.is-open {
  transform: rotate(180deg);
}

.api-ref-table__details {
  border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 80%, var(--vp-c-default-soft) 20%);
  padding: 12px 16px;
}

.api-ref-table__description {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.api-ref-table__full-type {
  margin-top: 8px;
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.api-ref-table__full-type-label {
  min-width: 48px;
  flex-shrink: 0;
  font-size: 0.86rem;
  color: var(--vp-c-text-3);
}

.api-ref-table-expand-enter-active,
.api-ref-table-expand-leave-active {
  transition: all 0.2s ease;
}

.api-ref-table-expand-enter-from,
.api-ref-table-expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.type-string {
  color: #0ea5e9;
}

.type-number {
  color: #f59e0b;
}

.type-boolean {
  color: #a855f7;
}

.type-function {
  color: #e11d48;
}

.type-reactnode {
  color: #14b8a6;
}

.type-undefined {
  color: #3b82f6;
}

.type-null {
  color: #9ca3af;
}

.type-other {
  color: #10b981;
}

@media (max-width: 720px) {
  .api-ref-table__columns,
  .api-ref-table__row-button {
    gap: 12px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .api-ref-table__column-name,
  .api-ref-table__prop-name {
    min-width: 120px;
  }

  .api-ref-table__details {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
