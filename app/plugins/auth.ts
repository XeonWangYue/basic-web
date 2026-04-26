export default defineNuxtPlugin(() => {
    const { accessToken, refreshToken } = useAuth()

    // 全局拦截所有 $fetch / useFetch
    globalThis.$fetch = $fetch.create({

        // 请求前统一加 token
        async onRequest({ request, response, options }) {
            const skipUrls = ['/api/auth/login', '/api/auth/refresh']
            if (skipUrls.some(u => request.includes(u))) return

            if (accessToken.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken.value}`
                }
            }
            options.credentials = 'include'
        },

        // 响应错误：401 自动刷新 + 重试
        async onResponseError({ request, response, options }) {
            // 只有 401 才处理
            if (response.status !== 401) return
            
            const skipUrls = ['/api/auth/login', '/api/auth/refresh']
            if (skipUrls.some(u => request.includes(u))) return

            // 刷新 Token
            const newToken = await refreshToken()
            if (!newToken) return

            // 用新 token 重试一次
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${newToken}`
            }

            // 重试失败的请求
            return $fetch(request, options)
        }
    })
})