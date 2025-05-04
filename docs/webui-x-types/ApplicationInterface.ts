import { WXApp } from "./WXApp";

declare var webui: ApplicationInterface; // accesspoint for webui-x

export interface ApplicationInterface {
  getCurrentRootManager(): WXApp;
  getCurrentApplication(): WXApp;
  getApplication(packageName: string): WXApp;
}
