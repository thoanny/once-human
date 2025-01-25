<script setup>
    const { data, status } = useAPI('/once-human/memetics');
</script>

<template>
    <div class="container mx-auto my-6">
        <h1>Mimétiques</h1>
        <DevOnly>
            <pre>{{ data?.memetics }}</pre>
        </DevOnly>
    </div>
</template>