import { repositories, Repository } from "../../data/repositories";

const parsedRepos = repositories.map((repo) => {
  const myRepo = new Repository(repo.url);

  return {
    params: {
      title: myRepo.name,
      name: myRepo.id,
      url: myRepo.url,
    },
  };
});

export default {
  paths() {
    return parsedRepos;
  },
};
