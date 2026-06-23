# Module API

::: danger Unpublished API!
You are currently viewing an unpublished version of the WebUI MX Engine API. This interface is subject to change at any time, including during internal development, alpha stages, and release candidate phases.
:::

::: details TypeScript Type Definition
```ts
/**
 * Absolute and derived paths used by the ADB-based module environment.
 */
interface AdbPath {
    /**
     * Root directory for all module-related data.
     */
    baseDir: string

    /**
     * Directory containing global configuration files.
     */
    configDir: string

    /**
     * Directory used for local, device-specific data.
     */
    localDir: string

    /**
     * Directory containing installed modules.
     */
    modulesDir: string
}

/**
 * File system paths associated with a specific module.
 */
interface ModulePath {
    /**
     * Directory containing the module's configuration files.
     */
    configDir: string

    /**
     * Root directory of the module.
     */
    moduleDir: string

    /**
     * Directory exposed as the module's web root.
     */
    webrootDir: string

    /**
     * Web UI configuration file.
     */
    webrootConfig: string

    /**
     * Entry-point Lua script for the web UI.
     */
    webrootLuaIndex: string

    /**
     * Module property file (typically `module.prop`).
     */
    propFile: string

    /**
     * Module action script.
     */
    actionFile: string

    /**
     * Service script executed by the module.
     */
    serviceFile: string

    /**
     * Script executed during the post-fs-data stage of boot.
     */
    postFsDataFile: string

    /**
     * Script executed after partitions are mounted.
     */
    postMountFile: string

    /**
     * File containing system property definitions.
     */
    systemPropFile: string

    /**
     * Script executed when the system boot process completes.
     */
    bootCompletedFile: string

    /**
     * SELinux policy file provided by the module.
     */
    sepolicyFile: string

    /**
     * Marker or script used during module uninstallation.
     */
    uninstallFile: string

    /**
     * Module-provided system directory.
     */
    systemDir: string

    /**
     * Marker file indicating the module is disabled.
     */
    disableFile: string

    /**
     * Marker file indicating the module should be removed.
     */
    removeFile: string

    /**
     * Marker file indicating the module should be updated.
     */
    updateFile: string

    /**
     * All files belonging to the module.
     */
    files: Array<string>

    /**
     * Service-related files associated with the module.
     */
    serviceFiles: Array<string>
}

/**
 * Metadata and paths describing an installed module.
 */
interface Module {
    /**
     * Unique module identifier.
     */
    id: string

    /**
     * Human-readable module name.
     */
    name: string

    /**
     * Name of the module author or maintainer.
     */
    author: string

    /**
     * Module version string.
     */
    version: string

    /**
     * Numeric version code used for update comparisons.
     */
    versionCode: number

    /**
     * Human-readable description of the module.
     */
    description: string

    /**
     * URL or path to the module update manifest.
     * `null` if the module does not provide update information.
     */
    updateJson: string | null

    /**
     * Global ADB-related paths available to the module environment.
     */
    adbPath: AdbPath

    /**
     * File system paths associated with this module.
     */
    path: ModulePath
}

/**
 * Global reference to the currently loaded module.
 */
declare var mod: Module
```
:::