# `MMRLInterface` Documentation

## Overview

The `MMRLInterface` class provides access to the MMRL interface, offering a range of functions for interacting with the Android environment. This includes window management, navigation status, file system access, sharing text, and more. It extends the `MMRLObjectAccessor` class and provides enhanced functionality specific to MMRL integration.

### Access Control and Module ID Sanitization

The `MMRLInterface` class is designed to work within the MMRL framework, and some features may only be accessible if certain permissions or conditions are met, such as granting access to the file system or the advanced kernel SU API.

The `MMRLInterface` is accessed from JavaScript via the module ID, which is sanitized before use. Any characters in the module ID that do not match the regex pattern `[a-zA-Z0-9._-]` are replaced with an underscore (`_`).

The regex used to sanitize the module ID is as follows:

```regex
[^a-zA-Z0-9._-]
```

This means that characters like spaces or special symbols will be replaced with an underscore (`_`).

### Setup 

```js
import { MMRLInterface } from "mmrl"

const module = new MMRLInterface("mmrl_wpd")
```


## Methods

### `module.injectStyleSheets()`

Injects the required stylesheets into the document head to ensure proper styling for MMRL elements.

#### Example:

```javascript
module.injectStyleSheets();
```

---

### `module.manager`

Gets the manager information, which includes the name, version name, and version code.

#### Returns:

- `Manager | null`: The manager information or null if not available.

#### Example:

```javascript
console.log(module.manager);
```

---

### `module.mmrl`

Gets the MMRL information, including various settings related to the runtime environment.

#### Returns:

- `Manager | null`: The MMRL information or null if not available.

#### Example:

```javascript
console.log(module.mmrl);
```

---

### `module.hasAccessToFileSystem`

Checks if the interface has access to the file system.

#### Returns:

- `boolean`: `true` if access to the file system is available, `false` otherwise.

#### Example:

```javascript
console.log(module.hasAccessToFileSystem);
```

---

### `module.hasAccessToAdvancedKernelSuAPI`

Checks if the interface has access to the advanced kernel SU API.

#### Returns:

- `boolean`: `true` if access is available, `false` otherwise.

#### Example:

```javascript
console.log(module.hasAccessToAdvancedKernelSuAPI);
```

---

### `module.windowTopInset`

Gets the top inset value for the window.

#### Returns:

- `number`: The top inset value.

#### Example:

```javascript
console.log(module.windowTopInset);
```

---

### `module.windowBottomInset`

Gets the bottom inset value for the window.

#### Returns:

- `number`: The bottom inset value.

#### Example:

```javascript
console.log(module.windowBottomInset);
```

---

### `module.lightNavigationBars`

Checks if the navigation bars are in a light theme.

#### Returns:

- `boolean`: `true` if the navigation bars are light, `false` otherwise.

#### Example:

```javascript
console.log(module.lightNavigationBars);
```

---

### `module.darkMode`

Checks if the dark mode is enabled.

#### Returns:

- `boolean`: `true` if dark mode is enabled, `false` otherwise.

#### Example:

```javascript
console.log(module.darkMode);
```

---

### `module.lightNavigationBars` (Setter)

Sets the navigation bars to light or dark.

#### Parameters:

- `light`: `true` to set the navigation bars to light, `false` for dark.

#### Example:

```javascript
module.lightNavigationBars = true;
```

---

### `module.lightStatusBars`

Checks if the status bars are in a light theme.

#### Returns:

- `boolean`: `true` if the status bars are light, `false` otherwise.

#### Example:

```javascript
console.log(module.lightStatusBars);
```

---

### `module.lightStatusBars` (Setter)

Sets the status bars to light or dark.

#### Parameters:

- `light`: `true` to set the status bars to light, `false` for dark.

#### Example:

```javascript
module.lightStatusBars = true;
```

---

### `module.sdk`

Gets the SDK version.

#### Returns:

- `number`: The SDK version.

#### Example:

```javascript
console.log(module.sdk);
```

---

### `module.shareText(text: string, type?: MimeType)`

Shares the specified `text` with an optional MIME type.

#### Parameters:

- `text`: The text to share.
- `type` (optional): The MIME type of the text (e.g., `"text/plain"`).

#### Example:

```javascript
module.shareText("Hello, world!");
module.shareText("Hello, world!", "text/plain");
```

---

### `module.requestAdvancedKernelSUAPI()`

Requests access to the advanced kernel SU API. This requires MMRL version `33045` or higher.

#### Example:

```javascript
module.requestAdvancedKernelSUAPI();
```

---

### `module.requestFileSystemAPI()`

Requests access to the file system API, which is required for file operations. This requires MMRL version `33045` or higher.

#### Example:

```javascript
module.requestFileSystemAPI();
```

## Factory Function

### `MMRLInterfaceFactory(scope: ObjectScope, options?: MMRLInterfaceOptions)`

Creates an instance of the `MMRLInterface` class.

#### Parameters:

- `scope`: The scope to initialize the MMRLInterface with.
- `options` (optional): Additional options such as whether to skip scope parsing (`noScopeParse`).

#### Returns:

- `MMRLInterface`: The created MMRLInterface instance.

#### Example:

```javascript
const module = MMRLInterfaceFactory("net-switch");
module.injectStyleSheets();
```
