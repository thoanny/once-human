<script setup>
const { data } = await useAPI('/tpotes');

const twitchTpotes = computed(() => {
    return data.value.tpotes.filter((tpote) => tpote.network === 'twitch');
});

const patreonTpotes = computed(() => {
    return data.value.tpotes.filter((tpote) => tpote.network === 'patreon');
});

useSeoMeta({
    title: 'Les T-potes',
    ogTitle: 'Les T-potes',
    description: 'Merci infiniment à tou·te·s mes abonné·e·s sur Twitch et Patreon !',
    ogDescription: 'Merci infiniment à tou·te·s mes abonné·e·s sur Twitch et Patreon !',
});

defineOgImageComponent('OHF', {
    title: 'Les T-potes',
    description: 'Merci infiniment à tou·te·s mes abonné·e·s sur Twitch et Patreon !',
});
</script>

<template>
    <div class="container mx-auto text-center max-w-2xl">
        <h1>🔥 Les T-potes 🔥</h1>
        <p><strong>Merci infiniment à tou·te·s mes abonné·e·s sur Twitch et Patreon !</strong></p>
        <p>
            Votre soutien fait toute la différence et me permet de continuer à créer du contenu et à
            travailler sur mes projets personnels. Que ce soit à travers vos abonnements ou vos
            encouragements, vous êtes une véritable source de motivation.
        </p>
        <p>Merci de croire en ce que je fais et de rendre cette aventure possible.</p>
        <p class="text-xl">💚</p>
        <h2>
            T-potes abonné·e·s via
            <a
                href="https://www.twitch.tv/thoanny"
                target="_blank"
                rel="nofollow"
                class="underline underline-offset-2"
                >Twitch</a
            >
        </h2>
        <div class="flex flex-wrap gap-2 justify-center mb-6 mt-2">
            <span
                v-for="tpote in twitchTpotes"
                :key="tpote.id"
                class="badge badge-accent badge-lg"
                :class="{ 'badge-outline': !tpote.active }"
            >
                {{ tpote.name }}
            </span>
        </div>
        <h2>
            T-potes abonné·e·s via
            <a
                href="https://www.patreon.com/thoanny"
                target="_blank"
                rel="nofollow"
                class="underline underline-offset-2"
                >Patreon</a
            >
        </h2>
        <div class="flex flex-wrap gap-2 justify-center mt-2 mb-6">
            <span
                v-for="tpote in patreonTpotes"
                :key="tpote.id"
                class="badge badge-accent badge-lg"
                :class="{ 'badge-outline': !tpote.active }"
            >
                {{ tpote.name }}
            </span>
        </div>
    </div>
</template>

<style scoped>
h1 {
    @apply my-6;
}

h2,
p {
    @apply mb-4;
}

.container {
    min-height: calc(100dvh - (5rem * 2) + 2px);
}

.badge-outline {
    @apply bg-base-200;
}
</style>
