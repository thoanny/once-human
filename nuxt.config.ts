// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            apiURL: 'https://api.thoanny.fr',
        },
    },
    css: ['~/assets/app.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    app: {
        head: {
            link: [
                {
                    rel: 'manifest',
                    href: '/site.webmanifest',
                },
            ],
        },
    },
    sitemap: {
        sources: ['https://api.thoanny.fr/once-human/sitemap'],
        exclude: ['/me'],
    },
    robots: {
        blockNonSeoBots: true,
        blockAiBots: true,
    },
    site: {
        url: 'https://once-human.thoanny.fr',
        name: 'Fansite Once Human',
    },
    seo: {
        meta: {
            description:
                'Découvrez notre fansite dédié à Once Human : une base de données et des outils exclusifs pour la communauté francophone !',
            twitterCreator: '@thoanny_',
            author: 'Thoanny',
            colorScheme: 'dark',
        },
    },
    modules: ['nuxt-auth-utils', 'nuxt-time', 'nuxt-countdown', '@nuxtjs/seo'],
});
