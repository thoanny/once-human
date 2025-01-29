<script setup>
const { data, status } = await useAPI(`/once-human/items`);

useSeoMeta({
    title: 'Inventaire',
    ogTitle: 'Inventaire',
    description: 'Base de données des objets et des formules associées.',
    ogDescription: 'Base de données des objets et des formules associées.',
});

defineOgImageComponent('OHF', {
    title: 'Inventaire',
    description: 'Base de données des objets et des formules associées.',
});
</script>

<template>
    <div class="container max-w-6xl mx-auto my-6">
        <h1>Inventaire</h1>

        <AppLoading v-if="status === 'pending'" />
        <div class="flex flex-col-reverse md:flex-row items-start gap-4 my-6" v-else>
            <div class="bg-base-200/75 p-4 rounded-box">
                <!-- <div>xxx</div> -->
                <div
                    class="grid grid-cols-4 lg:grid-cols-7 gap-2 shrink-0 pr-4 scroll"
                    id="inventory"
                >
                    <NuxtLink
                        :to="{ name: 'items-id', params: { id: item.id } }"
                        v-for="item in data?.items"
                        :key="item.id"
                        class="size-20 border-2 shrink-0"
                        :class="`border-oh-${item.rarity}`"
                    >
                        <img :src="item.iconUrl" v-if="item.iconUrl" class="w-full h-full" />
                    </NuxtLink>
                </div>
            </div>

            <div class="flex-1 overflow-hidden">
                <NuxtPage />
            </div>
        </div>

        <!-- <DevOnly>
            <pre>{{ data?.items }}</pre>
        </DevOnly> -->
    </div>
</template>

<style scoped>
.scroll {
    max-height: calc(100dvh - 16rem);
}

#inventory .router-link-active {
    border-color: #68fdd6;
    position: relative;
}

#inventory .router-link-active:after {
    content: '';
    display: block;
    box-shadow: inset 0 0 5px 1px #68fdd6;
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
}
</style>
