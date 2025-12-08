---
title: Thank You
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers, VPTeamPageSection } from "vitepress/theme";

import { data } from "../data/contributors.data.ts";
import sponsors from "../../meta/sponsors.json";

function toDollars(amount, divideBy = 100.0) {
  return `$${(amount / divideBy).toFixed(2)}`;
}

const github = {
  svg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>`
}

const commit = {
  svg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-git-commit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 3l0 6" /><path d="M12 15l0 6" /></svg>`
}

const _sponsors = sponsors
  .map((spon) => {
    return {
      avatar: spon.avatarUrl,
      name: spon.login,
      title: `${toDollars(spon.amount)} in total`,
      links: [
        {
          icon: github,
          link: spon.url,
        },
      ],
    };
  })
  .sort((a, b) => b.amount - a.amount);

const totalSponsored = sponsors.reduce((acc, current) => acc + current.amount, 0);

const excludedContris = ["DerGoogler", "dependabot[bot]", "weblate", "copilot"]

const contributorsExluded = data
  .filter((con) => !excludedContris.includes(con.login))

  const contributors = contributorsExluded.map((contri) => ({
    avatar: contri.avatar_url,
    name: contri.login,
    title: `${contri.contributions} contribution/s`,
    links: [
      {
        icon: github,
        link: contri.html_url,
      },
        {
        icon: commit,
        link: `https://github.com/MMRLApp/MMRL/commits?author=${contri.login}`,
      },
    ],
  }))
  .sort((a, b) => b.contributions - a.contributions);


const totalContributions = contributorsExluded.reduce((acc, current) => acc + current.contributions, 0);

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Sponsors</template>
    <template #lead><u>{{ toDollars(totalSponsored) }}</u> have been total sponsored</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="_sponsors" />
  <VPTeamPageSection>
    <template #title>Contributors</template>
    <template #lead><u>{{ totalContributions }}</u> total community contributions</template>
    <template #members>
      <VPTeamMembers size="small" :members="contributors" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
