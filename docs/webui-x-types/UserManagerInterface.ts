import { WXUserInfo } from "./WXUserInfo";

declare var $userManager: UserManagerInterface; // accesspoint for webui-x

interface UserManagerInterface {
  /**
   * This is a JSON string and needs to be parsed with `JSON.parse(...)`
   */
  getUsers(): string;
  getUserInfo(userId: number): WXUserInfo;
}
