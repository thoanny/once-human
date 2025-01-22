<script setup>
    definePageMeta({
        middleware: ['authenticated'],
    });

    const { data } = await useAPI('/@me');
</script>

<template>
    <div>
        <h1>@me</h1>

        <div class="container mx-auto my-6">
            <pre>{{ data }}</pre>
        </div>
    </div>
</template>