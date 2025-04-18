# What is WebUI X?

WebUI X is an innovative way to manage WebUIs across different managers like KernelSU, MMRL, APatch, and more.

The KernelSU developers first introduced this feature in [v0.8.1](https://github.com/tiann/KernelSU/releases/tag/v0.8.1), providing developers with a new way to configure their modules.

MMRL extended WebUI support in [v32666](https://github.com/MMRLApp/MMRL/releases/tag/v5.27.36), adding features like dynamic theming (Monet), file system access, and many more.

## Setting Up WebUI X in a Manager

To use WebUI X, your manager must support Jetpack Compose. Without Compose, WebUI X will not function.

### Add Required Dependencies

Add the following dependencies to your project:

```kts
implementation("com.github.MMRLApp.MMRL:platform:a0c8fd3785")
implementation("com.github.MMRLApp.MMRL:webui:a0c8fd3785")
```

> **Note:**  
> The `a0c8fd3785` is a commit hash used to fetch the dependencies.  
> You can also choose other builds from [JitPack](https://jitpack.io/#MMRLApp/MMRL/).

---

## Setting Up the Activity

If your manager is a root manager, you may need to build a custom provider, similar to KernelSU/Next. You can configure it according to your requirements.

### Example Code

Below is an example implementation of `WebUIActivity` and a custom provider (`KsuLibSuProvider`):

::: code-group

```kotlin [WebUIActivity.kt]
package com.rifsxd.ksunext.ui.webui

import android.annotation.SuppressLint
import android.app.ActivityManager
import android.os.Build
import android.os.Bundle
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.lifecycleScope
import com.dergoogler.mmrl.platform.Platform
import com.dergoogler.mmrl.platform.service.ServiceManagerCompat
import com.dergoogler.mmrl.webui.component.Loading
import com.dergoogler.mmrl.webui.model.JavaScriptInterface
import com.dergoogler.mmrl.webui.screen.WebUIScreen
import com.dergoogler.mmrl.webui.util.rememberWebUIOptions
import com.rifsxd.ksunext.BuildConfig
import com.rifsxd.ksunext.ui.theme.KernelSUTheme
import com.rifsxd.ksunext.ui.util.KsuLibSuProvider
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@SuppressLint("SetJavaScriptEnabled")
class WebUIActivity : ComponentActivity() {
    private lateinit var webviewInterface: WebViewInterface
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        webView = WebView(this)

        lifecycleScope.launch {
            Platform.init {
                context = baseContext
                platform = Platform.KsuNext
                fromProvider = ServiceManagerCompat.from(
                    KsuLibSuProvider(
                        context = baseContext,
                        platform = Platform.KsuNext
                    )
                )
            }
        }

        val moduleId = intent.getStringExtra("id")!!
        val name = intent.getStringExtra("name")!!

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            @Suppress("DEPRECATION")
            setTaskDescription(ActivityManager.TaskDescription("KernelSU - $name"))
        } else {
            val taskDescription = ActivityManager.TaskDescription.Builder()
                .setLabel("KernelSU - $name")
                .build()
            setTaskDescription(taskDescription)
        }

        val prefs = getSharedPreferences("settings", MODE_PRIVATE)

        setContent {
            KernelSUTheme {
                var isLoading by remember { mutableStateOf(true) }

                LaunchedEffect(Platform.isAlive) {
                    while (!Platform.isAlive) {
                        delay(1000)
                    }
                    isLoading = false
                }

                if (isLoading) {
                    Loading()
                    return@KernelSUTheme
                }

                val webDebugging = prefs.getBoolean("enable_web_debugging", false)
                val dark = isSystemInDarkTheme()

                val options = rememberWebUIOptions(
                    modId = moduleId,
                    debug = webDebugging,
                    appVersionCode = BuildConfig.VERSION_CODE,
                    isDarkMode = dark,
                )

                WebUIScreen(
                    webView = webView,
                    options = options,
                    interfaces = listOf(
                        JavaScriptInterface(
                            name = "ksu",
                            instance = WebViewInterface(
                                context = this@WebUIActivity,
                                webView = webView,
                                modDir = "/data/adb/modules/$moduleId"
                            ),
                        )
                    )
                )
            }
        }
    }
}
```

```kotlin [KsuLibSuProvider.kt]
package com.rifsxd.ksunext.ui.util

import android.content.Context
import android.content.ServiceConnection
import com.dergoogler.mmrl.platform.Platform
import com.dergoogler.mmrl.platform.service.IProvider
import com.dergoogler.mmrl.platform.service.ServiceManagerCompat.getPlatformIntent
import com.topjohnwu.superuser.Shell
import com.topjohnwu.superuser.ipc.RootService
import kotlinx.coroutines.suspendCancellableCoroutine

class KsuLibSuProvider(
    private val context: Context,
    private val platform: Platform,
) : IProvider {
    override val name = "KsuLibSu"

    override fun isAvailable() = true

    override suspend fun isAuthorized() = rootAvailable()

    override fun bind(connection: ServiceConnection) {
        RootService.bind(getPlatformIntent(context, platform), connection)
    }

    override fun unbind(connection: ServiceConnection) {
        RootService.stop(getPlatformIntent(context, platform))
    }
}
```

:::

---

This guide should help you set up WebUI X in your manager with ease. If you encounter any issues, refer to the official documentation or community forums for support.
