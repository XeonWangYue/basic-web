// API utilities for commit page

export const useCommitApi = () => {
    const token = useCookie('access_token')

    const getAuthHeaders = () => {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (token.value) headers['Authorization'] = `Bearer ${token.value}`
        return headers
    }

    const executeCode = async (code: string, language: string, stdin: string) => {
        return await $fetch('/api/run', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: { code, language, stdin },
        })
    }

    const submitSolution = async (code: string, language: string) => {
        const formData = new FormData()
        formData.append("code", code)
        formData.append("language", language)
        return await $fetch('/api/commit/1', {
            method: 'POST',
            body: formData,
        })
    }

    const getVerdict = async (submissionId: string) => {
        return await $fetch(`/api/commit/verdict?submission_id=${submissionId}`, {})
    }

    const getSubmission = async (submissionId: string) => {
        return await $fetch(`/api/commit/detail?submission_id=${submissionId}`, {})
    }

    return {
        executeCode,
        submitSolution,
        getVerdict,
        getSubmission,
        getAuthHeaders,
    }
}