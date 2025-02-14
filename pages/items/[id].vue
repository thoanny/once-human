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
    title: `${data.value.item.name} (${data.value.item.category.name})`,
    ogTitle: `${data.value.item.name} (${data.value.item.category.name})`,
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
    <div class="bg-base-200/75 mb-4" v-else>
        <div class="py-3 px-4" :class="`bg-oh-${data.item.rarity}`">
            <h1 class="font-bold text-xl">
                {{ data.item.name }}
            </h1>
            <div>{{ data.item.category.name }}</div>
        </div>

        <MDC
            :value="data.item.description"
            v-if="data.item.description"
            class="markdown item py-3 px-4"
        />
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

            <div>
                <div
                    v-for="recipe in data.recipes"
                    :key="recipe.id"
                    class="grid grid-cols-13 gap-1 p-2 items-center"
                >
                    <div
                        class="col-span-2 w-full aspect-square p-1 border relative"
                        :class="`border-oh-${data.item.rarity} bg-oh-item-${data.item.rarity}`"
                    >
                        <img
                            :src="data.item.iconUrl ?? '/img/default-item.png'"
                            :class="{ 'opacity-75': !data.item.iconUrl }"
                            alt=""
                        />
                        <span class="text-xs font-semibold text-white absolute bottom-1 right-1">
                            {{ recipe.quantity }}
                        </span>
                    </div>
                    <div class="text-center text-xl font-bold">=</div>
                    <div
                        class="col-span-2 w-full aspect-square tooltip p-1 border relative border-accent"
                        :data-tip="recipe.workshop.name"
                        :class="`bg-oh-item-${recipe.workshop.rarity}`"
                        v-if="recipe.workshop"
                    >
                        <img
                            :src="recipe.workshop.iconUrl ?? '/img/default-item.png'"
                            :class="{ 'opacity-75': !recipe.workshop.iconUrl }"
                            alt=""
                        />
                        <span class="text-xs font-semibold text-white absolute bottom-1 right-1">
                            {{ recipe.duration }}s
                        </span>
                    </div>
                    <div
                        v-for="ingredient in recipe.ingredients"
                        :key="ingredient.id"
                        class="col-span-2 w-full aspect-square tooltip p-1 border relative"
                        :data-tip="ingredient.item.name"
                        :class="`border-oh-${ingredient.item.rarity} bg-oh-item-${ingredient.item.rarity}`"
                    >
                        <img
                            :src="ingredient.item.iconUrl ?? '/img/default-item.png'"
                            :class="{ 'opacity-75': !ingredient.item.iconUrl }"
                            alt=""
                        />
                        <span class="text-xs font-semibold text-white absolute bottom-1 right-1">
                            {{ ingredient.quantity }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- <DevOnly>
            <pre>{{ data }}</pre>
        </DevOnly> -->
    </div>
</template>
