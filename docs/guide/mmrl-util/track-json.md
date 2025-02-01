# `track.json` Documentation

This file format is used to define the properties and configurations for tracks, typically in custom software installations or modules. Below is a detailed explanation of each field within the `track.json` file, with properties marked as **required**.

## Supported File Formats

- `.json`
- `.yaml` (recommended for specific root solutions)

## Required Fields Summary

The following fields are **required** for the track to be valid and functional:

- `id`
- `update_to`
- `source`
- `enable`

---

### `id` <Badge type="danger" text="required" />

A unique identifier for the track. This helps differentiate between various tracks.

```yaml
id: "unique-track-id"
```

### `enable` <Badge type="danger" text="required" />

A flag to enable or disable the track. Set to `true` to enable the track.

```yaml
enable: true
```

### `source` <Badge type="danger" text="required" />

The URL or path to the source code repository for the track.

```yaml
source: "https://github.com/owner/track-source"
```

### `update_to` <Badge type="danger" text="required" />

The version to which the track should be updated.

#### Update from updateJson

> For those modules that provide [updateJson](https://topjohnwu.github.io/Magisk/guides.html#moduleprop).

```yaml
id: zygisk_lsposed
update_to: https://lsposed.github.io/LSPosed/release/zygisk.json
license: GPL-3.0
```

#### Update from local updateJson

> `update_to` requires a relative directory of local.

```yaml
id: zygisk_lsposed
update_to: zygisk.json
license: GPL-3.0
```

#### Update from url

> For those have a same url to release new modules.

```yaml
id: zygisk_lsposed
update_to: https://github.com/LSPosed/LSPosed/releases/download/v1.8.6/LSPosed-v1.8.6-6712-zygisk-release.zip
license: GPL-3.0
changelog: https://lsposed.github.io/LSPosed/release/changelog.md
```

#### Update from git

> For those we can get module by packaging all files in the repository

```yaml
id: busybox-ndk
update_to: https://github.com/Magisk-Modules-Repo/busybox-ndk.git
```

#### Update from local zip

> `update_to` and changelog requires a relative directory of local.

```yaml
id: zygisk_lsposed
update_to: LSPosed-v1.8.6-6712-zygisk-release.zip
license: GPL-3.0
changelog: changelog.md
```

### `changelog`

A string that contains details of the updates or changes made to the track.

```yaml
changelog: "Bug fixes and performance improvements."
```

### `license`

The license under which the track is released (e.g., GPL, MIT, etc.).

```yaml
license: "MIT"
```

### `homepage`

A URL to the official homepage for the track.

```yaml
homepage: "https://example.com"
```

### `verified`

Indicates whether the track has been verified.

```yaml
verified: true
```

### `support`

The URL or contact information for support related to the track.

```yaml
support: "https://github.com/owner/project/issues"
```

### `donate`

A URL to the donation page for supporting the track.

```yaml
donate: "https://example.com/donate"
```

### `max_num`

The maximum number of users or instances the track can handle.

```yaml
max_num: 100
```

### `maxApi`

The maximum supported API level for the track.

```yaml
maxApi: 30
```

### `minApi`

The minimum required API level for the track to function.

```yaml
minApi: 21
```

### `category`

The primary category the track belongs to.

```yaml
category: "Utility"
```

### `categories`

A list of additional categories the track can be classified under.

```yaml
categories:
  - "Tools"
  - "Performance"
```

### `icon`

The URL or path to an icon image for the track.

```yaml
icon: "https://example.com/icon.png"
```

### `cover`

The URL or path to a cover image for the track.

```yaml
cover: "https://example.com/cover.png"
```

### `screenshots`

A list of URLs or paths to screenshots of the track.

```yaml
screenshots:
  - "https://example.com/screenshot1.png"
  - "https://example.com/screenshot2.png"
```

### `readme`

A URL to the README file, which contains details about the track.

```yaml
readme: "https://github.com/owner/project#readme"
```

### `require`

A list of dependencies or other tracks that the current track requires.

```yaml
require:
  - "track1"
  - "track2"
```

### `note`

Additional notes about the track, with optional `color`, `title`, and `message`.

```yaml
note:
  color: "red"
  title: "Important Update"
  message: "This track requires an update to version 2.0."
```

### `features`

Flags indicating which features the track supports:

```yaml
features:
  service: true
  post_fs_data: true
  resetprop: true
  sepolicy: true
  zygisk: true
  apks: true
  webroot: true
  post_mount: true
  boot_completed: true
  modconf: true
```

### `manager`

Configurations for different package managers required for the track, such as Magisk, KernelSU, etc. Each entry defines:

- `min`: The minimum version of the manager required.
- `devices`: A list of supported devices.
- `arch`: A list of supported architectures.
- `require`: Additional dependencies for the specific manager.

```yaml
manager:
  magisk:
    min: 25200
    devices:
      - "device1"
    arch:
      - "arm64-v8a"
    require:
      - "module1"
  kernelsu:
    min: 10000
    devices:
      - "device2"
    arch:
      - "x86_64"
    require:
      - "module2"
```

### `antifeatures`

A list of anti-features, specifying features that the track intentionally does not support.

```yaml
antifeatures:
  - "feature1"
  - "feature2"
```

### `options`

Configuration options for the track, such as archive compression and remote metadata handling.

```yaml
options:
  archive:
    compression: "gzip"
  disableRemoteMetadata: true
```

### `arch` (required)

A list of device architectures that the track supports. This is typically defined by the CPU architecture.

```yaml
arch:
  - "arm64-v8a"
  - "x86_64"
```

### `devices` (required)

A list of supported device model IDs for the track. This helps to limit compatibility to specific devices.

```yaml
devices:
  - "SM-A705FN"
  - "SM-G960F"
```