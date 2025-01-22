<template>
    <div>
        <div class="navbar bg-base-200">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost xl:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NuxtLink :to="{name: 'index'}">Index</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'specializations'}">Specializations</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'memetics'}">Memetics</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'items'}">Items</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'recipes'}">Recipes</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'characters'}">Characters</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'hives'}">Hives</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'scenarios'}">Scenarios</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'servers'}">Servers</NuxtLink></li>
                        <li><NuxtLink :to="{name: 'about'}">About</NuxtLink></li>
                    </ul>
                </div>
                <NuxtLink :to="{name: 'index'}" class="btn btn-ghost text-xl">Once Human</NuxtLink>
            </div>
            <div class="navbar-center hidden xl:flex">
                <ul class="menu menu-horizontal px-1">
                    <li><NuxtLink :to="{name: 'index'}">Index</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'specializations'}">Specializations</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'memetics'}">Memetics</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'items'}">Items</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'recipes'}">Recipes</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'characters'}">Characters</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'hives'}">Hives</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'scenarios'}">Scenarios</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'servers'}">Servers</NuxtLink></li>
                    <li><NuxtLink :to="{name: 'about'}">About</NuxtLink></li>
                </ul>
            </div>
            <div class="navbar-end">
                <a class="btn btn-primary">Button</a>
            </div>
        </div>
    </div>
</template>