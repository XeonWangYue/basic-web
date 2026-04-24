// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
    const { accessToken } = useAuth()
    const isLoginPage = to.path === '/login'

    // 未登录且访问非登录页：跳转登录
    if (!accessToken.value && !isLoginPage) {
        console.log("Redirect to login", accessToken.value)
        return navigateTo('/login')
    }

    // 已登录访问登录页：跳转首页
    if (accessToken.value && isLoginPage) {
        return navigateTo('/')
    }
})