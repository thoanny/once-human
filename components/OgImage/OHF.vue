<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        headline?: string;
        icon?: string;
        rarity?: string;
    }>(),
    {
        headline: 'Once Human',
        title: 'Bienvenue métas !',
        description:
            'Découvrez notre fansite dédié à Once Human : une base de données et des outils exclusifs pour la communauté francophone !',
    },
);

const title = computed(() => {
    const max = 25;
    return props.title.length < max ? props.title : props.title.slice(0, max) + '...';
});
const description = computed(() => {
    const max = 130;
    return props.description.length < max
        ? props.description
        : props.description.slice(0, max) + '...';
});
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center bg-[#1d232a]">
        <svg
            class="absolute right-0 top-0"
            width="629"
            height="593"
            viewBox="0 0 629 593"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_f_199_94966)">
                <path
                    d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z"
                    fill="#00b29f"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_199_94966"
                    x="0.873535"
                    y="-659"
                    width="1255.25"
                    height="1251.52"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur stdDeviation="40.5" result="effect1_foregroundBlur_199_94966" />
                </filter>
            </defs>
        </svg>

        <div class="w-[800px] px-[100px]">
            <p v-if="headline" class="uppercase text-[25px] text-[#00b29f] mb-6 font-semibold">
                {{ headline }}
            </p>
            <h1
                v-if="title"
                class="w-[600px] m-0 text-[35px] font-semibold mb-4 text-white flex items-center gap-6"
            >
                <img :src="icon" alt="" v-if="icon" class="h-16 w-16 border-2 border-[#00b29f]" />
                <span>{{ title }}</span>
            </h1>
            <p v-if="description" class="text-[25px] text-[#E4E4E7] leading-tight mb-6">
                {{ description }}
            </p>
            <div class="text-white text-lg font-semibold">&rarr; once-human.thoanny.fr</div>
        </div>
        <svg
            id="b"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 474.8 504"
            width="300"
            height="300"
            class="absolute top-[140px] right-[90px]"
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
                    fill="#00b29f"
                />
                <polygon
                    points="474.8 92.81 372.28 270.38 102.52 270.38 0 92.81 474.8 92.81"
                    fill="#00b29f"
                />
                <path
                    d="M377.06,3.03l-12.64,29.54c-3.67,8.59-8.1,16.84-13.21,24.66l-11.38,17.4-16.06,24.73c-2.72,4.2-6.03,7.97-9.83,11.21l-6.92,5.9c-1.31,1.12-2.11,2.72-2.21,4.45l-2.49,40.42c-.41,6.66-1.09,13.3-2.03,19.91l-18.03,126.17c-.15,1.03-1.5,1.3-2.04.41l-39.26-66.22-34.05-64.83-.38-1.09.43,149.45c0,.94-1.31,1.17-1.63.29l-45.47-123.16c-1.82-4.93-3.49-9.92-4.99-14.96l-13.77-45.97c-.21-.7-.67-1.3-1.29-1.68l-6.75-4.15c-1.57-.97-2.85-2.36-3.68-4.01l-11.27-22.53c-1.63-3.26-3.56-6.37-5.76-9.27l-16.72-22.02c-1.54-2.02-2.99-4.11-4.38-6.24L55.34,16.07c-.39-.59.22-1.33.88-1.07l51.37,20.4c8.19,3.26,15.97,7.47,23.17,12.55l12.61,8.9c1.84,1.3,3.94,2.17,6.16,2.55l8.71,1.48c.1.02.18-.07.15-.17-.28-.77.23-1.67,1.12-1.74l14.27-1.61c.54-.06,1,.39.96.93l-.05.52h1.18c.59,0,1.18-.09,1.74-.25L374.44.09c1.76-.52,3.34,1.24,2.62,2.94Z"
                    fill="#bd1350"
                />
            </g>
        </svg>
    </div>
</template>
