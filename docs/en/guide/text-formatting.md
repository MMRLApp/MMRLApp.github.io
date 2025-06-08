# Text Formatting

This document describes a custom text formatting syntax used in both shell scripts, module configuration files, and Jetpack Compose UI development. This syntax allows you to add color and style to your text output using simple tags.

## Overview

The formatting system uses tags enclosed in square brackets `[]` to define styles. These tags can control text color, background color, and text attributes like bold, italic, and underline.

## Supported Tags

The following tags are supported:

- **`[color=<value>]` / `[color]`**:

  - Sets the foreground color of the text.
  - `<value>` can be a predefined color name (see [Supported Colors](#supported-colors) below).
  - Using `[color]` without a value (or with an unrecognized value) typically resets the color to the default or `Color.Unspecified` in Compose.

- **`[bg=<value>]` / `[bg]`**:

  - Sets the background color of the text.
  - `<value>` can be a predefined color name (see [Supported Colors](#supported-colors) below).
  - Using `[bg]` without a value (or with an unrecognized value) typically resets the background color to the default or `Color.Unspecified` in Compose.

- **`[bold]`**:

  - Applies bold styling to the text.
  - In Compose, this sets `FontWeight.Bold`.
  - In the shell script, this tag is stripped if `MMRL` is not "true". To actually render bold in a terminal, you'd typically need ANSI escape codes, which this script doesn't explicitly add (it only strips the custom tags).

- **`[italic]`**:

  - Applies italic styling to the text.
  - In Compose, this sets `FontStyle.Italic`.
  - In the shell script, this tag is stripped if `MMRL` is not "true".

- **`[underline]`**:
  - Applies underline styling to the text.
  - In Compose, this sets `TextDecoration.Underline`.
  - In the shell script, this tag is stripped if `MMRL` is not "true".

## Usage

### Shell Script (`echo` function)

The provided `echo` shell function processes these tags:

```shell
echo() {
    local msg="$*"
    if [ "$MMRL" = "true" ]; then
        command echo "$msg"
    else
        # Remove all custom formatting tags before printing
        command echo "$msg" | sed -E 's/\[(color|bg|bold|italic|underline)(=[^]]+)?]//g'
    fi
}
```

**Behavior (Shell Script):**

- If the environment variable `MMRL` is set to `"true"`, the `echo` command will print the message as-is, including all formatting tags. This might be useful for debugging or for systems that can interpret these tags directly.
- If `MMRL` is not set to `"true"` (or is set to any other value), the function strips out all custom formatting tags using `sed` before printing the message. The output will be plain text.

**Example (Shell Script):**

```shell
# With MMRL not "true" (default behavior)
echo "This is a [color=red]red[color] message with [bold]bold text[bold]."
# Output: This is a red message with bold text.

# With MMRL="true"
MMRL="true" echo "This is a [color=red]red[color] message with [bold]bold text[bold]."
# Output: This is a [color=red]red[color] message with [bold]bold text[bold].
```

### Module Config (`config.json` in module root)

The custom formatting tags can be used within the `description` field of a module's `config.json` file.

**Note:** Only the `description` field supports this formatting API. It cannot be used with other fields like those in `module.prop`.

```json
{
  "name": {
    "en": "Systemless module",
    "de": "Systemloses Modul"
  },
  "description": {
    "en": "[bg=red]Hello[bg], [color=primary]World[color]!",
    "de": "Hallo, [color=green]Welt[color]!"
  }
}
```

When an application (like a module manager that supports this format) reads this `config.json`, it would be responsible for parsing the `description` string and rendering the formatted text in its UI, likely using a mechanism similar to the Jetpack Compose `toStyleMarkup()` function.

### Jetpack Compose (`String.toStyleMarkup()`)

The Kotlin extension function `toStyleMarkup()` converts a string containing these formatting tags into an `AnnotatedString`, which can be used to display styled text in Jetpack Compose.

```kotlin
// Simplified conceptual usage
@Composable
fun MyStyledText(text: String) {
    Text(text = text.toStyleMarkup())
}

// Example
MyStyledText(text = "Hello [color=blue]Blue World[color] with [bg=yellow]yellow background[bg] and [bold]bold[bold] text!")
```

This will render "Hello " in the default style, "Blue World" in blue, " with " in default style, "yellow background" with a yellow background, " and " in default style, and "bold" in bold text. The styling is cumulative within the parsed segments.

## Supported Colors

The `colorFromName` Composable function in Kotlin defines the mapping from color names to `Color` objects. These names can be used in `[color=<name>]` and `[bg=<name>]` tags.

| Color Name           | Mapped To (Jetpack Compose)                  |
| -------------------- | -------------------------------------------- |
| `black`              | `Color.Black`                                |
| `red`                | `Color.Red`                                  |
| `green`              | `Color.Green`                                |
| `yellow`             | `Color.Yellow`                               |
| `blue`               | `Color.Blue`                                 |
| `magenta`            | `Color.Magenta`                              |
| `cyan`               | `Color.Cyan`                                 |
| `white`              | `Color.White`                                |
| `gray`, `grey`       | `Color.Gray`                                 |
| `lightgray`          | `Color.LightGray`                            |
| `primary`            | `MaterialTheme.colorScheme.primary`          |
| `secondary`          | `MaterialTheme.colorScheme.secondary`        |
| `tertiary`           | `MaterialTheme.colorScheme.tertiary`         |
| `background`         | `MaterialTheme.colorScheme.background`       |
| `surface`            | `MaterialTheme.colorScheme.surface`          |
| `error`              | `MaterialTheme.colorScheme.error`            |
| `outline`            | `MaterialTheme.colorScheme.outline`          |
| `inverse_surface`    | `MaterialTheme.colorScheme.inverseSurface`   |
| `inverse_on_surface` | `MaterialTheme.colorScheme.inverseOnSurface` |
| `inverse_primary`    | `MaterialTheme.colorScheme.inversePrimary`   |
| `surface_variant`    | `MaterialTheme.colorScheme.surfaceVariant`   |
| `on_surface_variant` | `MaterialTheme.colorScheme.onSurfaceVariant` |
| `surface_tint`       | `MaterialTheme.colorScheme.surfaceTint`      |
| `on_surface`         | `MaterialTheme.colorScheme.onSurface`        |
| `on_primary`         | `MaterialTheme.colorScheme.onPrimary`        |
| `on_secondary`       | `MaterialTheme.colorScheme.onSecondary`      |
| `on_tertiary`        | `MaterialTheme.colorScheme.onTertiary`       |
| `on_background`      | `MaterialTheme.colorScheme.onBackground`     |
| `on_error`           | `MaterialTheme.colorScheme.onError`          |
| _(any other value)_  | `Color.Unspecified`                          |

**Note:** Color names are case-insensitive (e.g., `Red`, `red`, `RED` are all treated the same).

## Tag Nesting and Behavior

In the Jetpack Compose implementation (`toStyleMarkup`):

- Styles are applied segment by segment. When a tag is encountered, the style it defines (e.g., `currentColor`, `isBold`) is set and applied to subsequent text until another relevant tag changes it or the string ends.
- There isn't explicit "closing" tag logic like `[/bold]`. Instead, a new tag like `[color=green]` would change the current color from whatever it was previously. For boolean styles like `bold`, `italic`, `underline`, the provided Kotlin code currently only sets them to `true`. To turn them _off_, you would need to modify the parsing logic to handle specific "off" tags (e.g., `[bold=false]`) or a general reset tag if that functionality is desired. The current parser only activates these styles.

For the shell script, the `sed` command simply removes any recognized tag pattern. It does not interpret nesting or apply styles. The same applies to how an application might parse the `config.json`'s `description` field – it would depend on its specific parsing implementation, but would likely follow the Jetpack Compose behavior if aiming for consistency.
