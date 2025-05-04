/**
 * This is a private interface which is not accessible in the window object.
 * It is used to define the structure of a file input stream.
 */
export interface FileInputInterfaceStream {
  read(): number;
  readChunk(chinkSize: number): number;
  close(): void;
  skip(n: number): number;
}
