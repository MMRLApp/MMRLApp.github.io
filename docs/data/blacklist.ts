import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

export const fileName = join(__dirname, "../../meta/blacklist.yaml");

export const blacklist: any = parse(readFileSync(fileName, "utf8"));
export const blacklistJSONstringify: string = JSON.stringify(
  blacklist,
  null,
  4
);
