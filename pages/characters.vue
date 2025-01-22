<script setup>
    const { data } = useAPI(`/once-human/characters`);
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Characters</h1>
        <pre>{{ data }}</pre>
    </div>
</template>