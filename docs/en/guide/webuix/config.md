# WebUI X Config Documentation

The `WebUIConfig` class defines the configuration settings for the WebUI. Below is a detailed explanation of each property.

Location: `/data/adb/modules/<ID>/webroot/config.json`

## Example Usage

```jsonc
{
  "require": {
    "packages": [
      {
        /* required */ "code": 33624,
        /* required */ "packageName": ["com.dergoogler.mmrl", "com.dergoogler.mmrl.debug"],
        "supportText": "Update",
        "supportLink": "https://github.com/MMRLApp/MMRL/releases"
      },
      {
        /* required */ "code": 26,
        /* required */ "packageName": "com.dergoogler.mmrl.wx",
        "supportText": "Update",
        "supportLink": "https://github.com/MMRLApp/WebUI-X-Portable/releases"
      }
    ],
    // Deprecated
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
