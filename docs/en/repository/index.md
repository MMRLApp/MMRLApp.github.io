<script setup>
import repositories from '../../../meta/repositories.yaml'
</script>

# Repositories

:::info
The website will be every 6 (six) hours re-deployed so that every repository will be updated at [mmrl.dev](https://mmrl.dev)!
:::

<ul v-for="repository in repositories">
    <li>
        <a :href="repository.id">{{ repository.name }}</a>
    </li>
</ul>