<script setup>
const { loggedIn, user, clear: clearUserSession } = useUserSession();

const logout = async () => {
    await clearUserSession();
    navigateTo('/');
};
</script>

<template>
    <div>
        <div class="navbar bg-base-300">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <NuxtLink :to="{ name: 'specializations' }">Spécialisations</NuxtLink>
                        </li>
                        <li><NuxtLink :to="{ name: 'items' }">Inventaire</NuxtLink></li>
                        <li><NuxtLink :to="{ name: 'servers' }">Serveurs</NuxtLink></li>
                        <template v-if="loggedIn">
                            <li>
                                <NuxtLink :to="{ name: 'me' }">{{ user.nickname }}</NuxtLink>
                            </li>
                            <li><NuxtLink @click="logout">Déconnexion</NuxtLink></li>
                        </template>
                        <template v-else>
                            <li><NuxtLink :to="{ name: 'login' }">Connexion</NuxtLink></li>
                            <li>
                                <NuxtLink to="https://api.thoanny.fr/register" target="_blank">
                                    Inscription
                                </NuxtLink>
                            </li>
                        </template>
                    </ul>
                </div>
                <NuxtLink :to="{ name: 'index' }" class="btn btn-ghost text-xl"
                    >Once Human</NuxtLink
                >
            </div>
            <div class="navbar-center hidden md:flex">
                <ul class="menu menu-horizontal px-1 gap-2">
                    <li><NuxtLink :to="{ name: 'specializations' }">Spécialisations</NuxtLink></li>
                    <li><NuxtLink :to="{ name: 'items' }">Inventaire</NuxtLink></li>
                    <li><NuxtLink :to="{ name: 'servers' }">Serveurs</NuxtLink></li>
                </ul>
            </div>
            <div class="navbar-end gap-2">
                <template v-if="loggedIn">
                    <NuxtLink :to="{ name: 'me' }" class="btn btn-accent hidden sm:inline-flex">{{
                        user.nickname
                    }}</NuxtLink>
                    <button class="btn btn-error" @click="logout">Déconnexion</button>
                </template>
                <template v-else>
                    <NuxtLink
                        :to="{ name: 'login' }"
                        class="btn btn-accent btn-outline hidden sm:inline-flex"
                        >Connexion</NuxtLink
                    >
                    <NuxtLink
                        to="https://api.thoanny.fr/register"
                        target="_blank"
                        class="btn btn-accent btn-outline hidden sm:inline-flex"
                        >Inscription</NuxtLink
                    >
                </template>
            </div>
        </div>
    </div>
</template>
