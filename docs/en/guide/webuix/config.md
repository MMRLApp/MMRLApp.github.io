# `config.json` — WebUI X Configuration

`config.json` defines the configuration for the WebUI X modules in your system. It is parsed using [Moshi](https://github.com/square/moshi) into a strongly-typed Kotlin data class, allowing flexible and safe management of WebUI X behaviors, permissions, and dynamic dex loading.

- `/data/adb/modules/<ID>/webroot/config.json`
- `/data/adb/modules/<ID>/webroot/config.mmrl.json`

## Overview

The config file controls essential WebUI X features like:

- Minimum required versions and packages
- Permissions granted to the UI
- Window and navigation behavior
- Security policies
- Dynamic loading of additional dex or apk files
- UI metadata like title and icon

## JSON Structure

```json
{
  "modId": "string",
  "require": {
    "packages": [
      {
        "code": -1,
        "packageName": "string or array of strings",
        "supportText": "string",
        "supportLink": "string"
      }
    ]
  },
  "permissions": ["string", "..."],
  "historyFallback": false,
  "title": "string",
  "icon": "string",
  "windowResize": true,
  "backHandler": true,
  "backInterceptor": null,
  "refreshInterceptor": "string",
  "exitConfirm": true,
  "pullToRefresh": false,
  "historyFallbackFile": "index.html",
  "autoStatusBarsStyle": true,
  "dexFiles": [
    {
      "type": "dex | apk",
      "path": "string",
      "className": "string",
      "cache": true,
    }
  ],
  "killShellWhenBackground": true,
  "contentSecurityPolicy": "string",
  "caching": true,
  "cachingMaxAge": 86400
}
```

## Properties

### `require`

_object_ — Requirements for WebUI X compatibility.

- `packages` — List of required package sets with optional support info.

  - `code` (int, default -1) — Status or error code associated.
  - `packageName` (string or string array) — Package(s) required.
  - `supportText` (string, optional) — Message to display regarding package.
  - `supportLink` (string, optional) — URL for more info on package requirements.

### `permissions`

_string\[]_ — List of permission strings granted to the WebUI X instance, e.g., `"wx.permission.ROOT_PATH"`.

### `historyFallback`

_boolean_ — If `true`, fallback to the `historyFallbackFile` when URL not found. Default `false`.

### `title`

_string_ — Title displayed in the WebUI X or shortcut.

### `icon`

_string_ — Path relative to the module's webroot pointing to the icon file used for shortcuts or UI.

### `windowResize`

_boolean_ — Enables window resizing behavior. Default `true`.

### `backHandler`

_boolean?_ — Enables handling back button presses internally. Default `true`.

### `backInterceptor`

_any_ — Custom logic or object for intercepting back presses. Usually null.

### `refreshInterceptor`

_string?_ — Type of refresh interceptor used; `"javascript"` or `"native"`.

### `exitConfirm`

_boolean_ — Enable confirmation dialog before exiting. Default `true`.

### `pullToRefresh`

_boolean_ — Enables pull-to-refresh gesture. Default `false`.

### `historyFallbackFile`

_string_ — Filename fallback for history navigation. Default `"index.html"`.

### `autoStatusBarsStyle`

_boolean_ — Automatically style Android status bars. Default `true`.

### `dexFiles` <Badge type="danger" text="Since v53"/> <Badge type="warning" text="Stable on v108"/>

_array of objects_ — Specifies external `.dex` or `.apk` files to load additional JavaScript interfaces dynamically.

Each object includes:

- `type`: `"dex"` or `"apk"` — File type.
- `path`: Path to the `.dex` or `.apk` file (relative to module root).
- `className`: Fully qualified Java class name to load from the dex/apk.
- `cache`: Boolean to enable caching of loaded interface instances. Default `true`.
  - If you try to load any native library (`*.so`) be aware that you always need `cache` to `true`

### `killShellWhenBackground` <Badge type="warning" text="Since v96"/>

_boolean_ — Whether to terminate shell processes when app goes to background. Default `true`.

### `contentSecurityPolicy` <Badge type="warning" text="Since v181"/>

_string_ — Content Security Policy header for WebUI X. Supports placeholders like `{domain}`.

Default value:

```txt
default-src 'self' data: blob: {domain};
script-src 'self' 'unsafe-inline' 'unsafe-eval' {domain};
style-src 'self' 'unsafe-inline' {domain};
connect-src *
```

### `caching` <Badge type="warning" text="Since v181"/>

_boolean_ — Enables caching of WebUI X resources. Default `true`.

### `cachingMaxAge` <Badge type="warning" text="Since v181"/>

_int_ — Maximum cache age in seconds. Default `86400` (24 hours).
