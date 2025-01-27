# Recommended Repositories

::: info
Some repositories don't use the MMRL Repo format. Those repositories may lack of functionality
:::

<script setup>
import data from '../repos.json'
</script>

<table>
   <thead>
      <tr>
         <th>Name</th>
         <th>URL</th>
      </tr>
   </thead>
   <tbody>
    <tr v-for="repo in data" :key="repo.url">
        <td>{{ repo.name }}</td>
        <td><a :href="repo.url" target="_blank" rel="noreferrer">{{ repo.url }}</a></td>
    </tr>
   </tbody>
</table>