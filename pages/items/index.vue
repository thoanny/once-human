<script setup>
    const { data } = useAPI(`/once-human/items`);
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Items</h1>

        <div class="grid grid-cols-3 gap-4 my-6" v-if="data">
            <NuxtLink :to="{name: 'items-id', params: {id: item.id}}" v-for="item in data.items" :key="item.id" class="border p-6 rounded-box">
                <h4 class="flex gap-2 items-center font-bold text-xl">
                    <img :src="item.iconUrl" v-if="item.iconUrl" class="size-12 border-2 border-green-400 rounded" />
                    {{ item.name }}
                </h4>
            </NuxtLink>
        </div>

        <pre>{{ data?.items }}</pre>
    </div>
</template>