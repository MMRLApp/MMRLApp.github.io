# WebUI X Index Setup

| Dark                                                   | Light                                                       |
|--------------------------------------------------------|-------------------------------------------------------------|
| <img src="/assets/webui/webui-dark.png" width="32%" /> | <img src="/assets/webui/webui-light.png" width="32%" />     |

## Setup

To use window safe area insets which you basiclly need here, otherwise your config will move behind the status bar

> Why so?  
> It improves the design and it presents a much more "native" feel

> [!CAUTION]
> `https://mui.kernelsu.org/mmrl/` is deprecated use `https://mui.kernelsu.org/internal/` instead please

::: code-group

```html [index.html]
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ModConf Compose WebUI</title>
    <!-- Window Safe Area Insets -->
    <link rel="stylesheet" type="text/css" href="https://mui.kernelsu.org/internal/insets.css" />
    <!-- App Theme which the user has currently selected -->
    <link rel="stylesheet" type="text/css" href="https://mui.kernelsu.org/internal/colors.css" />
    <!-- Your styles -->
    <link rel="stylesheet" type="text/css" href="styles.css" />

  </head>
  <body>
    <div class="scaffold">
      <div class="card">
        <span>Hello from WebUI!</span>
      </div>
    </div>
  </body>
</html>
```

```css [style.css]
body {
    padding-top: var(--window-inset-top);
    padding-bottom: var(--window-inset-bottom);
    background-color: var(--background);
}

.scaffold {
    padding: 16px;
}

.card {
    padding: 16px;
    background-color: var(--surfaceContainer);
    border-radius: 20px;
    span {
        color: var(--inverseSurface);
    }
}
```

:::
