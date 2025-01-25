<script setup>
const { data, status } = useAPI(`/once-human/events`);

const eventModal = ref();
const currentEvent = ref();

const handleOpenModal = (id) => {
    currentEvent.value = data.value?.events.find((event) => event.id === id);
    eventModal.value.showModal();
};
</script>

<template>
    <div class="container max-w-6xl mx-auto my-6">
        <h1>Évènements</h1>

        <AppLoading v-if="status === 'pending'" />
        <div class="flex flex-col gap-4 my-6" v-else>
            <div
                v-for="event in data?.events"
                :key="event.id"
                class="bg-base-200/75 hover:bg-base-300 flex flex-col sm:flex-row gap-0 sm:gap-4 justify-between sm:items-center py-3 px-4 cursor-pointer select-none"
                @click="handleOpenModal(event.id)"
            >
                <div class="font-bold">
                    {{ event.name }}
                </div>
                <div class="text-sm">
                    <NuxtTime
                        :datetime="event.startAt"
                        month="short"
                        day="numeric"
                        year="numeric"
                        v-if="event.allDay"
                    />
                    <NuxtTime
                        :datetime="event.startAt"
                        month="short"
                        day="numeric"
                        year="numeric"
                        hour="numeric"
                        minute="numeric"
                        v-else
                    />
                    <template v-if="event.endAt">
                        &rarr;
                        <NuxtTime
                            :datetime="event.endAt"
                            month="short"
                            day="numeric"
                            year="numeric"
                            v-if="event.allDay"
                        />
                        <NuxtTime
                            :datetime="event.endAt"
                            month="short"
                            day="numeric"
                            year="numeric"
                            hour="numeric"
                            minute="numeric"
                            v-else
                        />
                    </template>
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
                            <NuxtTime
                                :datetime="currentEvent.startAt"
                                month="long"
                                day="numeric"
                                year="numeric"
                                v-if="currentEvent.allDay"
                            />
                            <NuxtTime
                                :datetime="currentEvent.startAt"
                                month="long"
                                day="numeric"
                                year="numeric"
                                hour="numeric"
                                minute="numeric"
                                v-else
                            />
                            <template v-if="currentEvent.endAt">
                                &rarr;
                                <NuxtTime
                                    :datetime="currentEvent.endAt"
                                    month="long"
                                    day="numeric"
                                    year="numeric"
                                    v-if="currentEvent.allDay"
                                />
                                <NuxtTime
                                    :datetime="currentEvent.endAt"
                                    month="long"
                                    day="numeric"
                                    year="numeric"
                                    hour="numeric"
                                    minute="numeric"
                                    v-else
                                />
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
            <pre>{{ data?.events }}</pre>
        </DevOnly>
    </div>
</template>
