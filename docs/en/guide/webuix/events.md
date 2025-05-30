# WebUI X Events

WebUI X offers a flexible event system that enables your modules to handle UI states, navigation, and custom actions. This system empowers developers to create interactive and responsive user experiences within their modules.

## Availability

> [!IMPORTANT]
> **WebUI X Events** are currently in active development.  
> Feature support varies by platform:
>
> - **MMRL**: Supported from `v33661`
> - **KernelSU Next**: Not supported
> - **WebUI X: Portable**: Not supported
> - **SukiSU Ultra**: Not supported

## Enabling Event Handling

To enable event handling in your module, add the following options to your configuration file:

```jsonc
{
  // Enables default back button handling (ignored if `backInterceptor` is set)
  "backHandler": true,
  // Use JavaScript to control back button behavior
  "backInterceptor": "javascript"
}
```

- **`backHandler`**: Enables the default back button handler.
- **`backInterceptor`**: Allows you to intercept and handle back events in JavaScript. If both are set, `backInterceptor` takes precedence.

## Usage Example

You can listen for events using the `WXEvent` API from the `webuix` package. Below are examples for handling the back button and custom pause actions:

```javascript
import { WXEventHandler } from "webuix";

// Initialize the event system (recommended for best compatibility)
window.wx = new WXEventHandler()

// Handle back event for a specific element (e.g., appDetails)
wx.on(appDetails, "back", (event) => {
  if (appDetails.open) {
    event.stopImmediatePropagation();
    appDetails.open = false; // Close the details panel
  }
});

// Handle back event at the window level
wx.on(window, "back", (event) => {
  const appDetails = document.getElementById("appDetails");

  if (appDetails?.open) {
    appDetails.open = false;
    return;
  }

  if (confirm("Close the app?")) {
    webui.exit(); // Exit the WebUI app
  }
});

// Example: Listen for a custom pause event (replace with your own logic)
wx.on(window, "pause", (event) => {
  focusInput.focus();
  statusEl.textContent = 'App paused - input focused';
  statusEl.style.color = getCssVar('error');
});

// Listen for resume events
wx.on(window, "resume", (event) => {
    statusEl.textContent = 'App resumed';
    statusEl.style.color = getCssVar('success');
    // Add any additional logic needed when the app resumes
});

// If you have nested scroll elements you may need to handle it on the JavaScript side
wx.on(window, 'refresh', () => {
    webui.setRefreshing(true);

    if (confirm("Do you really wanna refresh the page?")) {
        location.reload()
    }

    webui.setRefreshing(false);
});
```

### How It Works

- The first handler listens for the `back` event on a specific element (`appDetails`). If the panel is open, it closes it and prevents the event from propagating further.
- The second handler listens for the `back` event on the `window`. If no panels are open, it prompts the user to confirm exiting the app.
- The third handler demonstrates listening for a custom `pause` event, updating UI elements as needed.

---

## Notes

- If both `backHandler` and `backInterceptor` are set, `backInterceptor` will override the default handler.
- Use `event.stopImmediatePropagation()` to prevent other handlers from executing for the same event.
- The event system is designed to give you fine-grained control over navigation and state transitions in your WebUI modules.