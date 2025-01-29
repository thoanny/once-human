<script setup>
const { data, status } = await useAPI(`/once-human/items/${useRoute().params.id}`);

const seoDescription = data.value?.item.description
    ? data.value?.item.description
          .split('---')
          .pop()
          .replace(/<[^>]*>?/gm, '')
          .replace(/\r?\n|\r/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
    : 'Découvrez notre fansite dédié à Once Human : une base de données et des outils exclusifs pour la communauté francophone !';

useSeoMeta({
    title: data.value.item.name,
    ogTitle: data.value.item.name,
    description: seoDescription,
    ogDescription: seoDescription,
});

defineOgImageComponent('OHF', {
    headline: data.value.item.category.name,
    title: data.value.item.name,
    description: seoDescription,
    icon: data.value.item.iconUrl,
    rarity: data.value.item.rarity,
});
</script>

<template>
    <AppLoading v-if="status === 'pending'" class="!my-0" />
    <div class="bg-base-200/75" v-else>
        <div class="py-3 px-4" :class="`bg-oh-${data.item.rarity}`">
            <h1 class="font-bold text-xl">
                {{ data.item.name }}
            </h1>
            <div>{{ data.item.category.name }}</div>
        </div>

        <div v-if="data.item.description" class="py-3 px-4">
            {{ data.item.description }}
        </div>
        <div v-if="data.item.howToGet">
            <div class="bg-base-100 font-bold py-3 px-4">Comment obtenir&nbsp;?</div>
            <div class="py-3 px-4">{{ data.item.howToGet }}</div>
        </div>

        <div v-if="data.scenarios.length > 0" class="py-3 px-4 gap-2 inline-flex flex-wrap">
            <span
                class="badge badge-sm badge-neutral"
                v-for="scenario in data.scenarios"
                :key="scenario.id"
            >
                {{ scenario.name }}
            </span>
        </div>

        <div v-if="data.recipes.length > 0">
            <div class="bg-base-100 font-bold py-3 px-4">
                {{ data.recipes.length > 1 ? 'Recettes' : 'Recette' }}
            </div>
            <ul id="recipes">
                <li v-for="recipe in data.recipes">
                    <NuxtLink
                        :to="{ name: 'recipes-id', params: { id: recipe.id } }"
                        class="flex flex-col py-3 px-4 hover:bg-base-300 hover:text-white"
                    >
                        <strong>{{ recipe.quantity }}&nbsp;&times; {{ data.item.name }}</strong>
                        <ul class="text-sm">
                            <li>
                                &mdash;&nbsp;{{ recipe.workshop.name }} ({{
                                    recipe.duration
                                }}&nbsp;sec.)
                                <ul class="border-l border-neutral pl-[.65rem] ml-[.45rem]">
                                    <li
                                        v-for="ingredient in recipe.ingredients"
                                        :key="ingredient.id"
                                    >
                                        {{ ingredient.quantity }}&nbsp;&times;
                                        {{ ingredient.item.name }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- <DevOnly>
            <pre>{{ data }}</pre>
        </DevOnly> -->
    </div>
</template>
