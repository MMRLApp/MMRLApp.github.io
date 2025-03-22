## Permissions in WebUI

Adding new permission to your WebUI

`config.mmrl.json`

```jsonc
{
    "permissions": [
        "webui.permission.PLUGIN_DEX_LOADER", // ability to load dex to add new JavaScript interfaces
        "webui.permission.ERUDA" // to allow the user load eruda into the WebUI
        "webui.permission.FILESYSTEM" // access to the FileSystem API
    ]
}

```

