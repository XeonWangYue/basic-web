export const useAuth = () => {
    // 全局响应式状态：仅内存存储，SSR 安全，刷新页面清空
    const accessToken = useState('accessToken', () => '')

    const isRefreshing = ref(false)

    const initAuth = async () => {
        // 已经有 token 了，不用刷新
        if (import.meta.server) return
        if (accessToken.value) return
        try {
            // 无锁刷新
            isRefreshing.value = true
            const { data } = await $fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include', // 自动带 refresh cookie
                retry: 0 // 禁止重试，防止刷屏
            })
            accessToken.value = data.accessToken
        } catch (e) {
            // 刷新失败 = 未登录
            accessToken.value = ''
        } finally {
            isRefreshing.value = false
        }
    }


    // 登录：保存 Access Token（Refresh Token 后端自动写 Cookie）
    const login = async (token) => {
        const { data } = await $fetch("/api/auth/login", {
            method: "POST",
            params: {
                "initToken": token
            }
        })

        // 只存储 Access Token，Refresh Token 不处理
        accessToken.value = data.accessToken || ''
    }

    // 登出：清空 Token + 调用后端登出接口（清除 Cookie）
    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' })
        accessToken.value = ''
        // 页面跳转
        navigateTo('/login')
    }

    // 刷新 Token：自动携带 Refresh Token Cookie，获取新的 Access Token
    const refreshToken = async () => {
        if (isRefreshing.value) {
            await new Promise(r => setTimeout(r, 100))
            return accessToken.value
        }
        isRefreshing.value = true
        try {
            const { data } = await $fetch('/api/auth/refresh', {
                method: 'POST',
                // 关键：自动携带浏览器中的 Refresh Token Cookie
                credentials: 'include'
            })
            accessToken.value = data.accessToken || ''
            return accessToken.value
        } catch (e) {
            // 刷新失败：登出
            logout()
            return null
        }
        finally {
            isRefreshing.value = false
        }
    }

    return {
        accessToken,
        login,
        logout,
        refreshToken,
        initAuth
    }
}