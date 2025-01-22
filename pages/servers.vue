<script setup>
    const { data } = useAPI(`/once-human/servers`);
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Servers</h1>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 my-6" v-if="data">
            <div class="border p-2 rounded-box" v-for="server in data.servers" :key="server.id">
                <div class="font-bold">{{ server.name }}</div>
                <div>
                    <span class="badge" :class="{'badge-success': !server.closed, 'badge-error': server.closed}">{{ server.scenario.id }}</span>
                </div>
            </div>
        </div>
        <pre>{{ data }}</pre>
    </div>
</template>