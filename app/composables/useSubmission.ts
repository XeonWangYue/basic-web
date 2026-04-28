// Submission logic for commit page

export const useSubmission = () => {
    const { submitSolution, getVerdict, getSubmission } = useCommitApi()

    const submitting = ref(false)
    const submitPolling = ref(false)
    const submitPollingCount = ref(0)
    const submissionId = ref<string | null>(null)
    const submissionResult = ref<any>(null)
    const submissionVerdict = ref<any>(null)

    // Submission results panel state
    const expandedResults = ref<Record<string, boolean>>({})
    const filterVerdict = ref<string | null>(null)
    const selectedResultIndex = ref<number | null>(null)

    const startPollingVerdict = async (subId: string) => {
        submitPolling.value = true
        submitPollingCount.value = 0
        submissionId.value = subId

        const poll = async () => {
            if (!submitPolling.value) return
            submitPollingCount.value++

            try {
                const verdictResult = await getVerdict(subId)
                submissionVerdict.value = verdictResult

                const data = (verdictResult as any).data || verdictResult
                const verdict = data.verdict || data.status

                if (['AC', 'WA', 'TLE', 'MLE', 'RE', 'CE', 'OLE', 'PE', 'SE'].includes(verdict) || submitPollingCount.value >= 30) {
                    submitPolling.value = false
                    submitting.value = false

                    const detailResult = await getSubmission(subId)
                    submissionResult.value = (detailResult as any).data || detailResult
                    return
                }
            } catch (e) {
                console.error('轮询判定结果失败:', e)
            }

            setTimeout(poll, 3000)
        }

        await poll()
    }

    const handleSubmit = async (code: string, language: string) => {
        if (submitting.value) return

        submitting.value = true
        submissionResult.value = null
        submissionVerdict.value = null
        expandedResults.value = {}
        filterVerdict.value = null
        selectedResultIndex.value = null

        try {
            const result = await submitSolution(code, language)
            const data = (result as any).data || result
            const subId = data.submission_id || data.id

            if (subId) {
                await startPollingVerdict(String(subId))
            } else {
                submitting.value = false
            }
        } catch (e: any) {
            console.error('提交失败:', e)
            submitting.value = false
        }
    }

    const toggleResultExpand = (key: string) => {
        expandedResults.value[key] = !expandedResults.value[key]
    }

    return {
        submitting,
        submitPolling,
        submitPollingCount,
        submissionId,
        submissionResult,
        submissionVerdict,
        expandedResults,
        filterVerdict,
        selectedResultIndex,
        handleSubmit,
        toggleResultExpand,
    }
}