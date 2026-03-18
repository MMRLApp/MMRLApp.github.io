# FileSystem API (WIP)

Starting with `v?`, WebUI X: Portable introduces a new FileSystem API for interacting with files on Android devices. This API is fully asynchronous and is restricted to the website origin for improved security. Unlike the previous implementation, it does not expose a native JavaScript interface, ensuring better isolation and compatibility.

## Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JSON formatter</title>
    <style>
      body {
        margin: 0;
      }
      .container {
        width: 100vw;
        padding: 10px;
        box-sizing: border-box;
      }
      #jsonDisplay {
        width: 100%;
        height: 80vh;
        word-break: break-all;
        resize: none;
      }
      #fileInput {
        display: none;
      }
    </style>
  </head>
  <body style="padding-top: var(--window-inset-top)">
    <div class="container">
      <button id="uploadBtn">Upload JSON</button>
      <button id="downloadBtn">Download JSON</button>
      <br /><br />
      <textarea id="jsonDisplay" readonly></textarea>
      <input type="file" id="fileInput" accept=".json" />
      <!-- input can be create only when needed too -->
    </div>

    <script>
      const uploadBtn = document.getElementById("uploadBtn");
      const downloadBtn = document.getElementById("downloadBtn");
      const fileInput = document.getElementById("fileInput");
      const jsonDisplay = document.getElementById("jsonDisplay");

      uploadBtn.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const json = JSON.parse(e.target.result);
              jsonDisplay.value = JSON.stringify(json, null, 2);
            } catch (error) {
              ksu.toast("Invalid JSON file");
            }
          };
          reader.readAsText(file);
        }
      });

      downloadBtn.addEventListener("click", async () => {
        const stream = fs.newSaveFileStream("formatted.json", "text/plain");
        const jsonText = jsonDisplay.value;
        if (jsonText) {
          const writer = stream.getWriter();
          await writer.write(new TextEncoder().encode(jsonText));
          await writer.close();
        } else {
          ksu.toast("No JSON to download");
        }
      });
    </script>
  </body>
</html>
```

## Typings

<details>
<summary>Expand to see the full Typings</summary>

```ts
/**
 * Options for initializing a file system stream, extending the standard ResponseInit.
 * @see ResponseInit
 */
interface FileSystemStreamInit extends ResponseInit {
  /**
   * An AbortSignal to allow aborting the stream operation.
   */
  signal?: AbortSignal;
}

/**
 * Represents file or directory statistics.
 */
interface FileSystemStat {
  /**
   * Size of the file in bytes.
   */
  size: number;
  /**
   * Last modified timestamp (milliseconds since epoch).
   */
  lastModified: number;
  /**
   * Returns true if the entry is a file.
   */
  isFile: () => boolean;
  /**
   * Returns true if the entry is a directory.
   */
  isDirectory: () => boolean;
  /**
   * Returns true if the entry is a symbolic link.
   */
  isSymbolicLink: () => boolean;
}

/**
 * Result of checking file system access permissions.
 */
interface FileSystemAccessResult {
  /**
   * Whether the file or directory exists.
   */
  exists: boolean;
  /**
   * Whether the file or directory can be read.
   */
  canRead: boolean;
  /**
   * Whether the file or directory can be written to.
   */
  canWrite: boolean;
  /**
   * Whether the file or directory can be executed.
   */
  canExecute: boolean;
  /**
   * Whether the file or directory is hidden.
   */
  isHidden: boolean;
}

/**
 * Provides an interface for file system operations.
 */
interface FileSystem {
  /**
   * File exists flag.
   */
  F_OK: number;
  /**
   * File is readable flag.
   */
  R_OK: number;
  /**
   * File is writable flag.
   */
  W_OK: number;
  /**
   * File is executable flag.
   */
  X_OK: number;
  /**
   * Opens a readable input stream for the specified file path.
   *
   * Initiates a file read operation and returns a promise that resolves to a Response object,
   * allowing you to consume the file's contents as a stream. Supports aborting via AbortSignal.
   *
   * @param path - The path to the file to read from.
   * @param init - Optional configuration for the stream, such as an AbortSignal.
   * @returns A promise that resolves to a Response containing the file data as a stream.
   *
   * @throws {TypeError} If the path is not a string.
   * @throws {Error} If the path is empty.
   * @throws {Error} If the input stream interface is unavailable or access is denied.
   *
   * @example
   * const response = await fs.newInputStream("/data/adb/file.txt");
   * const text = await response.text();
   */
  newInputStream(path: string, init?: FileSystemStreamInit): Promise<Response>;

  /**
   * Opens a writable output stream for the specified file path.
   *
   * Initiates a file write operation and returns a WritableStream for writing binary data (Uint8Array) to the file.
   * The stream supports chunked writing and can be closed or aborted. If the file does not exist, it will be created.
   * If the file exists, its contents will be overwritten.
   *
   * @param path - The path to the file to write to.
   * @returns A WritableStream for writing Uint8Array data to the file.
   *
   * @throws {TypeError} If the path is not a string.
   * @throws {Error} If the path is empty.
   * @throws {Error} If the output stream interface is unavailable or access is denied.
   *
   * @example
   * const stream = fs.newOutputStream("/data/adb/file.txt");
   * const writer = stream.getWriter();
   * await writer.write(new Uint8Array([1, 2, 3]));
   * await writer.close();
   */
  newOutputStream(path: string): WritableStream<Uint8Array>;

  /**
   * Reads a file as text using the input stream
   * @param path - The file path to read
   * @param encoding - Text encoding (default: 'utf-8')
   * @param signal - Optional abort signal
   * @returns Promise that resolves to the file content as text
   */
  readTextFile(path: string, encoding?: string, signal?: AbortSignal): Promise<string>;

  /**
   * Retrieves metadata for a file or directory, similar to Node's fs.stat().
   *
   * Returns detailed statistics such as size, last modified time, and type checks.
   * The returned {@link FileSystemStat} object provides methods to determine if the entry is a file, directory, or symbolic link.
   *
   * @param path - The path to the file or directory to query.
   * @returns A promise that resolves to a {@link FileSystemStat} object containing stat information.
   *
   * @throws {TypeError} If the path is not a string.
   * @throws {Error} If the path is empty.
   * @throws {Error} If the stat operation is not permitted.
   * @throws {Error} If the stat operation fails or returns invalid data.
   *
   * @example
   * const stat = await fs.stat("/data/adb/file.txt");
   * if (stat.isFile()) {
   *   console.log("File size:", stat.size);
   * }
   */
  stat(path: string): Promise<FileSystemStat>;

  /**
   * Tests the accessibility of a file or directory, similar to Node's fs.access().
   *
   * Checks whether the specified path exists and/or has the requested permissions.
   * The mode can be a combination of F_OK (existence), R_OK (read), W_OK (write), and X_OK (execute).
   * If the check fails, the returned promise rejects with an Error.
   *
   * @param path - The file or directory path to check.
   * @param mode - Accessibility check mode. Use F_OK, R_OK, W_OK, X_OK constants or combine them with |.
   *               Defaults to F_OK (existence check only).
   * @returns A promise that resolves if the check passes, or rejects with an Error if it fails.
   *
   * @example
   * // Check existence only
   * await fs.access("/data/adb/file.txt");
   *
   * // Check readable + writable
   * await fs.access("/data/adb/file.txt", fs.R_OK | fs.W_OK);
   */
  access(path: string, mode?: number): Promise<void>;

  /**
   * Retrieves detailed access information for the specified file or directory.
   *
   * Returns an object describing whether the path exists and its read/write/execute/hidden status.
   * Unlike {@link access}, this method never throws for missing permissions or non-existent paths.
   *
   * @param path - The file or directory path to check.
   * @returns A promise resolving to a FileSystemAccessResult object with detailed access flags.
   *
   * @example
   * const info = await fs.accessInfo("/data/adb/file.txt");
   * if (info.canRead && info.canWrite) {
   *   // File is both readable and writable
   * }
   */
  accessInfo(path: string): Promise<FileSystemAccessResult>;
}

export {};

declare global {
  interface Window {
    fs?: FileSystem;
  }
}
```

</details>
