<script setup>
    const runtimeConfig = useRuntimeConfig();
    const { data } = await useFetch(runtimeConfig.public.apiURL+'/once-human/memetics');
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Memetics</h1>

        <div class="flex flex-col gap-4 my-6">
            <div v-for="memetic in data.memetics" :key="memetic.id" class="border p-6 rounded-box flex flex-col gap-2">
                <h4 class="flex gap-2 items-center font-bold text-xl">
                    <img :src="memetic.iconUrl" v-if="memetic.iconUrl" class="size-12" />
                    {{ memetic.name }}
                </h4>
                <div v-if="memetic.description">{{ memetic.description }}</div>
                <div v-if="memetic.caterory">
                    <span class="badge badge-neutral">{{ memetic.category.name }}</span>
                </div>
                <div v-if="memetic.scenarios.length > 0">
                    <span class="badge badge-neutral" v-for="scenario in memetic.scenarios" :key="scenario.id">{{ scenario.name }}</span>
                </div>
            </div>
        </div>

        <pre>{{ data.memetics }}</pre>
    </div>
</template>