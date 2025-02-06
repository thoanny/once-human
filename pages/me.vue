<script setup>
import {
    IconBarcode,
    IconBrandDiscord,
    IconEye,
    IconEdit,
    IconTrash,
    IconInfoCircle,
} from '@tabler/icons-vue';
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

        <h2 class="my-4">Mes personnages</h2>

        <div class="flex flex-wrap items-center gap-1">
            Limite de personnages : {{ characters.length }}/{{ me.member ? 3 : 1 }}
            <div class="dropdown" v-if="!me.member">
                <div tabindex="0" role="button" class="btn btn-circle btn-ghost btn-sm text-info">
                    <IconInfoCircle class="size-5" />
                </div>
                <div
                    tabindex="0"
                    class="card compact dropdown-content bg-info text-info-content z-[1] w-80"
                >
                    <div tabindex="0" class="card-body">
                        <p>
                            Les
                            <NuxtLink :to="{ name: 't-potes' }" class="link">T-potes</NuxtLink>
                            peuvent créer 3 personnages maximum, au lieu de 1.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <button
            class="btn btn-accent btn-sm my-4"
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

        <ul class="flex flex-col gap-4 my-4" v-if="characters">
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
                    <IconEye stroke-width="1.25" />
                    {{ _status[character.status] }}
                </div>

                <div class="inline-flex text-sm gap-1 justify-center items-center w-1/6">
                    <IconBrandDiscord stroke-width="1.25" />
                    {{ character.discordUid ? character.discordUid : '—' }}
                </div>

                <div class="inline-flex text-sm gap-1 justify-center items-center w-1/6">
                    <IconBarcode stroke-width="1.25" />
                    {{ character.ingameUid ? character.ingameUid : '—' }}
                </div>

                <div class="flex gap-2">
                    <button
                        class="btn btn-sm btn-square btn-error btn-outline"
                        @click="handleDeleteCharacter(character.id)"
                    >
                        <IconTrash stroke-width="1.5" />
                    </button>
                    <button
                        class="btn btn-sm btn-square btn-outline btn-accent"
                        @click="handleEditCharacter(character.id)"
                    >
                        <IconEdit stroke-width="1.5" />
                    </button>
                </div>
            </li>
        </ul>

        <h2 class="mb-4 mt-6">Mes ruches</h2>

        <ul>
            <li></li>
        </ul>
    </div>
</template>
