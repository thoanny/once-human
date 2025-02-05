<template>
    <footer
        class="flex flex-col-reverse md:flex-row gap-y-4 bg-neutral text-neutral-content items-center justify-between p-4"
    >
        <aside class="flex flex-col md:flex-row gap-2 items-center text-center">
            <svg
                id="b"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 474.8 504"
                width="300"
                height="300"
                class="size-8"
            >
                <g id="c">
                    <polygon
                        points="196.92 433.89 277.88 433.89 237.4 504 196.92 433.89"
                        fill="#bd1350"
                    />
                    <polygon
                        points="318.36 363.78 291.32 410.6 183.47 410.6 156.45 363.78 318.36 363.78"
                        fill="#bd1350"
                    />
                    <polygon
                        points="358.84 293.67 331.81 340.49 143 340.49 115.97 293.67 358.84 293.67"
                        fill="currentColor"
                        class="text-accent"
                    />
                    <polygon
                        points="474.8 92.81 372.28 270.38 102.52 270.38 0 92.81 474.8 92.81"
                        fill="currentColor"
                        class="text-accent"
                    />
                    <path
                        d="M377.06,3.03l-12.64,29.54c-3.67,8.59-8.1,16.84-13.21,24.66l-11.38,17.4-16.06,24.73c-2.72,4.2-6.03,7.97-9.83,11.21l-6.92,5.9c-1.31,1.12-2.11,2.72-2.21,4.45l-2.49,40.42c-.41,6.66-1.09,13.3-2.03,19.91l-18.03,126.17c-.15,1.03-1.5,1.3-2.04.41l-39.26-66.22-34.05-64.83-.38-1.09.43,149.45c0,.94-1.31,1.17-1.63.29l-45.47-123.16c-1.82-4.93-3.49-9.92-4.99-14.96l-13.77-45.97c-.21-.7-.67-1.3-1.29-1.68l-6.75-4.15c-1.57-.97-2.85-2.36-3.68-4.01l-11.27-22.53c-1.63-3.26-3.56-6.37-5.76-9.27l-16.72-22.02c-1.54-2.02-2.99-4.11-4.38-6.24L55.34,16.07c-.39-.59.22-1.33.88-1.07l51.37,20.4c8.19,3.26,15.97,7.47,23.17,12.55l12.61,8.9c1.84,1.3,3.94,2.17,6.16,2.55l8.71,1.48c.1.02.18-.07.15-.17-.28-.77.23-1.67,1.12-1.74l14.27-1.61c.54-.06,1,.39.96.93l-.05.52h1.18c.59,0,1.18-.09,1.74-.25L374.44.09c1.76-.52,3.34,1.24,2.62,2.94Z"
                        fill="#bd1350"
                    />
                </g>
            </svg>
            <p class="text-sm">
                © {{ new Date().getFullYear() }} - Tous droits réservés à leurs auteur·e·s
                respectif·ve·s
            </p>
        </aside>
        <nav class="flex flex-wrap justify-center gap-y-2 gap-4">
            <NuxtLink :to="{ name: 't-potes' }" class="link link-hover">T-potes</NuxtLink>
            <a
                class="link link-hover"
                href="https://api.thoanny.fr/legal-notice"
                target="_blank"
                rel="nofollow"
            >
                Mentions légales
            </a>
        </nav>
    </footer>
</template>
