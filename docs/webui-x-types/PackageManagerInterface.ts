import { FileInputInterfaceStream } from "./FileInputInterfaceStream";
import { WXApplicationInfo } from "./WXApplicationInfo";

declare var $packageManager: PackageManagerInterface; // accesspoint for webui-x

interface PackageManagerInterface {
  getPackageUid(packageName: string, flags: number, userId: number): number;
  /**
   * Method run heavy operations
   */
  getApplicationIcon(packageName: string, flags: number, userId: number): FileInputInterfaceStream | null;
  getInstalledPackages(flags: number, userId: number): string;
  getApplicationInfo(packageName: string, flags: number, userId: number): WXApplicationInfo;
}
