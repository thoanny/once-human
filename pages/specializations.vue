<script setup>
import AppLoading from '~/components/AppLoading.vue';

   const { data, status } = useAPI(`/once-human/specializations`);
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Specializations</h1>

        <AppLoading v-if="status === 'pending'" />
        <div class="flex flex-col gap-4 my-6" v-else>
            <div v-for="specialization in data.specializations" :key="specialization.id" class="border p-6 rounded-box flex flex-col gap-2">
                <h4 class="flex gap-2 items-center font-bold text-xl">
                    <img :src="specialization.iconUrl" v-if="specialization.iconUrl" class="size-12" />
                    {{ specialization.name }}
                </h4>
                <div v-if="specialization.description">{{ specialization.description }}</div>
                <div v-if="specialization.levels" class="text-sm">Niveaux&nbsp;: {{ specialization.levels.join(', ') }}</div>
                <div v-if="specialization.scenarios.length > 0">
                    <span class="badge badge-neutral" v-for="scenario in specialization.scenarios" :key="scenario.id">{{ scenario.name }}</span>
                </div>
            </div>
        </div>

        <DevOnly>
            <pre>{{ data?.specializations }}</pre>
        </DevOnly>
    </div>
</template>