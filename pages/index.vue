<script setup>
const { data } = useAPI(`/once-human/events`, { server: false, lazy: true });
const { data: stats } = useAPI(`/once-human/stats`, { server: false, lazy: true });

const eventModal = ref();
const currentEvent = ref();

const handleOpenModal = (id) => {
    currentEvent.value = data.value?.events.find((event) => event.id === id);
    eventModal.value.showModal();
};

defineOgImageComponent('OHF', {
    title: 'Bienvenue métas !',
});

const currentWeek = ref(0);

const filteredEvents = computed(() => {
    const dayjs = useDayjs();
    const start = dayjs()
        .hour(1)
        .minute(0)
        .second(0)
        .weekday(currentWeek.value * 7);
    const end = dayjs()
        .utc()
        .hour(23)
        .minute(59)
        .second(59)
        .weekday(currentWeek.value * 7 + 6);

    return data.value?.events
        .filter((event) => {
            if (
                (dayjs(event.startAt) < start && dayjs(event.endAt) >= start) ||
                (dayjs(event.startAt) >= start && dayjs(event.startAt) <= end)
            ) {
                return true;
            }
            return false;
        })
        .map((event) => {
            let colStart = 0,
                colSpan = 0;

            if (event.endAt) {
                if (dayjs(event.startAt) < start && dayjs(event.endAt) > end) {
                    colStart = 1;
                    colSpan = 7;
                } else if (dayjs(event.startAt) < start && dayjs(event.endAt) > start) {
                    colStart = 1;
                    colSpan = dayjs(event.endAt).weekday() + 1;
                } else if (dayjs(event.startAt) > start && dayjs(event.endAt) > end) {
                    colStart = dayjs(event.startAt).weekday() + 1;
                    colSpan = 8 - colStart;
                } else {
                    colStart = dayjs(event.startAt).weekday() + 1;
                    colSpan = dayjs(event.endAt).weekday() - dayjs(event.startAt).weekday() + 1;
                }
            } else {
                colStart = dayjs(event.startAt).weekday() + 1;
                colSpan = 1;
            }

            return {
                ...event,
                colStart: colStart,
                colSpan: colSpan,
            };
        })
        .sort(compareDates);
});

function compareDates(a, b) {
    const startA = a.startAt;
    const startB = b.startAt;

    if (startA < startB) {
        return -1;
    }
    if (startA > startB) {
        return 1;
    }

    return 0;
}
</script>

<template>
    <div class="container mx-auto">
        <div class="max-w-xl mx-auto">
            <h1 class="text-4xl mb-4">Base de données Once Human</h1>
            <p class="text-lg mb-4">
                Bienvenue Metas&nbsp;! Vous trouverez dans cette dans cette base de données des
                informations et outils pour accompagner vos sessions sur le jeu
                <a href="https://www.oncehuman.game" target="_blank" class="underline">Once Human</a
                >, développé et édité par
                <a href="https://www.neteasegames.com" target="_blank" class="underline">NetEase</a
                >.
            </p>
            <p class="text-lg">Ce fansite n'est pas affilié avec l'éditeur de Once Human.</p>

            <div class="grid grid-cols-3 gap-4 mt-6" v-if="stats">
                <div class="bg-base-100 py-3 px-4 text-center">
                    <div class="font-extrabold text-3xl">{{ stats.specializations }}</div>
                    <div>spécialisations</div>
                </div>
                <div class="bg-base-100 py-3 px-4 text-center">
                    <div class="font-extrabold text-3xl">{{ stats.items }}</div>
                    <div>objets</div>
                </div>
                <div class="bg-base-100 py-3 px-4 text-center">
                    <div class="font-extrabold text-3xl">{{ stats.recipes }}</div>
                    <div>recettes</div>
                </div>
                <div class="bg-base-100 py-3 px-4 text-center">
                    <div class="font-extrabold text-3xl">{{ stats.servers }}</div>
                    <div>serveurs</div>
                </div>
                <div class="bg-base-100 py-3 px-4 text-center">
                    <div class="font-extrabold text-3xl">{{ stats.hives }}</div>
                    <div>ruches</div>
                </div>
                <div class="bg-base-100 py-3 px-4 text-center">
                    <div class="font-extrabold text-3xl">{{ stats.characters }}</div>
                    <div>personnages</div>
                </div>
            </div>
        </div>

        <AppLoading v-if="!filteredEvents" />
        <template v-else>
            <h1 class="mt-6">Évènements de la semaine</h1>
            <div class="flex gap-2 my-4">
                <button
                    @click="
                        () => {
                            if (currentWeek > 0) {
                                currentWeek--;
                            }
                        }
                    "
                    class="btn btn-sm"
                    :class="{ 'btn-accent': currentWeek <= 0, 'btn-neutral': currentWeek > 0 }"
                >
                    Cette semaine
                </button>
                <button
                    @click="
                        () => {
                            if (currentWeek < 1) {
                                currentWeek++;
                            }
                        }
                    "
                    class="btn btn-sm"
                    :class="{ 'btn-accent': currentWeek >= 1, 'btn-neutral': currentWeek < 1 }"
                >
                    Semaine prochaine
                </button>
            </div>
            <div class="my-6 overflow-x-auto overflow-y-hidden border border-neutral">
                <div class="relative min-w-[74rem]">
                    <div class="grid grid-cols-7 absolute w-full h-full opacity-75 z-1">
                        <div class="h-full w-full bg-neutral"></div>
                        <div class="h-full w-full"></div>
                        <div class="h-full w-full bg-neutral"></div>
                        <div class="h-full w-full"></div>
                        <div class="h-full w-full bg-neutral"></div>
                        <div class="h-full w-full"></div>
                        <div class="h-full w-full bg-neutral"></div>
                    </div>
                    <div
                        class="grid grid-cols-7 text-center text-sm font-semibold h-8 items-center relative z-2"
                    >
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7)
                                    .format('ddd D MMM')
                            }}
                        </div>
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7 + 1)
                                    .format('ddd D MMM')
                            }}
                        </div>
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7 + 2)
                                    .format('ddd D MMM')
                            }}
                        </div>
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7 + 3)
                                    .format('ddd D MMM')
                            }}
                        </div>
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7 + 4)
                                    .format('ddd D MMM')
                            }}
                        </div>
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7 + 5)
                                    .format('ddd D MMM')
                            }}
                        </div>
                        <div>
                            {{
                                $dayjs()
                                    .weekday(currentWeek * 7 + 6)
                                    .format('ddd D MMM')
                            }}
                        </div>
                    </div>
                    <div
                        class="grid grid-cols-7 relative z-2 mb-1 last-of-type:mb-[-1px]"
                        v-for="event in filteredEvents"
                        :key="event.id"
                    >
                        <div
                            class="p-1 text-sm bg-base-200/75 hover:bg-base-300 cursor-pointer text-sm border border-neutral border-l-0 border-r-0"
                            :class="`col-span-${event.colSpan} col-start-${event.colStart}`"
                            @click="handleOpenModal(event.id)"
                        >
                            <span class="text-white font-semibold">{{ event.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="max-w-xl mx-auto mt-6">
            <Ohfr />
        </div>

        <dialog ref="eventModal" class="modal">
            <div class="modal-box p-0">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-neutral absolute right-2 top-2 z-10">
                        ✕
                    </button>
                </form>

                <div class="card" v-if="currentEvent">
                    <figure v-if="currentEvent.imageUrl">
                        <img :src="currentEvent.imageUrl" alt="" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{{ currentEvent.name }}</h2>

                        <div class="text-sm">
                            {{
                                $dayjs(currentEvent.startAt).format(
                                    currentEvent.allDay ? 'D MMMM YYYY' : 'D MMMM YYYY HH:mm',
                                )
                            }}
                            <template v-if="currentEvent.endAt">
                                &rarr;
                                {{
                                    $dayjs(currentEvent.endAt).format(
                                        currentEvent.allDay ? 'D MMMM YYYY' : 'D MMMM YYYY HH:mm',
                                    )
                                }}
                            </template>
                        </div>
                        <MDC
                            :value="currentEvent.description"
                            v-if="currentEvent.description"
                            class="markdown mt-4"
                        />
                        <div class="card-actions mt-2" v-if="currentEvent.url">
                            <a :href="currentEvent.url" target="_blank" class="btn btn-accent">
                                Plus d'infos
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>
