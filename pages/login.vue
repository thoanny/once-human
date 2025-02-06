<script setup lang="ts">
const { fetch: refreshSession } = useUserSession();
const credentials = reactive({
    email: '',
    password: '',
});
const isLoading = ref(false);
async function login() {
    isLoading.value = true;
    await $fetch('/api/login', {
        method: 'POST',
        body: credentials,
    })
        .then(async () => {
            // Refresh the session on client-side and redirect to the home page
            await refreshSession();
            await navigateTo('/me');
        })
        .catch((error) => {
            isLoading.value = false;
            credentials.password = '';
            alert('Identifiants invalides.');
        });
}
</script>

<template>
    <div class="container mx-auto max-w-sm">
        <h1>Connexion</h1>
        <AppLoading v-if="isLoading" />
        <form @submit.prevent="login" class="flex flex-col gap-2 my-6" v-else>
            <input
                v-model="credentials.email"
                type="email"
                placeholder="Adresse e-mail"
                class="input input-bordered"
            />
            <input
                v-model="credentials.password"
                type="password"
                placeholder="Mot de passe"
                class="input input-bordered"
            />
            <button type="submit" class="btn btn-accent">Se connecter</button>
        </form>
    </div>
</template>
