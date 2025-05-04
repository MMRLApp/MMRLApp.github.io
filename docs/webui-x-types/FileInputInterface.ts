import { FileInputInterfaceStream } from "./FileInputInterfaceStream";

declare var $module_id: FileInputInterface; // accesspoint for webui-x

export interface FileInputInterface {
  /**
   * Opens a file for reading.
   * @param path The path to the file to be opened.
   * @returns A FileInputInterfaceStream object if the file is opened successfully, null otherwise.
   */
  open(path: string): FileInputInterfaceStream | null;
}
