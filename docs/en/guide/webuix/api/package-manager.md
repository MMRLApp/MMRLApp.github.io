# PackageManager API

```ts
declare var $packageManager: PackageManagerInterface;

/**
 * This is a non-public interface and cannot accessed from the window scope
 */
interface FileInputInterfaceStream {
  read(): number;
  readChunk(chunkSize: number): string | null;
  close(): void;
  skip(n: number): number;
}

interface WXApplicationInfo {}

interface PackageManagerInterface {
  getPackageUid(packageName: string, flags: number, userId: number): number;
  getApplicationIcon(packageName: string, flags: number, userId: number): FileInputInterfaceStream | null;
  getInstalledPackages(flags: number, userId: number): string;
  getApplicationInfo(packageName: string, flags: number, userId: number): WXApplicationInfo;
}
```
