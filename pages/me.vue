<script setup>
const { $api } = useNuxtApp();
const config = useRuntimeConfig();

definePageMeta({
    middleware: ['authenticated'],
});

const { data: me } = await useAPI('/@me', { authenticated: true });
const { data: characters } = await useAPI('/once-human/user/characters', { authenticated: true });
const { data: dataServers } = await useAPI('/once-human/servers');
// const { data: hives } = await useAPI('/once-human/user/hives', { authenticated: true });

const _status = {
    public: 'Tout le monde',
    hidden: 'Serveur et ruche',
    private: 'Moi uniquement',
};

const characterModal = ref();
const isCharacterModalLoading = ref(false);

const defaultCharacter = {
    id: '',
    name: '',
    status: '',
    server: '',
    discord: '',
    ingame: '',
};

const currentCharacter = ref({});

const handleAddCharacter = () => {
    currentCharacter.value = { ...defaultCharacter };
    currentCharacter.value.id = 'new';
    characterModal.value.showModal();
};

const handleEditCharacter = (id) => {
    const character = characters.value.find((character) => character.id === id);
    currentCharacter.value = { ...defaultCharacter };
    currentCharacter.value = {
        id: character.id,
        name: character.name,
        status: character.status,
        serverId: character.server?.id,
        server: character.server?.id
            ? dataServers.value?.servers.filter((server) => server.id === character.server.id)
                  .length > 0
                ? character.server?.id
                : ''
            : '',
        discord: character.discordUid,
        ingame: character.ingameUid,
    };
    characterModal.value.showModal();
};

const handleSubmitCharacter = async () => {
    isCharacterModalLoading.value = true;
    await $api(
        `/once-human/user/characters/${
            currentCharacter.value.id === 'new' ? 'new' : 'edit/' + currentCharacter.value.id
        }`,
        {
            method: 'POST',
            body: { ...currentCharacter.value },
            authenticated: true,
        },
    )
        .then((res) => {
            characters.value = res;
            characterModal.value.close();
        })
        .catch(() => {
            alert("Impossible d'ajouter un nouveau personnage.");
        })
        .finally(() => {
            isCharacterModalLoading.value = false;
        });
};

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

const filteredServers = computed(() => {
    return dataServers.value?.servers
        .filter((server) => {
            return server.closed === false;
        })
        .sort(compareNames);
});

const handleDeleteCharacter = async (id) => {
    await $api(`/once-human/user/characters/delete/${id}`, {
        method: 'DELETE',
        authenticated: true,
    })
        .then((res) => {
            characters.value = res;
        })
        .catch(() => {
            alert('Impossible de supprimer le personnage.');
        });
};
</script>

<template>
    <div class="container mx-auto">
        <h1>Bienvenue {{ me.nickname }} ! <span v-if="me.member">👑</span></h1>

        <h2 class="my-4">Mes personnages ({{ characters.length }}/{{ me.member ? 3 : 1 }})</h2>

        <div role="alert" class="alert alert-info mb-4" v-if="!me.member">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <span
                >Les <NuxtLink :to="{ name: 't-potes' }" class="link">T-potes</NuxtLink> peuvent
                créer 3 personnages maximum, au lieu de 1.</span
            >
        </div>

        <button
            class="btn btn-accent btn-sm mb-4"
            @click="handleAddCharacter"
            v-if="(!me.member && characters.length < 1) || (me.member && characters.length < 3)"
        >
            Ajouter un personnage
        </button>

        <dialog ref="characterModal" class="modal">
            <div class="modal-box p-0">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-neutral absolute right-2 top-2 z-10">
                        ✕
                    </button>
                </form>

                <div class="card" v-if="currentCharacter">
                    <form @submit.prevent="handleSubmitCharacter" class="card-body">
                        <h2 class="card-title">
                            {{ currentCharacter.id === 'new' ? 'Ajouter' : 'Modifier' }} un
                            personnage
                        </h2>

                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Nom du personnage</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                                v-model="currentCharacter.name"
                            />
                        </label>

                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Serveur du personnage</span>
                            </div>
                            <select
                                class="select select-bordered w-full"
                                v-model="currentCharacter.server"
                            >
                                <option value="">-- Serveur --</option>
                                <option
                                    v-for="server in filteredServers"
                                    :key="server.id"
                                    :value="server.id"
                                >
                                    {{ server.name }}
                                </option>
                            </select>
                        </label>

                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Visibilité du personnage</span>
                            </div>
                            <select
                                class="select select-bordered w-full"
                                v-model="currentCharacter.status"
                            >
                                <option value="">-- Visibilité --</option>
                                <option v-for="(name, id) in _status" :key="id" :value="id">
                                    {{ name }}
                                </option>
                            </select>
                        </label>

                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Pseudonyme Discord</span>
                            </div>
                            <input
                                type="text"
                                class="input input-bordered w-full"
                                v-model="currentCharacter.discord"
                            />
                            <div class="label">
                                <span class="label-text-alt">
                                    Laissez vide si vous ne souhaitez pas être contacté·e sur
                                    Discord
                                </span>
                            </div>
                        </label>

                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">UID en jeu</span>
                            </div>
                            <input
                                type="text"
                                class="input input-bordered w-full"
                                v-model="currentCharacter.ingame"
                            />
                            <div class="label">
                                <span class="label-text-alt">
                                    Laissez vide si vous ne souhaitez pas être contacté·e en jeu
                                </span>
                            </div>
                        </label>

                        <div class="card-actions mt-2">
                            <button
                                type="submit"
                                class="btn btn-accent"
                                :disabled="isCharacterModalLoading"
                            >
                                {{
                                    isCharacterModalLoading
                                        ? 'Chargement en cours'
                                        : currentCharacter.id === 'new'
                                        ? 'Ajouter'
                                        : 'Modifier'
                                }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

        <ul class="flex flex-col gap-4">
            <li
                v-for="character in characters"
                :key="character.id"
                class="flex gap-4 bg-base-200/75 py-3 px-4 items-center"
            >
                <div class="font-bold text-white text-lg grow">{{ character.name }}</div>
                <div class="inline-flex flex-col items-center text-sm w-1/6">
                    <template v-if="character.server">
                        <span
                            :class="{
                                'text-error': character.server.closed,
                                'text-success': !character.server.closed,
                            }"
                        >
                            {{ character.server.name }}
                        </span>
                        <span class="text-xs">({{ character.server.scenario.name }})</span>
                    </template>
                    <span class="italic" v-else>Aucun serveur</span>
                </div>
                <div class="inline-flex text-sm gap-1 justify-center items-center w-1/6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="size-4"
                    >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                        <path
                            fill-rule="evenodd"
                            d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    {{ _status[character.status] }}
                </div>

                <div class="inline-flex text-sm gap-1 justify-center items-center w-1/6">
                    Discord
                </div>

                <div class="inline-flex text-sm gap-1 justify-center items-center w-1/6">
                    Ingame
                </div>

                <div class="flex gap-2">
                    <button
                        class="btn btn-sm btn-square btn-error btn-outline"
                        @click="handleDeleteCharacter(character.id)"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        class="btn btn-sm btn-square btn-outline btn-accent"
                        @click="handleEditCharacter(character.id)"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                        >
                            <path
                                d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"
                            />
                            <path
                                d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"
                            />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>

        <h2 class="my-2">Mes ruches</h2>

        <ul>
            <li></li>
        </ul>

        <DevOnly>
            <pre>{{ me }}</pre>
            <pre>{{ characters }}</pre>
            <!-- <pre>{{ hives }}</pre> -->
        </DevOnly>
    </div>
</template>
