export interface WXUserInfo {
  getName(): string;
  getId(): number;
  isPrimary(): boolean;
  isAdmin(): boolean;
  isEnabled(): boolean;
}
