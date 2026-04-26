// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return
    const { accessToken, initAuth } = useAuth()
    if (!accessToken.value) {
        await initAuth()
    }

    const isLoginPage = to.path === '/login'
    const hasToken = !!accessToken.value
    // 未登录且访问非登录页：跳转登录
    if (!hasToken && !isLoginPage) {
        console.log("Redirect to login", accessToken.value)
        return navigateTo('/login', { replace: true })
    }

    // 已登录访问登录页：跳转首页
    if (hasToken && isLoginPage) {
        return navigateTo('/', { replace: true })
    }
})