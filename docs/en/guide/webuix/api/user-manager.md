# UserManager API

```ts
declare var $userManager: UserManagerInterface;

interface WXUserInfo {
  getName(): string;
  getId(): number;
  isPrimary(): boolean;
  isAdmin(): boolean;
  isEnabled(): boolean;
}

interface UserManagerInterface {
  /**
   * This is a JSON string and needs to be parsed with `JSON.parse(...)`
   */
  getUsers(): string;
  getUserInfo(userId: number): WXUserInfo;
}
```
