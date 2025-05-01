<script setup>
import { ref, computed } from 'vue';

const id = ref('bindhosts');

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
</script>

### Sanitized Module in WebUI

The `sanitizedModId` is a property in the `WebUIOptions` class that provides a sanitized version of the `modId` string. This sanitized version ensures that the module ID is safe for use in contexts like file names, JavaScript interfaces, or other identifiers where special characters might cause issues.

The `sanitizedModId` is derived by replacing all characters in the `modId` that are not alphanumeric, underscores (`_`), or dots (`.`) with underscores (`_`). This ensures compatibility and avoids potential errors when the `modId` is used in various parts of the application.

<div class="input-box">
  <h4>Enter your Module ID</h4>
  <input
    type="text"
    v-model="id"
    placeholder="ID"
    class="input-input"
  />    

<div class="language-JavaScript vp-adaptive-theme line-numbers-mode" data-v-c1522a89=""><button title="Copy Code"
        class="copy" data-v-c1522a89=""></button><span class="lang" data-v-c1522a89="">JavaScript</span>
    <pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"
        data-v-c1522a89=""><code data-v-c1522a89=""><span class="line" data-v-c1522a89=""><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;" data-v-c1522a89="">// Check if the ModuleInterface exists</span></span>
<span class="line" data-v-c1522a89=""><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-c1522a89="">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-c1522a89="">keys</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-c1522a89="">({{ sanitizedId }}).</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-c1522a89="">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-c1522a89=""> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-c1522a89=""> 0</span></span>
<span class="line" data-v-c1522a89=""></span>
<span class="line" data-v-c1522a89=""><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;" data-v-c1522a89="">// Check if the FileSystem API exists</span></span>
<span class="line" data-v-c1522a89=""><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-c1522a89="">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-c1522a89="">keys</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-c1522a89="">({{ sanitizedIdWithFile }}).</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-c1522a89="">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-c1522a89=""> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-c1522a89=""> 0</span></span>
<span class="line" data-v-c1522a89=""></span>
<span class="line" data-v-c1522a89=""><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;" data-v-c1522a89="">// Check if the FileInputStream exists</span></span>
<span class="line" data-v-c1522a89=""><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-c1522a89="">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;" data-v-c1522a89="">keys</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;" data-v-c1522a89="">({{ sanitizedIdWithFileInputStream }}).</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-c1522a89="">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;" data-v-c1522a89=""> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;" data-v-c1522a89=""> 0</span></span></code></pre>
    <div class="line-numbers-wrapper" aria-hidden="true" data-v-c1522a89=""><span class="line-number"
            data-v-c1522a89="">1</span><br data-v-c1522a89=""><span class="line-number" data-v-c1522a89="">2</span><br
            data-v-c1522a89=""><span class="line-number" data-v-c1522a89="">3</span><br data-v-c1522a89=""><span
            class="line-number" data-v-c1522a89="">4</span><br data-v-c1522a89=""><span class="line-number"
            data-v-c1522a89="">5</span><br data-v-c1522a89=""><span class="line-number" data-v-c1522a89="">6</span><br
            data-v-c1522a89=""><span class="line-number" data-v-c1522a89="">7</span><br data-v-c1522a89=""><span
            class="line-number" data-v-c1522a89="">8</span><br data-v-c1522a89=""></div>
</div>

  <ul>
    <li><code>window.{{ sanitizedId }}</code> - ModuleInterface</li>
    <li><code>window.{{ sanitizedIdWithFile }}</code> - FileSystem API</li>
    <li><code>window.{{ sanitizedIdWithFileInputStream }}</code> - FileSystem API</li>
  </ul>
</div>

### Purpose of `sanitizedModId`

1. **JavaScript Interface Naming**:  
   The `sanitizedModId` is used as the name for JavaScript interfaces added to the WebView. This ensures that the interface name is valid and does not conflict with JavaScript naming conventions.

2. **File and Directory Safety**:  
   The sanitized version of the `modId` is safe to use in file paths or as part of file names, avoiding issues with special characters.

3. **Consistency Across Platforms**:  
   By sanitizing the `modId`, the application ensures consistent behavior across different platforms and environments.

---

### Example Usage in `ModuleInterface`

In the `ModuleInterface` class, the `sanitizedModId` is used to expose the module's functionality to JavaScript running in the WebView. For example:

```kotlin
addJavascriptInterface(
    ModuleInterface(
        options = options,
        context = context,
        webView = this,
        insets = insets
    ), "$${options.sanitizedModId}"
)
```

Here, the `sanitizedModId` is used as the name of the JavaScript interface, ensuring that it is a valid and unique identifier.

---

### JavaScript Example

Once the `ModuleInterface` is added to the WebView, it can be accessed in JavaScript using the `sanitizedModId`. Here's an example:

```javascript
// Assuming the sanitizedModId is "example_module"
const moduleInterface = window.$example_module;

// Check if the module has access to the file system
if (moduleInterface.hasAccessToFileSystem) {
    console.log("The module has access to the file system.");
}

// Get the top window inset
const topInset = moduleInterface.windowTopInset;
console.log(`Top inset: ${topInset}px`);

// Check if the app is in dark mode
const isDarkMode = moduleInterface.isDarkMode;
console.log(`Dark mode enabled: ${isDarkMode}`);

// Recompose the WebUI
moduleInterface.recompose();
console.log("WebUI recomposed.");
```

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