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
const sanitizedIdWithFileOutputStream = computed(() => `${sanitizedIdWithFile.value}OutputStream`);

const hiddenApis = [
  {
    name: "ModuleInterface",
    id: sanitizedId,
  },
  {
    name: "FileInterface",
    id: sanitizedIdWithFile,
  },
  {
    name: "FileInputInterface",
    id: sanitizedIdWithFileInputStream,
  },
  {
    name: "FileOutputInterface",
    id: sanitizedIdWithFileOutputStream,
  },
];

defineExpose({ hiddenApis });
</script>

<template>
  <div class="input-box">
    <h4>Enter your Module ID</h4>
    <input type="text" v-model="id" placeholder="ID" class="input-input" />

    <p>
      <code>$module_id</code> (<code>{{ sanitizedId }}</code
      >) is a sanitized version of the module ID. It is used to create unique variable names in JavaScript. The sanitized version replaces
      any non-alphanumeric characters with underscores and prefixes the ID with a dollar sign.
    </p>

    <div class="api-cards">
      <a v-for="api in hiddenApis" :key="api.id" :href="`https://docs.mmrl.dev/interfaces/Built-In_Interfaces.${api.name}.html`" target="_blank" class="api-card">
        <div class="api-header">
          <h5>{{ api.name }}</h5>
          <code class="api-variable">window.{{ api.id }}</code>
        </div>
      </a>
    </div>

    <div class="code-sample">
      <h5>Usage Example</h5>
      <div class="language-js vp-adaptive-theme line-numbers-mode">
        <button title="Copy Code" class="copy"></button>
        <span class="lang">js</span>
        <pre
          class="shiki shiki-themes github-light github-dark vp-code"
          tabindex="0"
        ><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {{ sanitizedId }} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'undefined'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">keys</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({{ sanitizedId }}).</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"Running WebUI X!"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre>
        <div class="line-numbers-wrapper" aria-hidden="true">
          <span class="line-number">1</span><br />
          <span class="line-number">2</span><br />
          <span class="line-number">3</span><br />
        </div>
      </div>
    </div>
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

.api-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.api-card {
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  text-decoration: none !important;
}

.api-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.api-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.api-header h5 {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.api-variable {
  background-color: var(--vp-c-bg);
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.code-sample {
  margin: 1.5rem 0;
}

.code-sample h5 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
