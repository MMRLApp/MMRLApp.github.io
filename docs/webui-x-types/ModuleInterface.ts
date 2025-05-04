declare var $module_id: ModuleInterface; // accesspoint for webui-x

interface ModuleInterface {
  getWindowTopInset(): number;
  getWindowBottomInset(): number;
  getWindowLeftInset(): number;
  getWindowRightInset(): number;
  isLightNavigationBars(): boolean;
  isDarkMode(): boolean;
  setLightNavigationBars(isLight: boolean): void;
  isLightStatusBars(): boolean;
  setLightStatusBars(isLight: boolean): void;
  getSdk(): number;
  shareText(text: string): void;
  /* overload */ shareText(text: string, type: string): void;
  getRecomposeCount(): number;
  /**
   * Reloads the entire WebUI
   */
  recompose(): void;
  createShortcut(): void;
  /* overload */ createShortcut(title: string | null, icon: string | null): void;
  hasShortcut(): boolean;
}
