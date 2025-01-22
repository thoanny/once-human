<script setup>
    const { data } = useAPI(`/once-human/items/${useRoute().params.id}`);
</script>

<template>
    <div class="container mx-auto my-6" v-if="data">
        <h1 class="flex gap-2 items-center font-bold text-xl">
            <img :src="data.item.iconUrl" v-if="data.item.iconUrl" class="size-12 border-2 border-green-400 rounded" />
            {{ data.item.name }}
        </h1>
        <div>{{ data.item.category.name }}</div>
        <div v-if="data.item.description">
            {{ data.item.description }}
        </div>
        <div v-if="data.item.howToGet">
            {{ data.item.howToGet }}
        </div>
        
        <div v-if="data.scenarios.length > 0">
            <span class="badge badge-neutral" v-for="scenario in data.scenarios" :key="scenario.id">{{ scenario.name }}</span>
        </div>

        <div v-if="data.recipes.length > 0">
            <h2>Recettes</h2>
        </div>

        <pre>{{ data }}</pre>
    </div>
</template>