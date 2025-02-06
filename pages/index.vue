<script setup>
const { data, status } = await useAPI(`/once-human/events`);

const eventModal = ref();
const currentEvent = ref();

const handleOpenModal = (id) => {
    currentEvent.value = data.value?.events.find((event) => event.id === id);
    eventModal.value.showModal();
};

defineOgImageComponent('OHF', {
    title: 'Bienvenue métas !',
});

const filteredEvents = computed(() => {
    const dayjs = useDayjs();
    const start = dayjs().hour(1).minute(0).second(0).weekday(0);
    const end = dayjs().utc().hour(23).minute(59).second(59).weekday(6);

    return data.value.events
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
        <h1>Évènements de la semaine</h1>

        <AppLoading v-if="status === 'pending'" />
        <div class="my-6 overflow-x-auto overflow-y-hidden border border-neutral" v-else>
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
                        {{ $dayjs().weekday(0).format('ddd D MMM') }}
                    </div>
                    <div>
                        {{ $dayjs().weekday(1).format('ddd D MMM') }}
                    </div>
                    <div>
                        {{ $dayjs().weekday(2).format('ddd D MMM') }}
                    </div>
                    <div>
                        {{ $dayjs().weekday(3).format('ddd D MMM') }}
                    </div>
                    <div>
                        {{ $dayjs().weekday(4).format('ddd D MMM') }}
                    </div>
                    <div>
                        {{ $dayjs().weekday(5).format('ddd D MMM') }}
                    </div>
                    <div>
                        {{ $dayjs().weekday(6).format('ddd D MMM') }}
                    </div>
                </div>
                <div
                    class="grid grid-cols-7 relative z-2 mb-2 last-of-type:mb-[-1px]"
                    v-for="event in filteredEvents"
                    :key="event.id"
                >
                    <div
                        class="p-2 bg-base-200/75 hover:bg-base-300 cursor-pointer text-sm border border-neutral border-l-0 border-r-0"
                        :class="`col-span-${event.colSpan} col-start-${event.colStart}`"
                        @click="handleOpenModal(event.id)"
                    >
                        <div class="text-xs">
                            {{
                                $dayjs(event.startAt).format(
                                    event.allDay ? 'D MMM YYYY' : 'D MMM YYYY HH:mm',
                                )
                            }}
                            <template v-if="event.endAt">
                                &rarr;
                                {{
                                    $dayjs(event.endAt).format(
                                        event.allDay ? 'D MMM YYYY' : 'D MMM YYYY HH:mm',
                                    )
                                }}
                            </template>
                        </div>
                        <span class="text-white font-semibold">{{ event.name }}</span>
                    </div>
                </div>
            </div>
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
                                    $dayjs(currentEvent.startEnd).format(
                                        currentEvent.allDay ? 'D MMMM YYYY' : 'D MMMM YYYY HH:mm',
                                    )
                                }}
                            </template>
                        </div>
                        <p>{{ currentEvent.description }}</p>
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

        <DevOnly>
            <pre>{{ filteredEvents }}</pre>
        </DevOnly>
    </div>
</template>
