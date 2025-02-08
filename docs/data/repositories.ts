import repositories from "../../meta/repositories.json";

export { repositories };

interface RepositoryMember {
  avatar: string;
  name: string;
  title?: string;
  org?: string;
  orgLink?: string;
  desc?: string;
  links?: SocialLink[];
  sponsor?: string;
  actionText?: string;
}

interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
  ariaLabel?: string;
}

type SocialLinkIcon =
  | "discord"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "mastodon"
  | "npm"
  | "slack"
  | "twitter"
  | "x"
  | "youtube"
  | { svg: string }
  | string;

export interface RawRepository {
  name: string;
  url: string;
  members?: RepositoryMember[];
}

export class Repository {
  public repository: RawRepository;

  public constructor(public url: string) {
    const repo = repositories.find((repo) => repo.url === url);
    if (!repo) throw new Error(`Repository with URL ${url} not found`);
    this.repository = repo;
  }

  public get id() {
    const url = new URL(this.url);
    let cleanedText = url.hostname + url.pathname;
    cleanedText = cleanedText.replace(/[.:\/\-_]/g, "");

    const length = cleanedText.length;
    const middleStart = Math.floor((length - 3) / 2);
    const middleEnd = middleStart + 3;

    const firstThree = cleanedText.substring(0, 3);
    const middleThree = cleanedText.substring(middleStart, middleEnd);
    const lastThree = cleanedText.substring(length - 3);

    return firstThree + middleThree + lastThree;
  }

  public get name(): string {
    return this.repository.name;
  }

  public get members(): RepositoryMember[] {
    return this.repository.members;
  }

  public get modules(): string {
    return `${this.url}json/modules.json`;
  }

  public get config(): string {
    return `${this.url}json/config.json`;
  }

  public get mmrlUrl(): string {
    return this.url.replace(/^\w+:\/\/([^\/]+\/?.*?)\/?$/g, "$1");
  }
}
