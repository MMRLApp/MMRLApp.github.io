# WebUI Shortcuts

Since v33404 you can add WebUI's as a shortcut to your home screen. Here will you learn how to set it up.

## Requirements

- A laucher that supports pinned shortcuts
- `config.mmrl.json` in your modules webroot

To make it work add the following properties to your `config.mmrl.json`

```json
{
  "title": "bindhosts",
  "icon": "bindhosts-icon.jpg"
}
```

| Property | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `title`  | Title of the shortcut that displayed on the home screen launcher |
| `icon`   | Any type of image that should show on the home screen launcher   |
|          | The icon should be always in the webroot!                        |
