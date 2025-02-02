---
editLink: false
prev: false
next: false
---

<script setup>
import { ref, onMounted } from "vue";
import { useData } from 'vitepress'
import repositories from '../../../meta/repositories.yaml'

import ModuleItem from '../../components/repository/ModuleItem.vue'
import RepoHeader from '../../components/repository/RepoHeader.vue'

const { params } = useData()

const name = params.value.name
const repository = repositories.find((repo) => repo.id === name)

const data = ref(null);

onMounted(async () => {
  const response = await fetch(
    `${repository.url}json/modules.json`
  );
  data.value = await response.json();
});

const openUrl = (url) => {
  window.open(url);
};
</script>

<div v-if="data">
    <RepoHeader :repo="data" />
    <div :class="$style.items" v-for="module in data.modules">
        <div :class="$style.item">
            <ModuleItem :module="module" :params="$params" />
        </div>
    </div>
</div>

<style module>
.item {
    padding: 8px;
    width: 100%;
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
}
</style>
