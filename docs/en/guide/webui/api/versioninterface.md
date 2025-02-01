# `VersionInterface` Class Documentation

## Overview
The `VersionInterface` class provides access to various version-related details about the app running within the MMRL environment. It allows querying version codes, build types, platform information, and other configuration details. The class interacts with the MMRL interface to retrieve these details.

This class extends `MMRLObjectAccessor`, enabling access to the MMRL interface. To use this class, the app must be running MMRL.

---

## Properties

### `versionCode`
Gets the version code of the application.

- **Returns**: `number` - The version code of the application or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.versionCode); // 1234 (example version code)
```

---

### `versionName`
Gets the version name of the application.

- **Returns**: `string` - The version name of the application or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.versionName); // "1.0.0" (example version name)
```

---

### `applicationId`
Gets the application ID (package name) of the application.

- **Returns**: `string` - The application ID or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.applicationId); // "com.example.app" (example application ID)
```

---

### `buildType`
Gets the build type (e.g., debug, release) of the application.

- **Returns**: `string` - The build type or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.buildType); // "debug" or "release"
```

---

### `isDevVersion`
Checks if the application is a development version.

- **Returns**: `boolean` - `true` if it is a development version, otherwise `false`.

#### Example:
```javascript
console.log(mmrl.isDevVersion); // true or false
```

---

### `isGooglePlayBuild`
Checks if the application is built for Google Play.

- **Returns**: `boolean` - `true` if it is a Google Play build, otherwise `false`.

#### Example:
```javascript
console.log(mmrl.isGooglePlayBuild); // true or false
```

---

### `platform`
Gets the platform the app is running on (e.g., Android, iOS).

- **Returns**: `string` - The platform name or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.platform); // "Android" or "iOS"
```

---

### `rootVersionCode`
Gets the version code of the root configuration.

- **Returns**: `number` - The version code of the root configuration or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.rootVersionCode); // 1001 (example root version code)
```

---

### `rootVersionName`
Gets the version name of the root configuration.

- **Returns**: `string` - The version name of the root configuration or `-1` if not available or if the MMRL environment is not detected.

#### Example:
```javascript
console.log(mmrl.rootVersionName); // "1.0.0" (example root version name)
```

---

## Usage Example

```javascript
// Access various version and build details
console.log(mmrl.versionCode); // 1234
console.log(mmrl.versionName); // "1.0.0"
console.log(mmrl.applicationId); // "com.example.app"
console.log(mmrl.isDevVersion); // true or false
console.log(mmrl.isGooglePlayBuild); // true or false
console.log(mmrl.platform); // "Android"
console.log(mmrl.rootVersionCode); // 1001
console.log(mmrl.rootVersionName); // "1.0.0"
```

## Exported Instance

The class is instantiated and exported as a constant `mmrl`:

```javascript
export const mmrl = new VersionInterface();
```

You can use the `mmrl` constant to access all the properties and methods for the version-related details in your application.