import { repositories } from "../../../data/repositories";

export default {
    async paths() {
      const paths = await Promise.all(
        repositories.map(async (repo) => {
          const rep = await (await fetch(`${repo.url}json/modules.json`)).json();
  
          const modulePaths = await Promise.all(
            rep.modules.map(async (module) => {
              return {
                params: {
                  title: module.name,
                  description: module.description,
                  module: module,
                  name: repo.id,
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
  