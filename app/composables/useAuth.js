export const useAuth = () => {
    // 全局响应式状态：仅内存存储，SSR 安全，刷新页面清空
    const accessToken = useState('accessToken', () => '')

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
    }

    return {
        accessToken,
        login,
        logout,
        refreshToken
    }
}