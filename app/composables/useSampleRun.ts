// Sample run logic for commit page

export const useSampleRun = () => {
    const { executeCode } = useCommitApi()

    const sampleStdin = ref('')
    const sampleRunning = ref(false)
    const sampleExecResult = ref<any>(null)
    const sampleExecError = ref<string | null>(null)
    const sampleExecPolling = ref(false)
    const sampleExecPollingCount = ref(0)
    const sampleTab = ref('stdin')
    const sampleConsoleLog = ref<string[]>([])

    const resetSampleResult = () => {
        sampleExecResult.value = null
        sampleExecError.value = null
        sampleExecPolling.value = false
        sampleExecPollingCount.value = 0
        sampleConsoleLog.value = []
    }

    const pollSampleExecResult = async (execId: string) => {
        sampleExecPollingCount.value = 0
        sampleExecPolling.value = true

        const poll = async () => {
            if (!sampleExecPolling.value) return

            sampleExecPollingCount.value++
            // Note: This uses a generic poll endpoint - adjust if needed
            const result = await $fetch(`/api/exec/result?exec_id=${execId}`)
            sampleConsoleLog.value = [
                `轮询第 ${sampleExecPollingCount.value} 次`,
                `状态: ${JSON.stringify(result, null, 2)}`
            ]
            sampleExecResult.value = result

            if ((result as any).status === 'done' || (result as any).status === 'error' || sampleExecPollingCount.value >= 20) {
                sampleExecPolling.value = false
                sampleRunning.value = false
                if ((result as any).status === 'done') {
                    sampleTab.value = 'stdout'
                }
                return
            }

            setTimeout(poll, 3000)
        }

        await poll()
    }

    const handleSampleRun = async (code: string, language: string) => {
        if (sampleRunning.value) return

        resetSampleResult()
        sampleRunning.value = true
        sampleConsoleLog.value = ['开始执行示例运行...']

        try {
            const result = await executeCode(code, language, sampleStdin.value)
            sampleConsoleLog.value = [...sampleConsoleLog.value, `提交响应: ${JSON.stringify(result, null, 2)}`]
            sampleExecResult.value = result

            if ((result as any).exec_id) {
                await pollSampleExecResult((result as any).exec_id)
            } else if ((result as any).stderr) {
                sampleExecError.value = (result as any).stderr
                sampleRunning.value = false
            } else {
                sampleRunning.value = false
            }
        } catch (e: any) {
            sampleExecError.value = e?.message || '未知错误'
            sampleConsoleLog.value = [...sampleConsoleLog.value, `错误: ${e}`]
            sampleRunning.value = false
        }
    }

    return {
        sampleStdin,
        sampleRunning,
        sampleExecResult,
        sampleExecError,
        sampleExecPolling,
        sampleExecPollingCount,
        sampleTab,
        sampleConsoleLog,
        handleSampleRun,
    }
}