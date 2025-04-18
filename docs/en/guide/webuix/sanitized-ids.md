### Sanitized Module in WebUI

The `sanitizedModId` is a property in the `WebUIOptions` class that provides a sanitized version of the `modId` string. This sanitized version ensures that the module ID is safe for use in contexts like file names, JavaScript interfaces, or other identifiers where special characters might cause issues.

The `sanitizedModId` is derived by replacing all characters in the `modId` that are not alphanumeric, underscores (`_`), or dots (`.`) with underscores (`_`). This ensures compatibility and avoids potential errors when the `modId` is used in various parts of the application.

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