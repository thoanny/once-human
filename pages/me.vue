<script setup>
const config = useRuntimeConfig();

definePageMeta({
    middleware: ['authenticated'],
});

const { data } = await useAPI('/@me');
</script>

<template>
    <div class="container my-6 mx-auto max-w-lg">
        <h1>@me : {{ data.nickname }}</h1>

        <DevOnly>
            <pre>{{ data }}</pre>
        </DevOnly>
    </div>
</template>
