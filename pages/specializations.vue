<script setup>
const route = useRoute();

const { data, status } = await useAPI(`/once-human/specializations`);

const _types = {
    'facility-new': 'Nouvelle installation',
    'facility-boost': 'Installation améliorée',
    'formula-new': 'Nouvelle formule',
    'formula-boost': 'Formule améliorée',
};

useSeoMeta({
    title: 'Spécialisations',
    ogTitle: 'Spécialisations',
    description: 'Liste des spécialisations disponibles pour vos personnages.',
    ogDescription: 'Liste des spécialisations disponibles pour vos personnages.',
});

defineOgImageComponent('OHF', {
    title: 'Spécialisations',
    description: 'Liste des spécialisations disponibles pour vos personnages.',
});

const typeFilter = ref('');
const levelFilter = ref('');

const filteredSpecializations = computed(() => {
    return data.value?.specializations
        .filter((spec) => {
            if (typeFilter.value) {
                return typeFilter.value === spec.type;
            }
            return true;
        })
        .filter((spec) => {
            if (levelFilter.value) {
                return spec.levels.indexOf(levelFilter.value) >= 0;
            }
            return true;
        });
});

const handleCopyURLToClipboard = (id) => {
    navigator.clipboard.writeText(`https://once-human.thoanny.fr/specializations/${id}`);
};
</script>

<template>
    <div class="container mx-auto my-6 max-w-3xl">
        <div class="flex flex-col md:flex-row gap-4 justify-between">
            <h1>Spécialisations</h1>
            <div
                class="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
                v-if="data?.specializations"
            >
                <select v-model="typeFilter" class="select select-bordered select-sm">
                    <option value="">-- Type --</option>
                    <option v-for="(name, type) in _types" :key="type" :value="type">
                        {{ name }}
                    </option>
                </select>
                <select v-model="levelFilter" class="select select-bordered select-sm">
                    <option value="">-- Niv. --</option>
                    <option
                        v-for="i in [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
                        :key="i"
                        :value="i"
                    >
                        Niv. {{ i }}
                    </option>
                </select>
            </div>
        </div>

        <AppLoading v-if="status === 'pending'" />
        <div class="flex flex-col gap-4 my-6" v-else>
            <div
                v-for="specialization in filteredSpecializations"
                :key="specialization.id"
                class="bg-base-200/75 p-6 rounded-box flex flex-col gap-3 relative"
            >
                <div class="absolute top-2 right-2 flex">
                    <button class="btn btn-ghost btn-square btn-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        class="btn btn-ghost btn-square btn-sm"
                        @click="handleCopyURLToClipboard(specialization.id)"
                        v-if="false"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                        >
                            <path
                                d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"
                            />
                            <path
                                d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"
                            />
                        </svg>
                    </button>
                </div>
                <div class="flex gap-6 items-center pr-14">
                    <img
                        :src="specialization.iconUrl ?? '/img/default-specialization.png'"
                        class="size-16 shrink-0"
                    />
                    <div class="grow">
                        <span class="text-sm font-bold" v-if="specialization.type">{{
                            _types[specialization.type]
                        }}</span>
                        <h4 class="font-bold text-xl text-white">
                            {{ specialization.name }}
                        </h4>
                        <span class="text-xs" v-if="specialization.levels.length > 0"
                            >Niveaux&nbsp;: {{ specialization.levels.join(', ') }}</span
                        >
                    </div>
                </div>
                <div v-if="specialization.description">{{ specialization.description }}</div>
                <div class="inline-flex gap-2" v-if="specialization.scenarios.length > 0">
                    <span
                        class="badge badge-neutral"
                        v-for="scenario in specialization.scenarios"
                        :key="scenario.id"
                        >{{ scenario.name }}</span
                    >
                </div>
            </div>
        </div>

        <DevOnly>
            <!-- <pre>{{ data?.specializations }}</pre> -->
        </DevOnly>
    </div>
</template>
