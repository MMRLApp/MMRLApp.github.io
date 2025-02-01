# `FileSystem` Documentation

## Overview

The `FileSystem` class provides access to file operations, including reading, writing, listing, deleting files, and querying their size and status. It works as an abstraction layer to interact with the underlying file system. This class extends the `MMRLObjectAccessor` class to provide additional functionality specifically for file operations.

### Access Control and Module ID Sanitization

The methods in the `FileSystem` class are available if the user has the necessary permissions to access the file system. The `FileSystem` class must be initialized with a valid `ObjectScope` that grants access to the file system.

The `FileSystem` is only accessible if the user has granted the necessary permissions. Before any file-related operations can be performed, the user must approve the access. Once granted, the methods in `FileSystem` become available for JavaScript code in the WebView.

To access the `FileSystem`, a sanitized module ID is used. The method `sanitizeModIdWithFile()` is used to ensure that every WebView uses the same access point.

```kotlin
fun sanitizeModIdWithFile(input: String): String {
    return if (input.length >= 2) {
        input[0].uppercase() + input[1].toString()
    } else if (input.isNotEmpty()) {
        input[0].uppercase()
    } else {
        ""
    }
}
```

For example, the module ID `"mmrl_wpd"` would be sanitized to `"$MmFile"`. Play with this code sample [online](https://pl.kotl.in/uHiACLNTQ)

## Methods

### `fileSystem.read(path: string)`

Reads the contents of a file located at the specified `path`.

#### Parameters:

- `path`: A string representing the file path.

#### Returns:

- `string | null`: The content of the file as text, or `null` if not available.

#### Example:

```javascript
const content = fileSystem.read("/path/to/file.txt");
console.log(content); // Output the file content
```

---

### `fileSystem.read(path: string, bytes: boolean)`

Reads the contents of a file at the specified `path`. If `bytes` is `true`, the content is returned as a Base64-encoded string.

#### Parameters:

- `path`: A string representing the file path.
- `bytes`: A boolean flag indicating whether to return the content as Base64-encoded (`true`) or plain text (`false`).

#### Returns:

- `string | null`: The Base64-encoded content if `bytes` is true, or plain text if `bytes` is false.

#### Example:

```javascript
const base64Content = fileSystem.read("/path/to/image.png", true);
console.log(base64Content); // Base64-encoded string
```

---

### `fileSystem.write(path: string, data: string)`

Writes the specified `data` to a file at the given `path`. If the file already exists, it will be overwritten.

#### Parameters:

- `path`: A string representing the file path.
- `data`: A string containing the content to write to the file.

#### Returns:

- `void`: No return value.

#### Example:

```javascript
fileSystem.write("/path/to/output.txt", "Hello, world!");
```

---

### `fileSystem.readAsBase64(path: string)`

Reads the content of a file at the specified `path` and returns it as a Base64-encoded string.

#### Parameters:

- `path`: A string representing the file path.

#### Returns:

- `string | null`: The Base64-encoded file content, or `null` if not available.

#### Example:

```javascript
const base64Content = fileSystem.readAsBase64("/path/to/file.pdf");
console.log(base64Content); // Base64-encoded string
```

---

### `fileSystem.list(path: string)`

Lists the files and directories in the specified `path`.

#### Parameters:

- `path`: A string representing the directory path.

#### Returns:

- `string[] | null`: An array of file and directory names, or `null` if not available.

#### Example:

```javascript
const fileList = fileSystem.list("/path/to/directory");
console.log(fileList); // ["file1.txt", "file2.txt", "folder1"]
```

---

### `fileSystem.list(path: string, delimiter: string)`

Lists the files and directories in the specified `path`, and allows customization of the delimiter separating the file names.

#### Parameters:

- `path`: A string representing the directory path.
- `delimiter`: A string used to separate the file names in the returned list.

#### Returns:

- `string[] | null`: A list of file and directory names, separated by the specified delimiter.

#### Example:

```javascript
const fileList = fileSystem.list("/path/to/directory", "|");
console.log(fileList); // ["file1.txt|file2.txt|folder1"]
```

---

### `fileSystem.size(path: string)`

Gets the size of the file or directory at the specified `path`.

#### Parameters:

- `path`: A string representing the file or directory path.

#### Returns:

- `number`: The size of the file or directory in bytes.

#### Example:

```javascript
const size = fileSystem.size("/path/to/file.txt");
console.log(size); // 1024 (size in bytes)
```

---

### `fileSystem.size(path: string, recursive: boolean)`

Gets the size of the file or directory at the specified `path`. If `recursive` is `true`, the size includes all files within subdirectories.

#### Parameters:

- `path`: A string representing the file or directory path.
- `recursive`: A boolean flag indicating whether to include the size of files within subdirectories.

#### Returns:

- `number`: The total size in bytes.

#### Example:

```javascript
const totalSize = fileSystem.size("/path/to/directory", true);
console.log(totalSize); // Total size of all files in the directory
```

---

### `fileSystem.stat(path: string)`

Gets the status of the file or directory at the specified `path`. This could include properties like the last modified time or size.

#### Parameters:

- `path`: A string representing the file or directory path.

#### Returns:

- `number`: A numeric value representing the status of the file or directory.

#### Example:

```javascript
const status = fileSystem.stat("/path/to/file.txt");
console.log(status); // Numeric status value (e.g., last modified timestamp)
```

---

### `fileSystem.stat(path: string, total: boolean)`

Gets the status of the file or directory at the specified `path`, with an option to include the total status for directories (e.g., combined size of all files).

#### Parameters:

- `path`: A string representing the file or directory path.
- `total`: A boolean flag indicating whether to include the total status for directories.

#### Returns:

- `number`: A numeric value representing the status.

#### Example:

```javascript
const totalStatus = fileSystem.stat("/path/to/directory", true);
console.log(totalStatus); // Total status value (e.g., combined size of all files)
```

---

### `fileSystem.delete(path: string)`

Deletes the file or directory at the specified `path`.

#### Parameters:

- `path`: A string representing the file or directory path.

#### Returns:

- `boolean`: `true` if the file or directory was successfully deleted, `false` otherwise.

#### Example:

```javascript
const success = fileSystem.delete("/path/to/file.txt");
console.log(success); // true if deleted, false otherwise
```

---

### `fileSystem.exists(path: string)`

Checks if a file or directory exists at the specified `path`.

#### Parameters:

- `path`: A string representing the file or directory path.

#### Returns:

- `boolean`: `true` if the file or directory exists, `false` otherwise.

#### Example:

```javascript
const exists = fileSystem.exists("/path/to/file.txt");
console.log(exists); // true if the file exists, false otherwise
```

---

## Factory Method

### `FileSystemFactory(scope: ObjectScope)`

Creates an instance of the `FileSystem` class with the provided `scope`.

#### Parameters:

- `scope`: An `ObjectScope` used to initialize the `FileSystem`.

#### Returns:

- `FileSystem`: The created `FileSystem` instance.

#### Example:

```javascript
const fileSystem = FileSystemFactory("net-switch");
console.log(fileSystem.read("/path/to/file.txt"));
```
