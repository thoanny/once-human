<script setup>
    const { data } = useAPI(`/once-human/scenarios`);
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Scenarios</h1>
        <pre>{{ data }}</pre>
    </div>
</template>