<script setup>
const { data, status } = await useAPI(`/once-human/items`);

const categoryFilter = ref('');
const nameFilter = ref('');

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

const listCategories = computed(() => {
    return data.value
        ?.map((item) => {
            return { id: item.category.id, name: item.category.name };
        })
        .reduce((acc, obj) => {
            if (!acc.some((item) => item.id === obj.id)) {
                acc.push(obj);
            }
            return acc;
        }, [])
        .sort(compareNames);
});

const filteredItems = computed(() => {
    const nameFilterValue = nameFilter.value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();

    return data.value
        .filter((spec) => {
            if (nameFilterValue.length > 0) {
                return (
                    spec.name
                        .normalize('NFD')
                        .replace(/\p{Diacritic}/gu, '')
                        .toLowerCase()
                        .indexOf(nameFilterValue) >= 0
                );
            }
            return true;
        })
        .filter((item) => {
            if (categoryFilter.value) {
                return item.category.id === categoryFilter.value;
            }
            return true;
        });
});

useSeoMeta({
    title: 'Inventaire',
    ogTitle: 'Inventaire',
    description: 'Base de données des objets et des formules associées.',
    ogDescription: 'Base de données des objets et des formules associées.',
});

defineOgImageComponent('OHF', {
    title: 'Inventaire',
    description: 'Base de données des objets et des formules associées.',
});
</script>

<template>
    <div class="container max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 justify-between">
            <h1>Inventaire</h1>

            <div v-if="data" class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <input
                    type="input"
                    class="input input-bordered input-sm"
                    placeholder="Rechercher..."
                    v-model="nameFilter"
                />
                <select v-model="categoryFilter" class="select select-bordered select-sm">
                    <option value="">-- Catégorie --</option>
                    <option
                        v-for="category in listCategories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
            </div>
        </div>

        <AppLoading v-if="status === 'pending'" />
        <div class="flex flex-col-reverse md:flex-row items-start gap-4 my-6" v-else>
            <div class="bg-base-200/75 p-4 rounded-box">
                <!-- <div>xxx</div> -->
                <div
                    class="grid grid-cols-4 lg:grid-cols-7 gap-2 shrink-0 pr-4 scroll"
                    id="inventory"
                >
                    <NuxtLink
                        :to="{ name: 'items-id', params: { id: item.id } }"
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="size-20 border-2 shrink-0 p-1"
                        :class="`border-oh-${item.rarity} bg-oh-item-${item.rarity}`"
                    >
                        <img
                            :src="item.iconUrl ?? '/img/default-item.png'"
                            class="w-full h-full"
                            :class="{ 'opacity-75': !item.iconUrl }"
                        />
                    </NuxtLink>
                </div>
            </div>

            <div class="flex-1">
                <NuxtPage />
                <Ohfr />
            </div>
        </div>

        <DevOnly>
            <pre>{{ data }}</pre>
        </DevOnly>
    </div>
</template>

<style scoped>
.scroll {
    max-height: calc(100dvh - 16rem);
}

#inventory .router-link-active {
    border-color: #68fdd6;
    position: relative;
}

#inventory .router-link-active:after {
    content: '';
    display: block;
    box-shadow: inset 0 0 5px 1px #68fdd6;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
}
</style>
