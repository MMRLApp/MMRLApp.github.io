<script setup>
import { ref, computed } from "vue";

const id = ref("bindhosts");

const _sanitizedId = computed(() => id.value.replace(/[^a-zA-Z0-9_]/g, "_"));
const sanitizedId = computed(() => "$" + _sanitizedId.value);

const sanitizedIdWithFile = computed(() => {
  const sId = _sanitizedId.value;
  let prefix = "";

  if (sId.length >= 2) {
    prefix = sId[0].toUpperCase() + sId[1];
  } else if (sId.length === 1) {
    prefix = sId[0].toUpperCase();
  }

  return `$${prefix}File`;
});

const sanitizedIdWithFileInputStream = computed(() => `${sanitizedIdWithFile.value}InputStream`);

defineExpose({
  sanitizedId,
  sanitizedIdWithFile,
  sanitizedIdWithFileInputStream,
});
</script>

<template>
  <div class="input-box">
    <h4>Enter your Module ID</h4>
    <input type="text" v-model="id" placeholder="ID" class="input-input" />

    <p>
      <code>$module_id</code> (<code>{{ sanitizedId }}</code>) is a sanitized version of the module ID. It is used to create unique variable names in JavaScript. The
      sanitized version replaces any non-alphanumeric characters with underscores and prefixes the ID with a dollar sign.
    </p>

    <ul>
      <li>
        <code>window.{{ sanitizedId }}</code> - <strong>ModuleInterface</strong>
      </li>
      <li>
        <code>window.{{ sanitizedIdWithFile }}</code> - <strong>FileManager</strong>
      </li>
      <li>
        <code>window.{{ sanitizedIdWithFileInputStream }}</code> - <strong>FileInputInterface</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin: 1rem 0;
  gap: 10px;
}

.input-input {
  width: 100%;
  max-width: 400px;
  padding: 0.6rem 1rem;
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  color: #909399;
  transition: outline-color 0.3s ease;
  transition: outline-width 0.3s ease;
  transition: outline-style 0.3s ease;
}

.input-input:focus {
  outline-color: var(--vp-c-brand-1);
  outline-width: 1px;
  outline-style: solid;
}
</style>
