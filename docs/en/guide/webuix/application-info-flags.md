
# Android Application Info Flags

This documentation covers Android Application Info flags, which provide detailed information about installed applications on Android devices. These flags are part of the `ApplicationInfo` class and can be accessed through the Package Manager.

## Overview

Application Info flags are bitwise flags that describe various properties and capabilities of an Android application. They are stored as integer values where each bit position represents a specific application characteristic.

## Getting Application Info

To retrieve application information and flags, use the Package Manager:

```javascript
// To use the `global` variable you require the WXU Plugin
const pm = global.require("pm")
const info = JSON.parse(pm.getApplicationInfo("com.goolag.pif"))

let number = info.flags;
// flag for system apps
let flag = 1<<0;

if ((number & flag) != 0) {
    console.log("This app is a system app");
} else {
    console.log("This app is not a system app");
}
```

## Understanding Bit Shifting

Before diving into the flags, it's important to understand bit shifting operations:

### What is Bit Shifting?

Bit shifting is a bitwise operation that moves bits to the left or right. In the context of Android flags:

- `1<<0` means shift the bit 1 zero positions to the left, resulting in: `00000001` (decimal 1)
- `1<<1` means shift the bit 1 one position to the left, resulting in: `00000010` (decimal 2)
- `1<<2` means shift the bit 1 two positions to the left, resulting in: `00000100` (decimal 4)

### Why Use Bit Shifting for Flags?

1. **Memory Efficiency**: Multiple boolean values can be stored in a single integer
2. **Performance**: Bitwise operations are very fast
3. **Compatibility**: Allows for easy addition of new flags without breaking existing code

### Checking if a Flag is Set

To check if a specific flag is set, use the bitwise AND operator (`&`):

```javascript
const FLAG_SYSTEM = 1<<0;  // Value: 1
const FLAG_DEBUGGABLE = 1<<1;  // Value: 2

// Check if app is a system app
if ((info.flags & FLAG_SYSTEM) != 0) {
    console.log("System app");
}

// Check if app is debuggable
if ((info.flags & FLAG_DEBUGGABLE) != 0) {
    console.log("Debuggable app");
}
```

## Complete Application Info Flags Reference

Here are all the available Application Info flags with their descriptions:

### Core Application Flags

| Flag | Value | Description |
|------|-------|-------------|
| `FLAG_SYSTEM` | `1<<0` (1) | Application is installed in the device's system image |
| `FLAG_DEBUGGABLE` | `1<<1` (2) | Application allows debugging of its code |
| `FLAG_HAS_CODE` | `1<<2` (4) | Application has code associated with it |
| `FLAG_PERSISTENT` | `1<<3` (8) | Application is persistent |
| `FLAG_FACTORY_TEST` | `1<<4` (16) | Application holds FACTORY_TEST permission |
| `FLAG_ALLOW_TASK_REPARENTING` | `1<<5` (32) | Allows task reparenting |
| `FLAG_ALLOW_CLEAR_USER_DATA` | `1<<6` (64) | Allows clearing user data |
| `FLAG_UPDATED_SYSTEM_APP` | `1<<7` (128) | System app that has been updated |
| `FLAG_TEST_ONLY` | `1<<8` (256) | Application is for testing only |

### Screen Support Flags

| Flag | Value | Description |
|------|-------|-------------|
| `FLAG_SUPPORTS_SMALL_SCREENS` | `1<<9` (512) | Supports small screens |
| `FLAG_SUPPORTS_NORMAL_SCREENS` | `1<<10` (1024) | Supports normal screens |
| `FLAG_SUPPORTS_LARGE_SCREENS` | `1<<11` (2048) | Supports large screens |
| `FLAG_RESIZEABLE_FOR_SCREENS` | `1<<12` (4096) | UI can adjust for different screen sizes |
| `FLAG_SUPPORTS_SCREEN_DENSITIES` | `1<<13` (8192) | Supports different screen densities (deprecated) |
| `FLAG_SUPPORTS_XLARGE_SCREENS` | `1<<19` (524288) | Supports extra large screens |

### System and Security Flags

| Flag | Value | Description |
|------|-------|-------------|
| `FLAG_VM_SAFE_MODE` | `1<<14` (16384) | VM operates in safe mode |
| `FLAG_ALLOW_BACKUP` | `1<<15` (32768) | Allows OS-driven backups |
| `FLAG_KILL_AFTER_RESTORE` | `1<<16` (65536) | Killed after restore operation |
| `FLAG_RESTORE_ANY_VERSION` | `1<<17` (131072) | Can restore from future versions |
| `FLAG_EXTERNAL_STORAGE` | `1<<18` (262144) | Installed on external storage |
| `FLAG_LARGE_HEAP` | `1<<20` (1048576) | Requests large heap |
| `FLAG_STOPPED` | `1<<21` (2097152) | Package is in stopped state |
| `FLAG_SUPPORTS_RTL` | `1<<22` (4194304) | Supports right-to-left layouts |
| `FLAG_INSTALLED` | `1<<23` (8388608) | Currently installed for calling user |
| `FLAG_IS_DATA_ONLY` | `1<<24` (16777216) | Only data is installed |
| `FLAG_FULL_BACKUP_ONLY` | `1<<26` (67108864) | Uses full-data streaming backups |
| `FLAG_USES_CLEARTEXT_TRAFFIC` | `1<<27` (134217728) | May use cleartext network traffic |
| `FLAG_EXTRACT_NATIVE_LIBS` | `1<<28` (268435456) | Extracts native libraries |
| `FLAG_HARDWARE_ACCELERATED` | `1<<29` (536870912) | Hardware accelerated rendering |
| `FLAG_SUSPENDED` | `1<<30` (1073741824) | Package is suspended |
| `FLAG_MULTIARCH` | `1<<31` (2147483648) | Code may be loaded into other processes |

### Deprecated Flags

| Flag | Value | Description |
|------|-------|-------------|
| `FLAG_IS_GAME` | `1<<25` (33554432) | Application is a game (deprecated, use CATEGORY_GAME instead) |

## Practical Examples

### Example 1: Checking Multiple Flags

```javascript
const info = JSON.parse(pm.getApplicationInfo("com.example.app"));
const flags = info.flags;

// Define flag constants
const FLAG_SYSTEM = 1<<0;
const FLAG_DEBUGGABLE = 1<<1;
const FLAG_ALLOW_BACKUP = 1<<15;

// Check multiple flags
const isSystem = (flags & FLAG_SYSTEM) != 0;
const isDebuggable = (flags & FLAG_DEBUGGABLE) != 0;
const allowsBackup = (flags & FLAG_ALLOW_BACKUP) != 0;

console.log(`System app: ${isSystem}`);
console.log(`Debuggable: ${isDebuggable}`);
console.log(`Allows backup: ${allowsBackup}`);
```

### Example 2: Creating a Flag Checker Function

```javascript
function checkAppFlags(packageName) {
    const info = JSON.parse(pm.getApplicationInfo(packageName));
    const flags = info.flags;
    
    const flagChecks = {
        'System App': (flags & (1<<0)) != 0,
        'Debuggable': (flags & (1<<1)) != 0,
        'Has Code': (flags & (1<<2)) != 0,
        'Persistent': (flags & (1<<3)) != 0,
        'Updated System App': (flags & (1<<7)) != 0,
        'Test Only': (flags & (1<<8)) != 0,
        'External Storage': (flags & (1<<18)) != 0,
        'Large Heap': (flags & (1<<20)) != 0,
        'Stopped': (flags & (1<<21)) != 0,
        'Suspended': (flags & (1<<30)) != 0
    };
    
    console.log(`Flags for ${packageName}:`);
    for (const [flagName, isSet] of Object.entries(flagChecks)) {
        console.log(`  ${flagName}: ${isSet}`);
    }
}

// Usage
checkAppFlags("com.android.settings");
```

## Important Notes

1. **Security Warning**: Don't use `FLAG_SYSTEM` for security decisions. Use signature checks or permissions instead.

2. **API Level Considerations**: Some flags may behave differently or be ignored on certain Android API levels.

3. **Performance**: Bitwise operations are very efficient, making flag checking fast even for multiple flags.

4. **Future Compatibility**: New flags may be added in future Android versions, so always check documentation for the target API level.

## See Also

- [Android Developer Documentation - ApplicationInfo](https://developer.android.com/reference/android/content/pm/ApplicationInfo)
- [Bitwise Operations in Programming](https://en.wikipedia.org/wiki/Bitwise_operation)
- [Package Manager API Reference](https://developer.android.com/reference/android/content/pm/PackageManager)