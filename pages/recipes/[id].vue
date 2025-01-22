<script setup>
    const { data } = useAPI(`/once-human/recipes/${useRoute().params.id}`);
</script>

<template>
    <div class="container mx-auto my-6" v-if="data">
        <h1 class="flex gap-2 items-center font-bold text-xl">
            <img :src="data.recipe.item.iconUrl" v-if="data.recipe.item.iconUrl" class="size-12 border-2 border-green-400 rounded" />
            {{ data.recipe.quantity }}&nbsp;&times; {{ data.recipe.item.name }}
        </h1>
        <div v-if="data.recipe.duration">{{ data.recipe.duration }}&nbsp;s.</div>
        <div>→ {{ data.recipe.workshop.name }}</div>
        <div>{{ data.recipe.item.category?.name }}</div>
        <div v-if="data.recipe.item.description">
            {{ data.recipe.item.description }}
        </div>

        <h2>Ingrédients</h2>

        <ul>
            <li v-for="ingredient in data.ingredients" :key="ingredient.id">
                {{ ingredient.quantity }}&nbsp;&times; <NuxtLink :to="{name: 'items-id', params: {id: ingredient.item.id}}">{{ ingredient.item.name }}</NuxtLink>
            </li>
        </ul>

        <!-- 
        <div v-if="data.item.howToGet">
            {{ data.item.howToGet }}
        </div>
        
        <div v-if="data.scenarios.length > 0">
            <span class="badge badge-neutral" v-for="scenario in data.scenarios" :key="scenario.id">{{ scenario.name }}</span>
        </div>

        <div v-if="data.recipes.length > 0">
            <h2>Recettes</h2>
        </div> -->

        <pre>{{ data }}</pre>
    </div>
</template>