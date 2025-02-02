import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

export const fileName = join(__dirname, "../../meta/repositories.yaml");

export const repositories: any = parse(readFileSync(fileName, "utf8"));
export const repositoriesJSONstringify: string = JSON.stringify(
  repositories,
  null,
  4
);
