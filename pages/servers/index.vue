<script setup>
const { data, status } = useAPI(`/once-human/servers`);
const _difficulties = {
    easy: 'facile',
    normal: 'normal',
    hard: 'difficile',
};
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Serveurs</h1>
        <AppLoading v-if="status === 'pending'" />
        <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 my-6"
            v-else
        >
            <div
                class="bg-base-200/75 hover:bg-base-300 p-4 text-center rounded-box"
                v-for="server in data.servers"
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
