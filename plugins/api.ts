export default defineNuxtPlugin((nuxtApp) => {
    const { session, clear } = useUserSession();
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.apiURL,
        onRequest({ request, options, error }) {
            if (session.value?.token && options.authenticated === true) {
                // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
                options.headers.set('Authorization', `Bearer ${session.value?.token}`);
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => {
                    clear();
                    navigateTo('/login');
                });
            }
        },
    });

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api,
        },
    };
});
