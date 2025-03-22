# WebUI Dex Plugins

## Overview

Offering a framework to extend the WebUI experience with custom functionality. It enables developers to build, set up, and use custom plugins within a WebUI project.

Example plugin: [MMRLApp/webui-dex-template](https://github.com/MMRLApp/webui-dex-template)

## Building the Plugin

To build the plugin, execute the following command:

```shell
gradlew build-dex
```

This command compiles the necessary code and generates `.dex` files, which can be used within your WebUI project.

## Setting Up the Plugins

To set up the plugin integration, follow these steps:

1. **Create the `config.mmrl.json` File**: 
   Create a file named `config.mmrl.json` within the `/data/adb/modules/<MODID>/webroot` directory. This file specifies the plugins to be loaded into the WebUI.

2. **Place Plugin Files**: 
   Ensure that the associated `.dex`, `.jar`, or `.apk` plugin files are placed in the `/data/adb/modules/<MODID>/webroot/plugins` directory.

Here’s an example `config.mmrl.json` file:

```json
{
  "plugins": [
    "dev.mmrl.webui.dialog.DialogPluginKt"
  ]
}
```

Replace `<MODID>` with the actual identifier for your module.

## Using the Plugins in WebUI

After the plugin setup is complete, you can start utilizing the custom functionalities in your WebUI interface.

### Example: Creating a Custom Dialog with a Callback

To create a custom dialog that responds to user input, you can use the `dialog` plugin. The following example shows how to build a dialog with a positive button that triggers a callback when clicked:

```js
const builder = window.dialog;

window.dialog.positive = () => {
  console.log("Pressed the dialog button!");
};

builder.setTitle("Test");
builder.setMessage("This is a custom dialog");
builder.setPositiveButton("Log me!", "positive");
builder.show();
```

In this example, clicking the "Log me!" button triggers a callback that logs a message to the console.

## Plugin Code Example


::: code-group

```kotlin [DialogPlugin.kt]
package dev.mmrl.webui.dialog

import com.dergoogler.webui.plugin.Instance
import com.dergoogler.webui.plugin.Plugin

fun instance(plugin: Plugin): Instance {
    return Instance(
        name = "dialog",
        instance = Dialog(plugin),
    )
}
```

```kotlin [Dialog.kt]
package dev.mmrl.webui.dialog

import android.app.Activity
import android.app.AlertDialog
import android.webkit.JavascriptInterface
import com.dergoogler.webui.plugin.Plugin

class Dialog(plugin: Plugin) {
    private val activity = plugin.context as Activity
    private val webView = plugin.webView
    private val dialogBuilder = AlertDialog.Builder(activity)

    @JavascriptInterface
    fun setTitle(title: String) {
        dialogBuilder.setTitle(title)
    }


    @JavascriptInterface
    fun setMessage(message: String) {
        dialogBuilder.setMessage(message)
    }

    @JavascriptInterface
    fun setPositiveButton(text: String, callbackName: String) {
        dialogBuilder.setPositiveButton(text) { _, _ ->
            webView.post {
                webView.loadUrl("javascript:window.dialog.$callbackName()")
            }
        }
    }

    @JavascriptInterface
    fun setNegativeButton(text: String, callbackName: String) {
        dialogBuilder.setNegativeButton(text) { _, _ ->
            webView.post {
                webView.loadUrl("javascript:window.dialog.$callbackName()")
            }
        }
    }

    @JavascriptInterface
    fun show() {
        activity.runOnUiThread {
            dialogBuilder.show()
        }
    }
}
```

:::