# WebUI X Config Documentation

The `WebUIConfig` class defines the configuration settings for the WebUI. Below is a detailed explanation of each property.

Location: `/data/adb/modules/<ID>/webroot/config.json`

## Properties

### `require`

- **Type**: `WebUIConfigRequire`
- **Description**: Specifies the required configuration settings for the WebUI. This includes mandatory parameters needed for the WebUI to function correctly.
- **Default Value**: `WebUIConfigRequire()`

### `permissions`

- **Type**: `List<String>`
- **Description**: A list of permissions required by the WebUI. These permissions are represented as strings.
- **Default Value**: `emptyList()`

### `historyFallback`

- **Type**: `Boolean`
- **Description**: Indicates whether the application should fall back to using history in case of certain failures or conditions.
- **Default Value**: `false`

### `title`

- **Type**: `String?`
- **Description**: The title of the configuration. This is an optional property and can be `null`.
- **Default Value**: `null`

### `icon`

- **Type**: `String?`
- **Description**: The icon associated with the configuration. This is an optional property and can be `null` if no icon is specified.
- **Default Value**: `null`

### `windowResize`

- **Type**: `Boolean`
- **Description**: Indicates whether the application window can be resized. If set to `true`, the window resizing feature is enabled.
- **Default Value**: `true`

### `backHandler`

- **Type**: `Boolean`
- **Description**: Indicates whether the back button handler is enabled. When set to `true`, the application will handle back button presses.
- **Default Value**: `true`

### `exitConfirm`

- **Type**: `Boolean`
- **Description**: Indicates whether a confirmation dialog should be displayed before exiting the application. If set to `true`, the user will be prompted to confirm their action before the application exits.
- **Default Value**: `true`

### `historyFallbackFile`

- **Type**: `String`
- **Description**: The name of the fallback file to be used for history-based routing. Typically used in single-page applications (SPAs) to serve a default file (e.g., "index.html") when a route does not match any static files.
- **Default Value**: `"index.html"`

## Nested Classes

### `WebUIConfigRequire`

- **Description**: Represents the required configuration settings for the WebUI.
- **Properties**:
  - `version`: An instance of `WebUIConfigRequireVersion` that specifies the version requirements for the WebUI.

### `WebUIConfigRequireVersion`

- **Description**: Represents the required version configuration for the WebUI.
- **Properties**:
  - `required`: Specifies the required value for this configuration. Default is `1`.
  - `supportText`: Optional text providing additional support information or guidance. Can be `null`.
  - `supportLink`: A nullable string representing the support link. Can be used to provide a URL or contact information for support purposes.

## Example Usage

```json
{
  "require": {
    "version": {
      "required": 2,
      "supportText": "Please update to the latest version.",
      "supportLink": "https://support.example.com"
    }
  },
  "permissions": ["webui.permission.PLUGIN_DEX_LOADER", "webui.permission.DSL_DEX_LOADING"],
  "historyFallback": true,
  "title": "My WebUI",
  "icon": "icon.png",
  "windowResize": true,
  "backHandler": true,
  "exitConfirm": true,
  "historyFallbackFile": "fallback.html"
}
```
