import { repositories, Repository } from "../../../data/repositories";

export default {
  async paths() {
    const paths = await Promise.all(
      repositories.map(async (repo) => {
        const r = new Repository(repo.url);

        const rep = await (await fetch(`${r.url}json/modules.json`)).json();

        const modulePaths = await Promise.all(
          rep.modules.map(async (module) => {
            return {
              params: {
                title: module.name,
                description: module.description,
                module: module,
                name: r.id,
                id: module.id,
              },
            };
          })
        );

        return modulePaths;
      })
    );

    return paths.flat();
  },
};
