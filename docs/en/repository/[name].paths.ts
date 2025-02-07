import { repositories } from "../../data/repositories";
import { generateRepoId } from "../../helper/generateRepoId";

const parsedRepos = repositories.map((repo) => {
  return {
    params: {
      title: repo.name,
      name: generateRepoId(repo.url),
      url: repo.url,
    },
  };
});

export default {
  paths() {
    return parsedRepos;
  },
};
