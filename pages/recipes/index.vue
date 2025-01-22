<script setup>
    const runtimeConfig = useRuntimeConfig();
    const { data } = await useFetch(runtimeConfig.public.apiURL+'/once-human/recipes');
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Recipes</h1>

        <div class="grid grid-cols-3 gap-4 my-6">
            <NuxtLink :to="{name: 'recipes-id', params: {id: recipe.id}}" v-for="recipe in data.recipes" :key="recipe.id" class="border p-6 rounded-box">
                <h4 class="flex gap-2 items-center font-bold text-xl">
                    {{ recipe.quantity }}&nbsp;&times; {{ recipe.item.name }}
                </h4>
                <div class="text-sm">→ {{ recipe.workshop.name }}</div>
            </NuxtLink>
        </div>

        <pre>{{ data }}</pre>
    </div>
</template>