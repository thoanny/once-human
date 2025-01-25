<script setup lang="ts">
const { fetch: refreshSession } = useUserSession();
const credentials = reactive({
    email: '',
    password: '',
});
async function login() {
    $fetch('/api/login', {
        method: 'POST',
        body: credentials,
    })
        .then(async () => {
            // Refresh the session on client-side and redirect to the home page
            await refreshSession();
            await navigateTo('/');
        })
        .catch((error) => alert('Bad credentials'));
}
</script>

<template>
    <div class="container mx-auto my-6 max-w-sm">
        <h1>Login</h1>
        <form @submit.prevent="login" class="flex flex-col gap-2 my-6">
            <input
                v-model="credentials.email"
                type="email"
                placeholder="Email"
                class="input input-bordered"
            />
            <input
                v-model="credentials.password"
                type="password"
                placeholder="Password"
                class="input input-bordered"
            />
            <button type="submit" class="btn btn-accent">Login</button>
        </form>
    </div>
</template>
