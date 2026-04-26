export const useWebSocket = () => {
    // 连接状态
    const isConnected = ref(false)
    // 收到的消息
    const message = ref<any>(null)
    // WebSocket 实例
    let socket: WebSocket | null = null

    // 后端 WebSocket 地址（替换成你的）
    const WS_URL = 'ws://localhost:8081/ws/info'

    let reconnectTimer: any = null
    let reconnectAttempts = 0 // 重连次数
    const maxReconnectAttempts = 5 // 最大重连次数
    const reconnectDelay = 3000 // 重连间隔

    // 清空定时器
    const clearReconnectTimer = () => {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer)
            reconnectTimer = null
        }
    }

    // 初始化连接
    const connect = () => {
        // 仅在客户端执行
        if (import.meta.server) return
        const { accessToken } = useAuth()

        // 创建 WebSocket（无法直接传 Header，所以把 token 拼在地址里，后端能拿到）
        socket = new WebSocket(`${WS_URL}?token=${accessToken.value}`)

        // 连接成功
        socket.onopen = (e) => {
            console.log(e)
            isConnected.value = true
            if (!e.code) {
                reconnectAttempts = 0 // 重置重连次数
            }
            console.log('✅ WebSocket 连接成功')
        }

        // 收到后端消息
        socket.onmessage = (event) => {
            message.value = event.data
            console.log('📩 收到消息：', event.data)
        }

        // 连接关闭
        socket.onclose = (e) => {
            isConnected.value = false
            socket = null

            // ✅ 如果是正常关闭（代码1000），不重连
            if (e.code === 1000) {
                console.log('✅ 正常关闭，不重连')
                return
            }

            // ✅ 超过最大重连次数，停止
            if (reconnectAttempts >= maxReconnectAttempts) {
                console.log('❌ 重连次数耗尽，停止重连')
                return
            }

            // ✅ 执行重连
            reconnectAttempts++
            console.log(`🔄 第 ${reconnectAttempts} 次重连...`)

            clearReconnectTimer()
            reconnectTimer = setTimeout(() => {
                connect()
            }, reconnectDelay)
        }

        // 连接错误
        socket.onerror = (error) => {
            console.error('⚠️ WebSocket 错误：', error)
        }
    }

    // 发送消息给后端
    const sendMessage = (msg: string) => {
        if (socket && isConnected.value) {
            socket.send(msg)
        }
    }

    // 关闭连接
    const closeSocket = () => {
        socket?.close()
    }


    return {
        isConnected,
        message,
        sendMessage,
        closeSocket,
        connect,
    }
}