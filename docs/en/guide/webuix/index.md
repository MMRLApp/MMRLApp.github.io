---
title: WebUI X - Next-Generation Module Interface Framework
description: Discover WebUI X, MMRL's flagship framework for running, customizing, and debugging high-performance Android module interfaces across root and non-root environments.
---

# Why WebUI X?

WebUI X is the next-generation framework built to run, extend, and debug web-based interfaces for Android modules. Moving beyond legacy WebView implementations, WebUI X delivers a standardized native runtime (**MX Engine**), advanced security boundaries, deep system integration, and desktop-grade developer tooling.

## Key Advantages

### 1. Advanced Security & Permission Control
- **Content Security Policy (CSP):** Full CSP support via customizable policies and domains, with flexible opt-out handling when needed.
- **Granular Permission Model:** Gate sensitive system APIs, root shell invocation, and local storage access with explicit permission boundaries.
- **Process Isolation:** Features process safety options, background cleanup, and process kill controls to keep module environments secure.

### 2. High Performance & Adaptive UI
- **Native MX Engine:** Standardized on the high-performance MX runtime for uniform behavior, smooth rendering, and security across all platforms.
- **Automatic System Insets:** Built-in dynamic top and bottom inset injection ensures web layouts automatically adjust to status and navigation bars.
- **Modern Design Integration:** Seamlessly integrates Material Design 3 and MMRLX theme primitives, including custom native context menus, dialog overlays, and SVG rendering.

### 3. Desktop-Grade Developer Tooling
- **In-App DevTools Suite:** Built-in DOM inspector powered by Jsoup, real-time network request logging, and interactive console history.
- **Chrome DevTools Protocol (CDP):** Deprecates legacy console injection tools in favor of standard CDP-based remote debugging.
- **Markdown & Utility Viewers:** Integrated native Markdown renderer and asset handlers for instant documentation previewing.

### 4. Extensibility & Runtime Plugins
- **Lua & Dex Plugins:** Load custom Java/Kotlin Dex binaries and Lua webroot scripts directly into the runtime context.
- **Expanded KernelSU & System APIs:** Direct JS access to system package metadata, file streams (`ksu.io`), POSIX filesystem helpers, and custom bridge endpoints.
- **SPA Navigation:** Built-in `History Fallback` routing for seamless Single Page Application navigation.

### 5. Universal Platform Compatibility
- **Cross-Environment Support:** Full operational support across **KernelSU**, **APatch**, **Magisk**, and **Non-Root ADB** configurations.
- **Home Screen Shortcuts:** Generate pinned launcher shortcuts for individual module WebUIs.

## Comparison: WebUI X vs. Legacy WebUI Host

| Feature | WebUI X (MX Engine) | Legacy WebUI Host |
| :--- | :--- | :--- |
| **Security Controls** | Dynamic CSP Manager, API permission gating, process isolation | Unrestricted / basic sandboxing |
| **Developer Tools** | Jsoup DOM inspector, Network tracker, Console store, CDP support | Basic console logging / Eruda scripts |
| **Extensibility** | Lua & Dex plugins, custom JS bridge interfaces, `ksu.io` file streams | Fixed JavaScript interface |
| **Non-Root Support** | Native non-root ADB path resolution & SAF integration | N/A |

## Getting Started

1. **Install WebUI X** via GitHub or Google Play Store.
2. Launch installed modules directly or pin them to your home screen.
3. Edit module files on the go using the built-in **File Explorer** and **TextMate-powered Code Editor**.
4. Open **DevTools** within the app to inspect the DOM tree, analyze network traffic, and evaluate JavaScript snippets in real time.
