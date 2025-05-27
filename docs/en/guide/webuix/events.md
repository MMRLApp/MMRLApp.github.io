# WebUI X Events

Events to help you handle states and navigation.

**Availability**

> [!IMPORTANT]
> This feature is in active development.

- MMRL from `v33659`
- KernelSU Next ❌
- WebUI X: Portable ❌
- SukiSU Ultra ❌

_Enable_

```jsonc
{
    // to enable `wxBack`
    "backHandler": "js"
}
```

```JavaScript
// Handle incoming messages and dispatch them as events on `window`
window.addEventListener("message", ({ data }) => {
    console.log("Data received", data);
    const event = new CustomEvent(data, { detail: data });
    window.dispatchEvent(event);
});

// Listen for "wxBack" event
window.addEventListener("wxBack", () => {
    console.log("Called backEvent");
    const p = prompt("Type 'leave' to close");

    if (p === "leave") {
        webui.exit();
    } else {
        alert("Seems that you can't type bro");
    }
});

// Listen for "wxPause" event
window.addEventListener("wxPause", () => {
    console.log("Called resumeEvent");
    alert("Oh, hey! You're back?");
});

```
