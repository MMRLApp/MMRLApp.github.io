import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

export const fileName = join(__dirname, "../../meta/changelog.yaml");

export const changelog: any = parse(readFileSync(fileName, "utf8"));
export const changelogJSONstringify: string = JSON.stringify(
  changelog,
  null,
  4
);
