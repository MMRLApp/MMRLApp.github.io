# `MMRLInterface` Documentation

## Overview
The `MMRLInterface` class provides access to the MMRL (Modular Mobile Runtime Library) interface, offering a range of functions for interacting with the Android environment. This includes window management, navigation status, file system access, sharing text, and more. It extends the `MMRLObjectAccessor` class and provides enhanced functionality specific to MMRL integration.

### Access Control
The `MMRLInterface` class is designed to work within the MMRL framework, and some features may only be accessible if certain permissions or conditions are met, such as granting access to the file system or the advanced kernel SU API.

## Methods

### `MMRLInterface.injectStyleSheets()`
Injects the required stylesheets into the document head to ensure proper styling for MMRL elements.

#### Example:
```javascript
mmrl.injectStyleSheets();
```

---

### `MMRLInterface.manager`
Gets the manager information, which includes the name, version name, and version code.

#### Returns:
- `Manager | null`: The manager information or null if not available.

#### Example:
```javascript
console.log(mmrl.manager);
```

---

### `MMRLInterface.mmrl`
Gets the MMRL information, including various settings related to the runtime environment.

#### Returns:
- `Manager | null`: The MMRL information or null if not available.

#### Example:
```javascript
console.log(mmrl.mmrl);
```

---

### `MMRLInterface.hasAccessToFileSystem`
Checks if the interface has access to the file system.

#### Returns:
- `boolean`: `true` if access to the file system is available, `false` otherwise.

#### Example:
```javascript
console.log(mmrl.hasAccessToFileSystem);
```

---

### `MMRLInterface.hasAccessToAdvancedKernelSuAPI`
Checks if the interface has access to the advanced kernel SU API.

#### Returns:
- `boolean`: `true` if access is available, `false` otherwise.

#### Example:
```javascript
console.log(mmrl.hasAccessToAdvancedKernelSuAPI);
```

---

### `MMRLInterface.windowTopInset`
Gets the top inset value for the window.

#### Returns:
- `number`: The top inset value.

#### Example:
```javascript
console.log(mmrl.windowTopInset);
```

---

### `MMRLInterface.windowBottomInset`
Gets the bottom inset value for the window.

#### Returns:
- `number`: The bottom inset value.

#### Example:
```javascript
console.log(mmrl.windowBottomInset);
```

---

### `MMRLInterface.lightNavigationBars`
Checks if the navigation bars are in a light theme.

#### Returns:
- `boolean`: `true` if the navigation bars are light, `false` otherwise.

#### Example:
```javascript
console.log(mmrl.lightNavigationBars);
```

---

### `MMRLInterface.darkMode`
Checks if the dark mode is enabled.

#### Returns:
- `boolean`: `true` if dark mode is enabled, `false` otherwise.

#### Example:
```javascript
console.log(mmrl.darkMode);
```

---

### `MMRLInterface.lightNavigationBars` (Setter)
Sets the navigation bars to light or dark.

#### Parameters:
- `light`: `true` to set the navigation bars to light, `false` for dark.

#### Example:
```javascript
mmrl.lightNavigationBars = true;
```

---

### `MMRLInterface.lightStatusBars`
Checks if the status bars are in a light theme.

#### Returns:
- `boolean`: `true` if the status bars are light, `false` otherwise.

#### Example:
```javascript
console.log(mmrl.lightStatusBars);
```

---

### `MMRLInterface.lightStatusBars` (Setter)
Sets the status bars to light or dark.

#### Parameters:
- `light`: `true` to set the status bars to light, `false` for dark.

#### Example:
```javascript
mmrl.lightStatusBars = true;
```

---

### `MMRLInterface.sdk`
Gets the SDK version.

#### Returns:
- `number`: The SDK version.

#### Example:
```javascript
console.log(mmrl.sdk);
```

---

### `MMRLInterface.shareText(text: string, type?: MimeType)`
Shares the specified `text` with an optional MIME type.

#### Parameters:
- `text`: The text to share.
- `type` (optional): The MIME type of the text (e.g., `"text/plain"`).

#### Example:
```javascript
mmrl.shareText("Hello, world!");
mmrl.shareText("Hello, world!", "text/plain");
```

---

### `MMRLInterface.requestAdvancedKernelSUAPI()`
Requests access to the advanced kernel SU API. This requires MMRL version `33045` or higher.

#### Example:
```javascript
mmrl.requestAdvancedKernelSUAPI();
```

---

### `MMRLInterface.requestFileSystemAPI()`
Requests access to the file system API, which is required for file operations. This requires MMRL version `33045` or higher.

#### Example:
```javascript
mmrl.requestFileSystemAPI();
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
const mmrl = MMRLInterfaceFactory("net-switch");
mmrl.injectStyleSheets();
```