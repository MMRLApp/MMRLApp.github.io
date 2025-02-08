declare let list: any;

async function getContributors(repoName, page = 1) {
    let request = await fetch(`https://api.github.com/repos/${repoName}/contributors?per_page=100&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let contributorsList = await request.json();
    return contributorsList;
};

async function getAlllContributors(repoName) {
    let contributors = [];
    let page = 1;

    do {
        list = await getContributors(repoName, page);
        contributors = contributors.concat(list);
        page++;
    } while ((await list).length > 0);
    return contributors;
}

async function getAllContributorsRecursive(repoName, page = 1, allContributors = []) {
    const list = await getContributors(repoName, page);
    allContributors = allContributors.concat(list);

    if (list.length === 100) {
        return getAllContributorsRecursive(repoName, page + 1, allContributors);
    }
    return allContributors;
}

export default {
  async load() {
    return await getAllContributorsRecursive("MMRLApp/MMRL");
  },
};
