<script setup>
import { IconExternalLink } from '@tabler/icons-vue';
const props = defineProps({
    url: {
        type: String,
        default: 'https://discord.gg/QwnRGnsDxs',
    },
});
</script>
<template>
    <div class="flex flex-col items-start gap-2 bg-base-300/75 p-4 pt-3 relative">
        <span class="badge badge-accent relative sm:absolute sm:top-3 sm:right-4">Partenariat</span>
        <div class="font-bold w-full sm:pr-24">Serveur Discord OHFR</div>
        <div v-if="$slots.default"><MDCSlot :use="$slots.default" /></div>
        <div class="text-sm" v-else>
            ⬆️ Rejoignez la communauté Once Human Francophone (OHFR) : choisissez votre serveur OH
            pour 💬 rencontrer d'autres joueurs et joueuses, 💰 commercer et trouver des 🏰 ruches
            actives en jeu.
        </div>
        <a :href="url" class="btn btn-accent btn-outline btn-sm" v-if="url">
            Plus d'infos
            <IconExternalLink class="size-4" />
        </a>
    </div>
</template>
