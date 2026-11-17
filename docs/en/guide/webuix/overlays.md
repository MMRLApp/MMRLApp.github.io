# Overlay System

The **WebUI X Overlay System** enables developers to build floating, system-wide overlays using standard HTML, CSS, and JavaScript. Overlays render directly on top of Android apps and games while keeping the underlying screen visible and responsive to user touch.

Unlike traditional full-screen WebViews that block all screen interaction, WebUI X automatically manages background transparency, touch hit-testing, and keyboard focus based on your DOM layout.

|                                                  Demo 1                                                  |                                                  Demo 2                                                  |
| :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <video controls width="100%"><source src="/assets/videos/overlay-demo-1.webm" type="video/webm"></video> | <video controls width="100%"><source src="/assets/videos/overlay-demo-2.webm" type="video/webm"></video> |

> Source code: https://github.com/WebUIX/WebUI-Demo

## Launching an Overlay

Only **one overlay can be active at a time**. You can launch your overlay programmatically via the WebUI bridge:

```javascript
webui.launchOverlay("./relative/path", 0.8);
```

- **Entry Point:** The relative path must point to a directory containing an `index.html` file.
- **Alpha Parameter:** The second parameter (`0.8`) defines the window alpha (opacity).

> **Android 12+ Touch Pass-Through Restriction:**
> Since Android 12, the system enforces security constraints that can restrict touch pass-through if a window's opacity or obscuring level exceeds default thresholds. If touches fail to pass through to underlying apps, you can lift this restriction using the following root command:
>
> ```bash
> su -c 'settings put global maximum_obscuring_opacity_for_touch 1.0'
>
> ```

## Core Capabilities

### Automatic Screen Pass-Through (Touch Regions)

Your overlay runs on a full-screen transparent canvas, but only visible, interactive elements capture touch events. Everywhere else, taps, swipes, and gestures pass directly through to the underlying Android app.

- **Automatic Hit-Testing:** Every visible element inside `<body>` automatically registers as a touch-blocking region.
- **Real-Time Layout Tracking:** Moving, resizing, showing, or hiding elements (via CSS transitions, animations, dragging, or the `hidden` attribute) dynamically updates active touch regions in real time.
- **Fixed & Shadow DOM Support:** Elements styled with `position: fixed` or encapsulated inside a Web Component's `shadowRoot` are tracked automatically.
- **Overflow Clipping:** Child elements inside containers with `overflow: hidden`, `scroll`, or `auto` are clipped to their parent's visible bounds so off-screen content never blocks touches invisibly.

### Controlling Touch Behavior

You can control exactly which parts of your UI intercept touches and which allow touches to pass through:

| Method                                              | Touch Behavior         | Best Used For                                                          |
| --------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| **Default visible element**                         | Captures touches       | Buttons, cards, toolbars, draggable windows                            |
| `pointer-events: none` (CSS)                        | Passes touches through | Non-interactive HUDs, FPS counters, watermarks, decorative layers      |
| `notouch` or `notouch="true"` (Attribute)           | Passes touches through | Layout wrappers holding spaced-out buttons without blocking empty gaps |
| `display: none` / `[hidden]` / `visibility: hidden` | Passes touches through | Minimized windows, closed modals, hidden drawers                       |

> **Layout Tip:** If you use a full-screen flexbox or grid container to position widgets in opposite corners of the screen, add `pointer-events: none` (or `notouch`) to the container and `pointer-events: auto` to the widgets. Otherwise, the container's bounding box will block touches across the entire screen.

### Automatic Soft Keyboard & Focus Management

Standard Android overlays often either steal focus permanently (preventing users from typing in background apps) or fail to open the keyboard when needed. WebUI X handles window focus automatically:

- **Non-Intrusive Interaction:** Tapping buttons, toggles, sliders, or draggable window headers does **not** steal focus from the underlying app.
- **On-Demand Keyboard:** Focusing a text-entry element (`<input type="text">`, `<textarea>`, `<select>`, `<iframe>`, or `contenteditable`) automatically requests window focus so the Android soft keyboard appears.
- **Automatic Focus Release:** Tapping outside the input field or blurring it releases focus back to the underlying app immediately.

### Environment

It runs the MX Engine with some restrictions since it is activityless.

**Unavailable APIs in Overlays:**

- `ksu.fullScreen()`
- `fs.openFileChooser()`
- `fs.createSaveStream()`
- `webui.updateStatusBarIconTint()`
- `webui.confirm()`
- `webui.protectedConfirm()`
- `webui.prompt()`

- **Alternatives & Fallbacks:** Fallback to `ksu.io()` or use `fs.inputstream(): Promise<Response>` / `fs.outputstream(): WritableStream`.

> Don't forget to add the proper permissions for used functions:
>
> - `ksu.io()` requires `kernelsu.permission.IO`
> - `ksu.pm()` requires `kernelsu.permission.PM`
> - `ksu.exec()`,`ksu.execBool()`,`ksu.spawn()` requires `kernelsu.permission.SHELL`
> - `window.fs` requires `mx.permission.IO`

## Common UI Patterns

### Passive HUD (Non-Interactive Overlay)

Best for live performance stats or status indicators that should never interfere with game controls or app gestures.

```css
* {
  pointer-events: none !important;
  user-select: none;
}

html,
body {
  background: transparent !important;
}
```

### Collapsible Floating Window

Best for utilities and control panels that stay minimized until needed:

1. **Minimized State:** Display a small floating button (`#launcher`) while keeping the main window `[hidden]`. Only the button's bounding box intercepts touches.
2. **Expanded State:** Hide `#launcher` and remove `[hidden]` from the main window (`#window`).
3. **Draggable Header:** Attach Pointer Events (`pointerdown`, `pointermove`, `pointerup` with `setPointerCapture`) to a titlebar with `touch-action: none` so users can drag the window anywhere within the viewport.

### Floating Input / Command Runner

Best for quick notes, shell runners, or calculators:

- Include standard `<input>` or `<textarea>` elements inside your floating window.
- Focus and Android IME (soft keyboard) visibility are handled automatically when the user taps into or out of the field.

## Best Practices

- **Respect Safe Areas:** Position corner elements using CSS environment variables (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, `env(safe-area-inset-left)`, `env(safe-area-inset-right)`) so notches, status bars, and gesture navigation bars never overlap your UI.
- **Clamp Windows on Resize:** Listen to `window.addEventListener('resize', ...)` to keep draggable windows inside `window.innerWidth` and `window.innerHeight` when the device rotates between portrait and landscape.
- **Keep Root Backgrounds Transparent:** Never apply opaque background colors to `html` or `body`. Style only your floating cards, pills, or panels.
- **Pause Background Polling:** When running periodic root shell commands for HUD metrics, pause polling when `document.hidden` is `true` to save battery and CPU cycles.
