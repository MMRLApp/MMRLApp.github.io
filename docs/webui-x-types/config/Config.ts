import { Require } from "./Require";

type BackInterceptor = "native" | "javascript" | boolean | null;

export interface Config {
  /**
   * Configuration for required dependencies for the WebUI.
   */
  require: Require;

  /**
   * List of permissions required by the Web UI.
   */
  permissions: Array<string>;

  /**
   * Whether the WebUI should fallback to the `historyFallbackFile` if a route is not found.
   * @default false
   */
  historyFallback: boolean;

  /**
   * The title of the WebUI window. If null, the default title of the underlying platform will be used.
   */
  title: string | null;

  /**
   * The path to the icon of the WebUI. If null, the default icon of the underlying platform will be used.
   */
  icon: string | null;

  /**
   * Whether the WebUI window should be resizable.
   * @default true
   */
  windowResize: boolean;

  /**
   * @deprecated
   * Use `backInterceptor` instead.
   * Whether the WebUI should handle the back button/gesture events.
   * @default true
   */
  backHandler: boolean | null;

  /**
   * The interceptor to use for the back button/gesture events. If set to `null` or `false`, the default behavior of the underlying platform will be used.
   * @default null
   */
  backInterceptor: BackInterceptor;

  /**
   * Whether the WebUI should support pull-to-refresh functionality.
   * This is typically used in mobile web applications to allow users to refresh the content by pulling down.
   * @default true
   */
  pullToRefresh: boolean;

  /**
   * Whether the WebUI should show a confirmation dialog when the user tries to exit.
   * @default true
   */
  exitConfirm: boolean;

  /**
   * The file to use as a fallback when `historyFallback` is enabled.
   * @default "index.html"
   */
  historyFallbackFile: string;
}
