---
editLink: false
prev: false
next: false
---

<script setup>
import { ref, onMounted, computed } from "vue";
import { useData } from 'vitepress'
import { repositories, Repository } from '../../data/repositories'

import ModuleItem from '../../components/repository/ModuleItem.vue'
import RepoHeader from '../../components/repository/RepoHeader.vue'

const { params } = useData()
const repository = computed(()=> new Repository(params.value.url))

const data = ref(null);

onMounted(async () => {
  const response = await fetch(
    repository.value.modules
  );
  data.value = await response.json();
});

const repoHeader = computed(()=> {
  const { modules, ...rest } = data.value;
  return { url: repository.value.url, ...rest };
})

const openUrl = (url) => {
  window.open(url);
};
</script>

<div v-if="data">
    <RepoHeader :repo="repoHeader" />
    <div :class="$style.items" v-for="module in data.modules">
        <div :class="$style.item">
            <ModuleItem :module="module" />
        </div>
    </div>
</div>

<style scoped>
a {
    color: inherit !important;
    text-decoration: none !important;
}
</style>

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
