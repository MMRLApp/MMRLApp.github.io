---
title: Magisk Module Repositories - Browse & Install Modules
description: Discover trusted Magisk module repositories with thousands of modules. Browse, search, and install modules for Magisk, KernelSU, and APatch. Updated every 6 hours.
---

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
          moduleCount: data.modules.length,
          cover: data.cover,
          description: data.description || "Browse modules from this repository"
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

<!-- App Store Hero Section -->
<div :class="$style.heroSection">
  <h1 :class="$style.heroTitle">Module Repositories</h1>
  <p :class="$style.heroSubtitle">
    Discover and install modules from <strong>{{ repoCount }}</strong> trusted repositories,
    featuring over <strong>{{ moduleCount }}</strong> modules for your device.
  </p>
  
  <div :class="$style.statsCards">
    <div :class="$style.statCard">
      <div :class="$style.statNumber">{{ repoCount }}</div>
      <div :class="$style.statLabel">Repositories</div>
    </div>
    <div :class="$style.statCard">
      <div :class="$style.statNumber">{{ moduleCount }}+</div>
      <div :class="$style.statLabel">Available Modules</div>
    </div>
  </div>
</div>

:::info Auto-Updates
The website automatically re-deploys every 6 hours to ensure all repositories are up-to-date at [mmrl.dev](https://mmrl.dev)!
:::

<!-- Repository Grid -->
<div :class="$style.repositoryGrid">
  <a v-for="repository in repos" :key="repository.href" :href="repository.href" :class="$style.repoCard">
    <img v-if="repository.cover" :class="$style.repoCover" :src="repository.cover" />
    <div :class="$style.repoContainer">
      <div :class="$style.repoHeader">
        <div :class="$style.repoIcon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </div>
        <div :class="$style.repoInfo">
          <h3 :class="$style.repoName">{{ repository.name }}</h3>
          <p :class="$style.repoDescription">{{ repository.description }}</p>
        </div>
        <div :class="$style.moduleCount">
          <span :class="$style.countNumber">{{ repository.moduleCount }}</span>
          <span :class="$style.countLabel">modules</span>
        </div>
      </div>
      <div :class="$style.repoFooter">
        <span :class="$style.exploreText">Tap to explore →</span>
      </div>
    </div>
  </a>
</div>

<style module>
.heroSection {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 32px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.heroTitle {
  font-size: 42px !important;
  font-weight: 800 !important;
  margin: 0 0 16px 0 !important;
  color: var(--vp-c-text-1) !important;
  border: none !important;
  padding: 0 !important;
}

.heroSubtitle {
  font-size: 18px;
  color: var(--vp-c-text-2);
  margin: 0 0 32px 0;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.statsCards {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.statCard {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 24px;
  min-width: 120px;
  text-align: center;
}

.statNumber {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
}

.statLabel {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.repositoryGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.repoCard {
  display: block;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  /*padding: 24px;*/
  text-decoration: none !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.repoCard:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.repoContainer {
  display: block;
  padding: 24px;
}
  
.repoCover {
  aspect-ratio: 2.048;
  object-fit: cover;
  border-radius: 16px 16px 0px 0px;
}

.repoHeader {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.repoIcon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repoInfo {
  flex: 1;
  min-width: 0;
}

.repoName {
  font-size: 20px !important;
  font-weight: 700 !important;
  margin: 0 0 8px 0 !important;
  color: var(--vp-c-text-1) !important;
  border: none !important;
  padding: 0 !important;
}

.repoDescription {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

.moduleCount {
  flex-shrink: 0;
  text-align: center;
  background: var(--vp-c-brand-soft);
  border-radius: 12px;
  padding: 8px 12px;
}

.countNumber {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.countLabel {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.repoFooter {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
  text-align: center;
}

.exploreText {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .heroSection {
    padding: 24px;
  }
  
  .heroTitle {
    font-size: 32px !important;
  }
  
  .repositoryGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .repoCard {
    /* padding: 20px; */
  }
  
  .repoHeader {
    gap: 12px;
  }
  
  .repoIcon {
    width: 40px;
    height: 40px;
  }
  
  .statsCards {
    gap: 16px;
  }
  
  .statCard {
    padding: 20px;
    min-width: 100px;
  }
}
</style>

