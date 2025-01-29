<script setup>
useSeoMeta({
    title: 'Fansite Once Human',
    ogTitle: 'Fansite Once Human',
    description:
        'Découvrez notre fansite dédié à Once Human : une base de données et des outils exclusifs pour la communauté francophone !',
    ogDescription:
        'Découvrez notre fansite dédié à Once Human : une base de données et des outils exclusifs pour la communauté francophone !',
});

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Fansite Once Human` : 'Fansite Once Human';
    },
});
</script>

<template>
    <div>
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
