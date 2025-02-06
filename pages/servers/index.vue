<script setup>
const { data, status } = await useAPI(`/once-human/servers`);
const _difficulties = {
    easy: 'facile',
    normal: 'normal',
    hard: 'difficile',
};

const scenarioFilter = ref('');
const difficultyFilter = ref('');
const onlyOpen = ref(true);

const filteredServers = computed(() => {
    return data.value.servers
        .filter((server) => {
            return onlyOpen.value === false ? true : server.closed === false;
        })
        .filter((server) => {
            if (scenarioFilter.value) {
                return server.scenario.id === scenarioFilter.value;
            }
            return true;
        })
        .filter((server) => {
            if (difficultyFilter.value) {
                return server.difficulty === difficultyFilter.value;
            }
            return true;
        });
});

function compareNames(a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
}

const listScenarios = computed(() => {
    return data.value.servers
        ?.map((server) => {
            return { id: server.scenario.id, name: server.scenario.name };
        })
        .reduce((acc, obj) => {
            if (!acc.some((item) => item.id === obj.id)) {
                acc.push(obj);
            }
            return acc;
        }, [])
        .sort(compareNames);
});

const difficulties = {
    easy: 'Débutant',
    normal: 'Normal',
    hard: 'Difficile',
};

useSeoMeta({
    title: 'Serveurs',
    ogTitle: 'Serveurs',
    description: 'Liste des serveurs, tous scénarios confondus.',
    ogDescription: 'Liste des serveurs, tous scénarios confondus.',
});

defineOgImageComponent('OHF', {
    title: 'Serveurs',
    description: 'Liste des serveurs, tous scénarios confondus.',
});
</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-col md:flex-row gap-4 justify-between">
            <h1>Serveurs</h1>
            <div
                class="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
                v-if="data?.servers"
            >
                <select v-model="scenarioFilter" class="select select-bordered select-sm">
                    <option value="">-- Scénario --</option>
                    <option
                        v-for="scenario in listScenarios"
                        :key="scenario.id"
                        :value="scenario.id"
                    >
                        {{ scenario.name }}
                    </option>
                </select>
                <select v-model="difficultyFilter" class="select select-bordered select-sm">
                    <option value="">-- Difficulté --</option>
                    <option v-for="(difficulty, key) in difficulties" :key="key" :value="key">
                        {{ difficulty }}
                    </option>
                </select>
                <label class="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        class="toggle toggle-sm toggle-accent"
                        v-model="onlyOpen"
                    />
                    Ouverts uniquement
                </label>
            </div>
        </div>
        <AppLoading v-if="status === 'pending'" />
        <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 my-6"
            v-else
        >
            <div
                class="bg-base-200/75 hover:bg-base-300 p-4 text-center rounded-box"
                v-for="server in filteredServers"
                :key="server.id"
            >
                <div class="text-xs">
                    {{ server.scenario.name }}
                    <br />({{ _difficulties[server.difficulty] }})
                </div>
                <div
                    class="font-bold text-lg"
                    :class="{
                        'text-success': !server.closed && server.startAt,
                        'text-error': server.closed && server.startAt,
                    }"
                >
                    {{ server.name }}
                </div>
                <div class="text-xs" v-if="server.startAt">
                    <NuxtTime :datetime="server.startAt" relative />
                </div>
                <div class="text-xs italic" v-else>date indéfinie</div>
                <div v-if="server.tags.length > 0" class="flex gap-2 justify-center mt-2">
                    <span
                        class="tooltip size-6 bg-neutral rounded"
                        :data-tip="tag.name"
                        v-for="tag in server.tags"
                        :key="tag.id"
                    >
                        <img
                            :src="tag.iconUrl"
                            class="size-6 shrink-0 rounded"
                            alt=""
                            v-if="tag.iconUrl"
                        />
                    </span>
                </div>
            </div>
        </div>

        <DevOnly>
            <pre>{{ data }}</pre>
        </DevOnly>
    </div>
</template>
