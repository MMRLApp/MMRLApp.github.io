interface Package {
  code: number;
  packageName: string | Array<string>;
  supportText: string | null;
  supportLink: string | null;
}

/**
 * @deprecated
 */
interface Version {
  required: number;
  supportText: string | null;
  supportLink: string | null;
}

export interface Require {
  packages: Array<Package>;
  /**
   * @deprecated
   * Use `packages` instead.
   */
  version: Version;
}
