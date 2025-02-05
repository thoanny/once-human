import { z } from 'zod';

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);
    const config = useRuntimeConfig();

    try {
        await $fetch(`${config.public.apiURL}/token`, {
            method: 'POST',
            body: { email, password },
        }).then(async (data) => {
            await $fetch(`${config.public.apiURL}/@me`, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }).then(async (user) => {
                await setUserSession(event, {
                    user: {
                        nickname: user.nickname,
                    },
                    token: data.token,
                    refresh_token: data.refresh_token,
                });
                return {};
            });
        });
    } catch (exceptionVar) {
        throw createError({
            statusCode: 401,
            message: 'Bad credentials',
        });
    } finally {
    }
});
