<script setup>
import { ref, onMounted } from "vue"
import { repositories, Repository } from "../../data/repositories"

const repos = ref([])
const repoCount = ref(0)
const moduleCount = ref(0)

onMounted(async () => {
  let totalModules = 0

  const fetchedRepos = await Promise.all(
    repositories.map(async (repo) => {
      const r = new Repository(repo.url)
      try {
        const response = await fetch(r.modules)
        const data = await response.json()
        totalModules += data.modules.length

        return {
          name: r.name,
          href: r.id,
        }
      } catch {
        return null // ignore failed fetches
      }
    })
  )

  const successfulRepos = fetchedRepos.filter(Boolean)

  repos.value = successfulRepos
  repoCount.value = successfulRepos.length
  moduleCount.value = totalModules
})
</script>

<h1>Repositories</h1>

<p>
  As of now, the MMRL provides access to <strong style="color: var(--vp-c-brand-1);">{{ repoCount }}</strong> repositories,
  encompassing more than <strong style="color: var(--vp-c-brand-1);">{{ moduleCount }}</strong> modules in total.
  These are continually maintained to ensure up-to-date functionality and compatibility.
</p>

:::info
The website will be every 6 (six) hours re-deployed so that every repository will be updated at [mmrl.dev](https://mmrl.dev)!
:::

<ol>
  <li v-for="repository in repos" :key="repository.href">
    <a :href="repository.href">{{ repository.name }}</a>
  </li>
</ol>

