# `Toast` Class Documentation

## Overview
The `Toast` class provides a way to show native Toast notifications within the MMRL environment. A Toast is a small message that pops up on the screen for a short time to provide feedback to the user. This class includes methods to customize the text, duration, gravity, and position of the Toast.

It extends from `MMRLObjectAccessor`, providing access to the MMRL interface. To use this class, your app must be running MMRL version `33049` or higher.

## Constants

### `Toast.LENGTH_SHORT`
Defines the short duration for the Toast.

- `number`: `0`

### `Toast.LENGTH_LONG`
Defines the long duration for the Toast.

- `number`: `1`

---

## Properties

### `Toast.duration`
Specifies the duration of the Toast. This is initially set to `Toast.LENGTH_SHORT`, but can be modified using the `setDuration()` method.

- `number`: The current duration of the Toast.

---

## Methods

### `Toast.setText(text: string)`
Sets the text to be displayed in the Toast.

#### Parameters:
- `text`: A string representing the text to be shown in the Toast.

#### Throws:
- `TypeError`: If `text` is not a string.
- Requires MMRL version `33049` or higher.

#### Example:
```javascript
toast.setText("Hello, World!");
```

---

### `Toast.setDuration(duration: number)`
Sets the duration for the Toast.

#### Parameters:
- `duration`: The duration for which the Toast should appear. Can either be `Toast.LENGTH_SHORT` or `Toast.LENGTH_LONG`.

#### Throws:
- `TypeError`: If `duration` is not a number.
- `Error`: If the duration is not valid (i.e., not `Toast.LENGTH_SHORT` or `Toast.LENGTH_LONG`).
- Requires MMRL version `33049` or higher.

#### Example:
```javascript
toast.setDuration(Toast.LENGTH_LONG);
```

---

### `Toast.setGravity(gravity: number, xOffset: number, yOffset: number)`
Sets the gravity and offset for the Toast, determining where the Toast will appear on the screen.

#### Parameters:
- `gravity`: The gravity value, which determines the position of the Toast on the screen.
- `xOffset`: The horizontal offset (in pixels) from the gravity's position.
- `yOffset`: The vertical offset (in pixels) from the gravity's position.

#### Throws:
- `TypeError`: If any of the parameters (`gravity`, `xOffset`, or `yOffset`) are not numbers.
- Requires MMRL version `33049` or higher.

#### Example:
```javascript
toast.setGravity(1, 0, 200); // Position Toast at the top center with an offset.
```

---

### `Toast.show()`
Displays the Toast on the screen.

- Requires MMRL version `33049` or higher.

#### Example:
```javascript
toast.show();
```

---

### `Toast.cancel()`
Cancels the Toast if it is currently being shown.

- Requires MMRL version `33049` or higher.

#### Example:
```javascript
toast.cancel();
```

---

### `Toast.makeText(text: string, duration: number = Toast.LENGTH_SHORT)`
A static method that creates a new `Toast` instance with the specified text and duration.

#### Parameters:
- `text`: The text to display in the Toast.
- `duration`: The duration for which the Toast will appear. Defaults to `Toast.LENGTH_SHORT`.

#### Returns:
- `Toast`: A new `Toast` instance.

#### Example:
```javascript
const toast = Toast.makeText("Hello, World!", Toast.LENGTH_LONG);
toast.show();
```

---

## Usage Example

```javascript
const toast = Toast.makeText("This is a Toast!", Toast.LENGTH_LONG);
toast.setGravity(1, 0, 200);  // Center the Toast at the top with an offset
toast.show();

// Later, you can cancel the Toast if needed
toast.cancel();
```