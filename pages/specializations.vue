<script setup>
   const { data, status } = useAPI(`/once-human/specializations`);
    const _types = {
        'facility-new': 'Nouvelle installation',
        'facility-boost': 'Installation améliorée',
        'formula-new': 'Nouvelle formule',
        'formula-boost': 'Formule améliorée',
    };
</script>

<template>
    <div class="container mx-auto my-6 max-w-3xl">
        <h1>Spécialisations</h1>

        <AppLoading v-if="status === 'pending'" />
        <div class="flex flex-col gap-4 my-6" v-else>
            <div v-for="specialization in data.specializations" :key="specialization.id" class="bg-base-300 p-6 rounded-box flex flex-col gap-3">
                
                <div class="flex gap-6 items-center">
                    <img :src="specialization.iconUrl" v-if="specialization.iconUrl" class="size-16 shrink-0" />
                    <div>
                        <span class="text-sm font-bold" v-if="specialization.type">{{ _types[specialization.type] }}</span>
                        <h4 class="font-bold text-xl text-white">
                            {{ specialization.name }}
                        </h4>
                        <span class="text-xs" v-if="specialization.levels.length > 0">Niveaux&nbsp;: {{ specialization.levels.join(', ') }}</span>
                    </div>
                </div>
                <div v-if="specialization.description">{{ specialization.description }}</div>
                <div class="inline-flex gap-2" v-if="specialization.scenarios.length > 0">
                    <span class="badge badge-neutral" v-for="scenario in specialization.scenarios" :key="scenario.id">{{ scenario.name }}</span>
                </div>
            </div>
        </div>

        <DevOnly>
            <pre>{{ data?.specializations }}</pre>
        </DevOnly>
    </div>
</template>