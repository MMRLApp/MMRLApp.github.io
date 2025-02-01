# `repo.json` documentation

> [!TIP]
> Non-array- and non-objects can also placed inside the `module.prop` file!
>
> To use this feature you need to create a file named `common/repo.json` in your module root folder

Supported file formats:
- `.json`
- `.yaml` (recommended for specific root solutions)

---

> [!NOTE]
> To ensure that edited or newly added properties are visible in the repository, you need to increase your module's version code.

### support

The URL to your project's support page, forum, or issue tracker where users can get help or report problems.

Example:

```yaml
support: https://github.com/owner/project/issues
```

### donate

The URL to the donation page for your project, where users can financially support its development.

Example:

```yaml
donate: "https://example.com/donate"
```

### cover

The URL to a cover image representing the project. This should typically be a featured graphic for the project.

Example:

```yaml
cover: "https://example.com/cover.png"
```

### icon

The URL to the icon image of the project, which should be squared and no larger than 512x512 pixels.

Example:

```yaml
icon: "https://example.com/icon.png"
```

### license

An SPDX identifier specifying the license for the project.

<sub>_For SPDX identifiers, see the [SPDX license list](https://spdx.org/licenses/)._</sub>

Example:

```yaml
license: "MIT"
```

### readme

The URL to the project's README file, which typically contains information like a project description and setup instructions.

Example:

```yaml
readme: "https://github.com/owner/project#readme"
```

### homepage

The URL to the homepage of the project.

Example:

```yaml
homepage: "https://example.com"
```

### screenshots

An array of URLs to screenshots of the module.

Example:

```yaml
"screenshots": [
"https://example.com/screenshot1.png",
"https://example.com/screenshot2.png"
]
```

### category

> [!CAUTION]
> This property is not supported in MMRL V4 and above

The category the module belongs to. This field is deprecated.

Example:

```yaml
category: "Utility
```

### categories

> [!IMPORTANT]
> Repository owners can set a whitelist to prevent spam and abuse

An array of categories the module belongs to.

Example:

```yaml
categories: 
 - Utility
 - Tools
```

### devices

<sup>(avaiable above v5.30.40)</sup>

> [!NOTE]
> This property overrides the following properties in MMRL
> - `manager.magisk.devices`
> - `manager.kernelsu.devices`
> - `manager.ksunext.devices`
> - `manager.apatch.devices`
>
> Once this property is set, the above will be ignored.

An array of device model ID's which the module should work on. Get your model ID with `getprop ro.product.model`

Example:

```yaml
devices:
  - SM-A705FN" # will only work on the Samsung Galaxy A70
```

### arch

<sup>(avaiable above v5.30.40)</sup>

> [!NOTE]
> This property overrides the following properties in MMRL
> - `manager.magisk.arch`
> - `manager.kernelsu.arch`
> - `manager.ksunext.arch`
> - `manager.apatch.arch`
>
> Once this property is set, the above will be ignored.

An array of device architectures which the module should work on. Get your supported archs with `getprop ro.product.cpu.abilist`

Example:

```yaml
arch:
  - "arm64-v8a"
```

### require

> [!NOTE]
> This property overrides the following properties in MMRL
> - `manager.magisk.require`
> - `manager.kernelsu.require`
> - `manager.ksunext.require`
> - `manager.apatch.require`
>
> Once this property is set, the above will be ignored.

An array of `module_id`s this module depends on.

Example:

```yaml
require:
  - com.example.module1
  - com.example.module2
```

### note

> [!CAUTION]
> The `color` property is not supported in MMRL V4 and above

An additional note for the module. This is an optional field, but if it's defined, the `message` field is required.

Example:

```yaml
note:
  title: Important Update
  color: red
  message: This module requires Magisk version 24.0 or higher.
```

### manager

<sup>(avaiable above v5.30.40)</sup>

For the use if your module requires different modules on different root providers.

Available namespaces for `manager`

- `magisk`
- `kernelsu`
- `ksunext`
- `apatch`

_<sub>See also [FILE>require](#require), [FILE>devices](#devices), [FILE>arch](#arch)</sub>_

```yaml
manager:
  magisk:
    min: 25200,
    devices: []
    arch: []
    require: []
```