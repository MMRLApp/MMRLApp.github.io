# WebUI X Config Documentation

The `WebUIConfig` class defines the configuration settings for the WebUI. Below is a detailed explanation of each property.

Location: `/data/adb/modules/<ID>/webroot/config.json`

## Example Usage

```jsonc
{
  "require": {
    /**
      "packages" is available from following apps:
      - MMRL version code 33633
      - WebUI X Portable version code 29
    */
    "packages": [
      {
        "code": 33624,
        "packageName": ["com.dergoogler.mmrl", "com.dergoogler.mmrl.debug"],
        "supportText": "Update",
        "supportLink": "https://github.com/MMRLApp/MMRL/releases"
      },
      {
        "code": 26,
        "packageName": "com.dergoogler.mmrl.wx",
        "supportText": "Update",
        "supportLink": "https://github.com/MMRLApp/WebUI-X-Portable/releases"
      }
    ],
    /**
      "version" is deprecated from following apps:
      - MMRL version code 33633
      - WebUI X Portable version code 29
    */
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
