# Application API

::: danger Unpublished API!
You are currently viewing an unpublished version of the WebUI MX Engine API. This interface is subject to change at any time, including during internal development, alpha stages, and release candidate phases.
:::

::: details TypeScript Type Definition
```ts
/**
 * Metadata describing the host Android application.
 */
interface Application {
    /** The application's unique package identifier (e.g. `"com.example.app"`). */
    packageName: string;

    /** The human-readable version name (e.g. `"1.4.2"`). */
    version: string;

    /** The internal integer version code used for update comparisons. */
    versionCode: number;
}

/**
 * Labels for the action buttons shown in a {@link DialogOptions} or {@link PromptOptions} dialog.
 */
interface DialogButtons {
    /**
     * Label for the primary/confirm button.
     *
     * @default "Confirm"
     */
    confirmText: string;

    /**
     * Label for the secondary/cancel button.
     *
     * @default "Cancel"
     */
    cancelText: string;
}

/**
 * Base configuration shared by all dialog types.
 *
 * Pass this to {@link WebUI.confirm} to show a simple yes/no dialog.
 * For an input dialog, use the extended {@link PromptOptions} instead.
 */
interface DialogOptions {
    /**
     * The dialog's heading text.
     *
     * @default "Confirm"
     */
    title: string;

    /**
     * Optional body text displayed beneath the title.
     *
     * @throws If the message was null
     */
    message: string;

    /**
     * Custom labels for the confirm and cancel buttons.
     *
     * @see DialogButtons
     */
    buttons: DialogButtons;

    /**
     * Material Design theme variant applied to the dialog.
     *
     * @default "md3"
     */
    theme: string;
}

/**
 * Configuration for a dialog that collects a text value from the user.
 *
 * Extends {@link DialogOptions} with input-specific settings.
 * Pass this to {@link WebUI.prompt}.
 *
 * @example
 * ```ts
 * const name = await webui.prompt({
 *   title: "Enter your name",
 *   message: null,
 *   default: "",
 *   launchKeyboard: true,
 *   buttons: { confirmText: "OK", cancelText: "Skip" },
 *   theme: "md3",
 * });
 * ```
 */
interface PromptOptions extends DialogOptions {
    /**
     * Pre-filled value shown in the input field when the dialog opens.
     *
     * @default ""
     */
    default: string;

    /**
     * Whether to open the soft keyboard automatically when the dialog appears.
     * Set to `false` to suppress the keyboard on devices where it would obscure the UI.
     *
     * @default true
     */
    launchKeyboard: boolean;
}

/**
 * The `webui` global exposes the native Android host's capabilities to the
 * embedded web page. All async methods return Promises that resolve once the
 * corresponding native operation completes.
 *
 * @example
 * ```ts
 * if (webui.isDarkMode) {
 *   document.documentElement.classList.add("dark");
 * }
 * ```
 *
 * @remarks
 * Some members are marked **subject to change** — their name or signature may
 * be altered in a future release without a major version bump.
 */
interface WebUI {
    /**
     * The Android platform SDK integer (e.g. `34` for Android 14).
     *
     * @remarks **Subject to change** — may be renamed to `platformSdk` in a future release.
     */
    buildSdk: number;

    /**
     * Metadata about the Android application hosting this WebUI.
     *
     * @see Application
     */
    currentApplication: Application;

    /**
     * `true` when the user has a home-screen shortcut pointing to this WebUI.
     *
     * @remarks **Subject to change** — not yet implemented; value is always `false`.
     */
    hasShortcut: boolean;

    /**
     * `true` when the device or app is using a dark color scheme.
     * Use this to synchronize the web page's theme with the host UI.
     */
    isDarkMode: boolean;

    /**
     * `true` when the host application is running in developer/debug mode.
     * Can be used to enable verbose logging or expose debug tooling in the UI.
     */
    isDebug: boolean;

    /**
     * Resolves to `true` if the WebView has a page in its back history.
     *
     * @returns A Promise that resolves to a boolean.
     */
    canGoBack(): Promise<boolean>;

    /**
     * Resolves to `true` if the WebView can navigate the given number of steps
     * through its history (positive = forward, negative = backward).
     *
     * @param steps - Number of history steps to check. Use negative values to
     *   check backward navigation (e.g. `-2` checks two steps back).
     * @returns A Promise that resolves to a boolean.
     */
    canGoBackOrForward(steps: number): Promise<boolean>;

    /**
     * Resolves to `true` if the WebView has a page in its forward history.
     *
     * @returns A Promise that resolves to a boolean.
     */
    canGoForward(): Promise<boolean>;

    /**
     * Pins a home-screen shortcut for this WebUI on the device launcher.
     *
     * @remarks **Subject to change** — not yet implemented. The return type will
     *   change to `Promise<boolean>` to indicate whether the shortcut was
     *   successfully created.
     */
    createShortcut(): void;

    /**
     * Closes the WebUI and returns control to the host application or launcher.
     */
    exit(): void;

    /**
     * Opens the Android share sheet so the user can send text to another app.
     *
     * @param text - The content to share.
     * @param mimeType - MIME type of the content. Defaults to `"text/plain"`.
     *
     * @example
     * ```ts
     * webui.shareText("https://example.com", "text/plain");
     * ```
     */
    shareText(text: string, mimeType?: string): void;

    /**
     * Shows a native confirmation dialog and resolves to `true` if the user
     * tapped the confirm button, or `false` if they tapped cancel or dismissed
     * the dialog.
     *
     * @param options - Dialog configuration. See {@link DialogOptions}.
     * @returns A Promise that resolves to `true` (confirmed) or `false` (cancelled).
     *
     * @example
     * ```ts
     * const ok = await webui.confirm({
     *   title: "Delete item?",
     *   message: "This action cannot be undone.",
     *   buttons: { confirmText: "Delete", cancelText: "Keep" },
     *   theme: "md3",
     * });
     * if (ok) deleteItem();
     * ```
     * 
     * @remarks **Unstable** — The current implementaion isn't stable enough
     */
    confirm(options: DialogOptions): Promise<boolean>;

    /**
     * Shows a native text-input dialog and resolves to the string the user
     * entered, or an empty string if they cancelled.
     *
     * @param options - Dialog and input configuration. See {@link PromptOptions}.
     * @param onValid - Optional callback invoked with the current input value
     *   whenever it changes. Return `true` to enable the confirm button, `false`
     *   to disable it (e.g. for live validation).
     * @returns A Promise that resolves to the submitted string, or `null` if cancelled.
     *
     * @example
     * ```ts
     * const email = await webui.prompt(
     *   {
     *     title: "Enter your email",
     *     message: null,
     *     default: "",
     *     launchKeyboard: true,
     *     buttons: { confirmText: "Submit", cancelText: "Cancel" },
     *     theme: "md3",
     *   },
     *   () => /\S+@\S+\.\S+/.test(currentInput),
     * );
     * ```
     * 
     * @remarks **Unstable** — The current implementaion isn't stable enough
     */
    prompt(options: PromptOptions, onValid?: () => boolean): Promise<string | null>;
}

/**
 * The global `webui` object injected by the Android host into `window`.
 *
 * Always check that `typeof webui !== "undefined"` before use if your page
 * can also run outside the host application (e.g. in a standard browser).
 *
 * @example
 * ```ts
 * if (typeof webui !== "undefined" && webui.isDarkMode) {
 *   document.documentElement.classList.add("dark");
 * }
 * ```
 */
declare var webui: WebUI;
```
:::
