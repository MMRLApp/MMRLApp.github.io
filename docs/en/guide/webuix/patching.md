# Custom Patching in WebUI X Portable

WebUI X Portable allows you to **extend and customize the UI** by injecting your own **CSS** and **JavaScript**.  
This makes it possible to adjust styles, modify layouts, or even add new functionality.

## File Structure

Inside your WebUI X configuration directory, you’ll find a structure like this:

```
/data/adb/.config/<id>/
│
├── js/
│   ├── head/                   # Scripts injected into <head>
│   │   └── example-head.js
│   └── body/                   # Scripts injected into <body>
│       ├── example-body.js
│       └── example-module.mjs
│
└── style/
└── patch.css   # Custom CSS styles

```

- `<id>` = Your module identifier.
- Files in `style/` affect CSS styling.
- Files in `js/head/` load JavaScript into the `<head>` section.
- Files in `js/body/` load JavaScript into the `<body>` section.

## Script Types

The **script type** depends on the file extension you use:

- `*.js` → loaded as a classic script (`<script>`)
- `*.cjs` → loaded as a classic script (`<script>`)
- `*.mjs` → loaded as an ES module (`<script type="module">`)

Use `.mjs` if you need **import/export** or module-based JavaScript.

Example:

- `custom-ui.js` → injected as `<script src="custom-ui.js"></script>`
- `module-example.mjs` → injected as `<script type="module" src="module-example.mjs"></script>`

## CSS Patching

Custom CSS rules go into:

```shell
/data/adb/.config/<id>/style/patch.css
```

Example (`patch.css`):

```css
/* Hide header bar */
.header-bar {
  display: none !important;
}

/* Change background color */
body {
  background-color: #1e1e2e !important;
}

/* Style buttons */
button {
  border-radius: 8px !important;
  padding: 6px 12px !important;
}
```

## JavaScript Injection

You can enhance WebUI X Portable by adding your own JavaScript files.

### Head Scripts

Placed in:

```shell
/data/adb/.config/<id>/js/head/
```

- Injected into the `<head>` of the page.
- Best for **libraries, global scripts, or metadata injection**.

#### Example Head Script

File:

```
/data/adb/.config/<id>/js/head/example-head.js
```

```js
// Example head script: Inject Google Fonts
(function () {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
  document.head.appendChild(link);

  console.log("[WebUI X] Head script loaded: Google Fonts added.");
})();
```

### Body Scripts

Placed in:

```shell
/data/adb/.config/<id>/js/body/
```

- Injected into the `<body>` of the page.
- Best for **UI interactions, DOM manipulation, and runtime logic**.

#### Example Body Script 1 – Custom Button

File:

```
/data/adb/.config/<id>/js/body/custom-button.js
```

```js
// Example body script: Add a floating button
window.addEventListener("DOMContentLoaded", () => {
  let btn = document.createElement("button");
  btn.textContent = "Click Me!";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.zIndex = "9999";
  btn.style.padding = "10px 16px";
  btn.style.borderRadius = "8px";
  btn.style.background = "#007bff";
  btn.style.color = "#fff";
  btn.onclick = () => alert("Hello from WebUI X custom button!");
  document.body.appendChild(btn);

  console.log("[WebUI X] Body script loaded: Floating button added.");
});
```

#### Example Body Script 2 – Auto Dark Mode

File:

```
/data/adb/.config/<id>/js/body/dark-mode.js
```

```js
// Example body script: Force dark mode
window.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundColor = "#1e1e2e";
  document.body.style.color = "#f8f8f2";

  // Invert all images (optional)
  document.querySelectorAll("img").forEach((img) => {
    img.style.filter = "invert(1) hue-rotate(180deg)";
  });

  console.log("[WebUI X] Body script loaded: Dark mode applied.");
});
```

#### Example Body Script 3 – Auto-Hide Sidebar

File:

```
/data/adb/.config/<id>/js/body/hide-sidebar.js
```

```js
// Example body script: Hide sidebar by default
window.addEventListener("DOMContentLoaded", () => {
  let sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.style.display = "none";

    // Add a toggle button
    let toggle = document.createElement("button");
    toggle.textContent = "Toggle Sidebar";
    toggle.style.position = "fixed";
    toggle.style.top = "20px";
    toggle.style.left = "20px";
    toggle.onclick = () => {
      sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
    };
    document.body.appendChild(toggle);

    console.log("[WebUI X] Body script loaded: Sidebar toggle added.");
  }
});
```

### Body Module Script Example (`.mjs`)

File:

```
/data/adb/.config/<id>/js/body/example-module.mjs
```

```js
// Example module script using ES modules
import { greet } from "./greet-helper.mjs";

window.addEventListener("DOMContentLoaded", () => {
  greet("WebUI X Portable (module script)");
});
```

And a helper file:

```
/data/adb/.config/<id>/js/body/greet-helper.mjs
```

```js
// Example helper module
export function greet(name) {
  console.log(`[WebUI X] Hello from ${name}!`);
  alert(`Greetings from ${name}!`);
}
```

When `example-module.mjs` runs, it imports `greet()` from `greet-helper.mjs` and calls it.

## Using Eruda (Dev Console)

WebUI X Portable includes **Eruda**, a lightweight developer console, for debugging:

1. Open **Eruda Console**.
2. Inspect elements to find their **class names, IDs, or attributes**.
3. Use this info when writing **CSS rules** or **JavaScript selectors**.

## Example Workflow

1. Navigate to:

   ```
   /data/adb/.config/<id>/
   ```

2. Edit or create:

   - `style/patch.css` for CSS.
   - `js/head/*.js` or `*.mjs` for head scripts.
   - `js/body/*.js` or `*.mjs` for body scripts.

3. Restart or refresh WebUI X Portable.
4. Verify your changes using **Eruda Console**.

## Tips

- Place each script in its **own file** (`*.js`, `*.cjs`, `*.mjs`) for better management.
- `.js` and `.cjs` are injected as classic scripts, `.mjs` as ES modules.
- Use `console.log()` inside your scripts — messages appear in **Eruda Console** for debugging.
- Always wrap DOM manipulations in `window.addEventListener("DOMContentLoaded", …)` when using **body scripts**.
- Use `!important` in CSS if your styles are overridden by defaults.
- Changes are **instance-specific**; multiple `<id>` folders may need identical patches.
