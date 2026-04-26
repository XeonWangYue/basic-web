// 页面加载 → 自动恢复 Token
export default defineNuxtPlugin(async () => {
    const { initAuth } = useAuth()

    // 页面刷新后自动执行
    await initAuth()
})