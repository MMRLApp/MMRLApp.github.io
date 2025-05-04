declare var $module_id: FileInterface; // accesspoint for webui-x

/**
 * Interface representing file operations and metadata retrieval.
 */
interface FileInterface {
  /**
   * Reads the content of a file as a string.
   * @param path - The path to the file.
   * @returns The file content as a string, or `null` if the file cannot be read.
   */
  read(path: string): string | null;

  /**
   * Writes a string to a file.
   * @param path - The path to the file.
   * @param data - The string data to write.
   */
  write(path: string, data: string): void;

  /**
   * Writes binary data to a file.
   * @param path - The path to the file.
   * @param data - An array of bytes to write.
   */
  writeBytes(path: string, data: number[]): void;

  /**
   * Reads the content of a file as a Base64-encoded string.
   * @param path - The path to the file.
   * @returns The Base64-encoded content, or `null` if the file cannot be read.
   */
  readAsBase64(path: string): string | null;

  /**
   * Lists the contents of a directory.
   * @param path - The path to the directory.
   * @param delimiter - An optional delimiter for separating entries.
   * @returns A string containing the directory contents, or `null` if the directory cannot be read.
   */
  list(path: string, delimiter?: string): string | null;

  /**
   * Retrieves the size of a file or directory.
   * @param path - The path to the file or directory.
   * @param recursive - Whether to include the size of subdirectories (if applicable).
   * @returns The size in bytes.
   */
  size(path: string, recursive?: boolean): number;

  /**
   * Retrieves metadata about a file or directory.
   * @param path - The path to the file or directory.
   * @param total - Whether to include additional metadata (if applicable).
   * @returns A numeric representation of the metadata.
   */
  stat(path: string, total?: boolean): number;

  /**
   * Deletes a file or directory.
   * @param path - The path to the file or directory.
   * @returns `true` if the deletion was successful, otherwise `false`.
   */
  delete(path: string): boolean;

  /**
   * Checks if a file or directory exists.
   * @param path - The path to check.
   * @returns `true` if the file or directory exists, otherwise `false`.
   */
  exists(path: string): boolean;

  /**
   * Checks if a path is a directory.
   * @param path - The path to check.
   * @returns `true` if the path is a directory, otherwise `false`.
   */
  isDirectory(path: string): boolean;

  /**
   * Checks if a path is a file.
   * @param path - The path to check.
   * @returns `true` if the path is a file, otherwise `false`.
   */
  isFile(path: string): boolean;

  /**
   * Checks if a path is a symbolic link.
   * @param path - The path to check.
   * @returns `true` if the path is a symbolic link, otherwise `false`.
   */
  isSymLink(path: string): boolean;

  /**
   * Creates a directory.
   * @param path - The path to the directory.
   * @returns `true` if the directory was created successfully, otherwise `false`.
   */
  mkdir(path: string): boolean;

  /**
   * Creates a directory and any necessary parent directories.
   * @param path - The path to the directory.
   * @returns `true` if the directories were created successfully, otherwise `false`.
   */
  mkdirs(path: string): boolean;

  /**
   * Creates a new file.
   * @param path - The path to the file.
   * @returns `true` if the file was created successfully, otherwise `false`.
   */
  createNewFile(path: string): boolean;

  /**
   * Renames a file or directory.
   * @param target - The current path of the file or directory.
   * @param dest - The new path for the file or directory.
   * @returns `true` if the rename was successful, otherwise `false`.
   */
  renameTo(target: string, dest: string): boolean;

  /**
   * Copies a file or directory to a new location.
   * @param path - The source path.
   * @param target - The destination path.
   * @param overwrite - Whether to overwrite the destination if it already exists.
   * @returns `true` if the copy was successful, otherwise `false`.
   */
  copyTo(path: string, target: string, overwrite: boolean): boolean;

  /**
   * Checks if a file is executable.
   * @param path - The path to the file.
   * @returns `true` if the file is executable, otherwise `false`.
   */
  canExecute(path: string): boolean;

  /**
   * Checks if a file is writable.
   * @param path - The path to the file.
   * @returns `true` if the file is writable, otherwise `false`.
   */
  canWrite(path: string): boolean;

  /**
   * Checks if a file is readable.
   * @param path - The path to the file.
   * @returns `true` if the file is readable, otherwise `false`.
   */
  canRead(path: string): boolean;

  /**
   * Checks if a file is hidden.
   * @param path - The path to the file.
   * @returns `true` if the file is hidden, otherwise `false`.
   */
  isHidden(path: string): boolean;
}
