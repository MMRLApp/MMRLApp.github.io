# WebUI X CSS Setup

## Overview

WebUI X: Portable provides a CSS API system for integrating with Android system theming and safe area management. This allows webui interfaces to dynamically adapt to system colors and respect device-specific UI elements like status bars and navigation bars.

Table Content:

- API Insets (Safe Area)
- API Colors (Material You)

## Import

```css
@import "https://mui.kernelsu.org/internal/insets.css";
@import "https://mui.kernelsu.org/internal/colors.css";

/* @deprecated */
@import "https://mui.kernelsu.org/mmrl/insets.css";
/* @deprecated */
@import "https://mui.kernelsu.org/mmrl/colors.css";
```

There is necessary import, you should put this import at top in your <code>style.css</code> You can definitely use one of import.

# Insets API (insets.css)

```css
--window-inset-top: Status bar safe area --window-inset-bottom: Navigation bar safe area;
```

Usage guidelines:

- Use only for elements with position: fixed or position: absolute
- Apply to elements at screen edges
- Do not use for general containers or scrolling content

Example Usage Top insets:

```css
/* Safe area usage */
.top-navigation {
  padding-top: var(--window-inset-top);
}
```

Example Usage Bottom Insets:

```css
.bottom-navigation {
  padding-bottom: var(--window-inset-bottom);
}
```

> [Framework7](https://framework7.io/) is support be default and no future actions are required.

# Keyboard Height <Badge type="warning" text="Since v398"/>

You can get the keyboard height in CSS with `var(--window-keyboard-height)`

Always use the variable with a fallback as it get's removed when the keyboard is closed!

```css
/* Extra keys bar */
#extra-keys {
  background: #1a1a1a;
  border-top: 1px solid #333;
  padding: 8px;
  padding-bottom: calc(var(--window-keyboard-height, var(--window-inset-bottom, 0px)) + 8px) !important;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: space-around;
  min-height: 44px;
  box-sizing: border-box;
  flex-shrink: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
```

Also make sure to disable [`windowResize`](config#windowRezie) in the config file

# Colors API (colors.css)

Color Variable Groups:

Primary Colors (Main Brand)

```css
--primary                   /* Primary brand color              */
--onPrimary                 /* Content on primary background    */
--primaryContainer          /* Container for primary elements   */
--onPrimaryContainer        /* Content on primary container     */
```

Secondary Colors (Supporting)

```css
--secondary                 /*Secondary brand color             */
--onSecondary               /* Content on secondary background  */
--secondaryContainer        /* Container for secondary elements */
--on-secondaryContainer     /* Content on secondary container   */
```

Tertiary Colors (Accent)

```css
--tertiary                  /* Tertiary accent color            */
--onTertiary                /* Content on tertiary background   */
--tertiaryContainer         /* Container for tertiary elements  */
--onTertiaryContainer       /* Content on tertiary container    */
```

Error Colors (Error States)

```css
--error                     /* Error state color                */
--onError                   /* Content on error background      */
--errorContainer            /* Container for error states       */
--onErrorContainer          /* Content on error container       */
```

Surface Colors (Background & Layout)

```css
--background                /* Main app background              */
--onBackground              /* Content on background            */
--surface                   /* Surface/card background          */
--onSurface                 /* Content on surface               */
--surfaceVariant            /* Variant surface color            */
--onSurfaceVariant          /* Content on surface variant       */
```

Surface Container Hierarchy (Elevation Levels)

```css
--surfaceContainerLowest    /* Closest to background            */
--surfaceContainerLow       /* Low elevation                    */
--surfaceContainer          /* Default elevation                */
--surfaceContainerHigh      /* High elevation                   */
--surfaceContainerHighest   /* Closest to foreground            */
```

Outline Colors (Borders & Separators)

```css
--outline                   /* Default outline/border           */
--outlineVariant            /* Subtle separator outline         */
```

Special Colors (Utility)

```css
--shadow                    /* Shadow color                     */
--inverseSurface            /* Inverse surface for contrast     */
--inverseOnSurface          /* Content on inverse surface       */
--inversePrimary            /* Inverse primary color            */
--surfaceBright             /* Bright surface variant           */
--surfaceDim                /* Dim surface variant              */
```

# Example Implement

Safe Area Usage

```css
/* Correct: For fixed elements at edges */
.top-bar {
  position: fixed;
  top: 0;
  padding-top: var(--window-inset-top);
}

/* Incorrect: For general content */
.main-content {
  padding-top: var(--window-inset-top); /* Avoid */
}
```

Color Usage

```css
/* Correct: Use semantic variables */
.card {
  background-color: var(--surfaceContainer);
  color: var(--onSurface);
}

/* Incorrect: Hardcoded colors */
.card {
  background-color: #f5f5f5; /* Avoid */
}
```

Examples

Top Navigation Bar

```css
.android-top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(56px + var(--window-inset-top));
  padding-top: var(--window-inset-top);
  background-color: var(--surface);
  color: var(--onSurface);
  z-index: 1000;
}
```

Bottom Navigation Bar

```css
.android-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(56px + var(--window-inset-bottom));
  padding-bottom: var(--window-inset-bottom);
  background-color: var(--surface);
  color: var(--onSurface);
  z-index: 1000;
}
```

Complete App Structure

```css
@import "https://mui.kernelsu.org/internal/insets.css";
@import "https://mui.kernelsu.org/internal/colors.css";

body {
  background-color: var(--background);
  color: var(--onBackground);
  margin: 0;
  padding: 0;
}

.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding-top: var(--window-inset-top);
  background-color: var(--surface);
  color: var(--onSurface);
  z-index: 1000;
}

.main-content {
  margin-top: calc(64px + var(--window-inset-top));
  margin-bottom: calc(56px + var(--window-inset-bottom));
  padding: 16px;
}
```

# FAQ & Troubleshooting

<details>
<summary>Do I need to handle light/dark themes manually?</summary>
No. WebUI X automatically manages theme switching. Colors dynamically update based on system settings without any manual CSS media queries.
</details>

<details>
<summary>When should I use <code>var(--window-inset-top)</code> and <code>var(--window-inset-bottom)</code>?</summary>
Only use these variables for elements that:
 
Have `position: fixed` or `position: absolute`, Are positioned at the top or bottom of the screen, Need to avoid overlapping with system UI (status bar/navigation bar)
</details>

<details>
<summary>Can I override the color variables?</summary>
Yes, you can define custom values before the imports, but it's recommended to let WebUI X manage colors for consistent theming across the app.
</details>

<details>
<summary>What happens if I don't use the safe area variables?</summary>
Your fixed-positioned elements may be partially hidden behind the status bar or navigation bar on some Android devices.
</details>

<details>
<summary>How do I debug color issues?</summary>
 Check that you're using the correct semantic variable names. All colors should update automatically when the system theme changes.
</details>

<details> 
<summary>Color not updating</summary>
Verify you're using WebUI X variables (not hardcoded colors) and Check that both CSS files are imported correctly
</details>

<details> 
<summary>Safe area not working</summary>

Ensure elements have `position: fixed` or `position: absolute` or Verify variables are applied to the correct elements (top/bottom only)

</details>

### Credits

This documentaion have been sourced from [kanaodnd/WebUIX-API-Color-Docs](https://github.com/kanaodnd/WebUIX-API-Color-Docs/blob/core/README.md).
