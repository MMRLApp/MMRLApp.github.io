import { repositories } from "../data/repositories";

const parsedRepos = repositories.map((repo) => {
  return {
    params: {
      name: repo.slug,
    },
  };
});

export default {
  paths() {
    return parsedRepos;
  },
};
