<script setup>
import { repositories, Repository } from "../../data/repositories";

const repos = repositories.map((repo)=> {
    const r = new Repository(repo.url)

    return {
        name: r.name,
        href: r.id
    }
})
</script>

# Repositories

:::info
The website will be every 6 (six) hours re-deployed so that every repository will be updated at [mmrl.dev](https://mmrl.dev)!
:::

<ol v-for="repository in repos">
    <li>
        <a :href="repository.href">{{ repository.name }}</a>
    </li>
</ol>
