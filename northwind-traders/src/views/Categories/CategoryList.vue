<template>
    <div>
        <h1>Categories</h1>
        <b-table striped hover :items="categories" :fields="fields"></b-table>
    </div>
</template>

<script>
import { CategoriesService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            fields: ['name', 'description', 'actions'],
            categories: []
        }
    },
    created() {
        this.fetchAll()
    },
    methods: {
        fetchAll() {
            CategoriesService.getAll()
                .then(result => (this.categories = result.data))
                .catch(error => console.error(error))
        }
    }
}
</script>

<style scoped>
</style>