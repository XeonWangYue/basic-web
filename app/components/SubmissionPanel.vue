<template>
    <div class="results-panel">
        <!-- 空闲状态 -->
        <div v-if="!submitting && !submissionResult" class="idle-state">
            <el-icon :size="48" color="var(--el-text-color-placeholder)">
                <Promotion />
            </el-icon>
            <p>提交代码后，评测结果将显示在这里</p>
        </div>

        <!-- 加载状态 -->
        <div v-else-if="submitting || submitPolling" class="idle-state">
            <el-icon :size="48" color="var(--el-color-primary)" class="is-loading">
                <Loading />
            </el-icon>
            <p v-if="submitPolling">正在等待评测结果... ({{ submitPollingCount }})</p>
            <p v-else>正在提交代码...</p>
        </div>

        <!-- 结果展示 -->
        <template v-else-if="submissionResult">
            <!-- 状态栏 -->
            <div class="status-bar-submission">
                <div class="status-left">
                    <el-tag :type="getStatusType(overallStatus)" size="large" effect="dark">
                        {{ overallStatus }}
                    </el-tag>
                    <span class="submission-id-text" v-if="submissionId">
                        #{{ submissionId }}
                    </span>
                </div>
                <div class="status-right">
                    <span class="total-time-memory" v-if="totalTime">
                        总时间: {{ totalTime }}ms
                    </span>
                    <span class="total-time-memory" v-if="totalMemory">
                        总内存: {{ formatMemory(totalMemory) }}
                    </span>
                </div>
            </div>

            <!-- 筛选栏 -->
            <div class="result-filter-bar" v-if="hasResults">
                <el-tag v-for="(count, verdict) in verdictCounts" :key="verdict"
                    :type="getFilterTagType(String(verdict))" class="filter-tag"
                    :class="{ active: filterVerdict === verdict }" @click="setFilter(String(verdict))" size="small"
                    effect="plain">
                    {{ verdict }}: {{ count }}
                </el-tag>
                <el-tag class="filter-tag" :class="{ active: filterVerdict === null }" @click="setFilter(null)"
                    size="small" type="info" effect="plain">
                    全部: {{ totalResults }}
                </el-tag>
            </div>

            <!-- 结果列表 -->
            <div class="result-scroll-area">
                <div v-for="(item, index) in filteredResults" :key="index" class="result-item"
                    :class="getVerdictClass(item.verdict)">
                    <div class="result-item-header"
                        :class="{ 'result-expanded': expandedResults[item.testcase_id || index] }"
                        @click="toggleExpand(item.testcase_id || index)">
                        <div class="result-item-left">
                            <el-tag :type="getStatusType(item.verdict)" size="small" effect="dark">
                                {{ item.verdict }}
                            </el-tag>
                            <span class="result-name">
                                测试点 {{ item.testcase_id || Number(index) + 1 }}
                            </span>
                        </div>
                        <div class="result-item-right">
                            <span class="result-meta">{{ item.time }}ms</span>
                            <span class="result-meta">{{ formatMemory(item.memory) }}</span>
                            <el-icon class="detail-arrow"
                                :class="{ 'arrow-expanded': expandedResults[item.testcase_id || index] }">
                                <ArrowDown />
                            </el-icon>
                        </div>
                    </div>

                    <!-- 展开详情 -->
                    <Transition name="slide-fade">
                        <div v-if="expandedResults[item.testcase_id || index]" class="result-detail-inline">
                            <div :class="['detail-verdict-banner', getBannerClass(item.verdict)]">
                                <el-tag :type="getStatusType(item.verdict)" size="small" effect="dark">
                                    {{ item.verdict }}
                                </el-tag>
                                <span style="font-size: 13px; font-weight: 600;">{{ getVerdictMessage(item.verdict)
                                }}</span>
                            </div>

                            <div class="detail-meta-inline">
                                <span class="meta-item">
                                    <el-icon>
                                        <Timer />
                                    </el-icon>
                                    运行时间: {{ item.time }}ms
                                </span>
                                <span class="meta-item">
                                    <el-icon>
                                        <Coin />
                                    </el-icon>
                                    内存占用: {{ formatMemory(item.memory) }}
                                </span>
                            </div>

                            <template v-if="item.verdict === 'WA'">
                                <div class="detail-section-inline">
                                    <span class="detail-section-title-inline">你的输出</span>
                                    <pre class="detail-code-inline error-inline">{{ item.user_output || '(无输出)' }}</pre>
                                </div>
                                <div class="detail-section-inline">
                                    <span class="detail-section-title-inline">期望输出</span>
                                    <pre
                                        class="detail-code-inline expected-inline">{{ item.expected_output || '(无)' }}</pre>
                                </div>
                            </template>

                            <template v-if="item.verdict === 'RE' && item.error_info">
                                <div class="detail-section-inline">
                                    <span class="detail-section-title-inline">错误信息</span>
                                    <pre class="detail-code-inline error-info-inline">{{ item.error_info }}</pre>
                                </div>
                            </template>

                            <template v-if="item.verdict === 'CE' && item.compile_info">
                                <div class="detail-section-inline">
                                    <span class="detail-section-title-inline">编译信息</span>
                                    <pre class="detail-code-inline compile-inline">{{ item.compile_info }}</pre>
                                </div>
                            </template>
                        </div>
                    </Transition>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import {
    Promotion,
    Loading,
    ArrowDown,
    Timer,
    Coin,
} from '@element-plus/icons-vue'

const props = defineProps<{
    submitting: boolean
    submitPolling: boolean
    submitPollingCount: number
    submissionId: string | null
    submissionResult: any
    expandedResults: Record<string, boolean>
    filterVerdict: string | null
}>()

const emit = defineEmits(['toggleExpand', 'setFilter'])

const toggleExpand = (key: string | number) => {
    emit('toggleExpand', String(key))
}

const setFilter = (verdict: string | null) => {
    emit('setFilter', verdict)
}

const getStatusType = (verdict: string) => {
    const map: Record<string, string> = {
        'AC': 'success',
        'WA': 'danger',
        'TLE': 'warning',
        'MLE': 'warning',
        'RE': 'danger',
        'CE': 'danger',
        'OLE': 'warning',
        'PE': 'warning',
        'SE': 'info',
    }
    return (map[verdict] || 'info') as any
}

const getVerdictClass = (verdict: string) => {
    return `verdict-${verdict?.toLowerCase() || 'se'}`
}

const getBannerClass = (verdict: string) => {
    return `verdict-banner-${verdict?.toLowerCase() || 'se'}`
}

const getVerdictMessage = (verdict: string) => {
    const messages: Record<string, string> = {
        'AC': '答案正确',
        'WA': '答案错误',
        'TLE': '时间超限',
        'MLE': '内存超限',
        'RE': '运行错误',
        'CE': '编译错误',
        'OLE': '输出超限',
        'PE': '格式错误',
        'SE': '系统错误',
    }
    return messages[verdict] || verdict
}

const getFilterTagType = (verdict: string) => {
    return getStatusType(verdict)
}

const formatMemory = (memory: number | null | undefined) => {
    if (!memory) return '0 KB'
    if (memory < 1024) return `${memory} KB`
    return `${(memory / 1024).toFixed(2)} MB`
}

const results = computed(() => {
    if (!props.submissionResult) return []
    return props.submissionResult.results || props.submissionResult.testcase_results || []
})

const hasResults = computed(() => results.value.length > 0)

const totalResults = computed(() => results.value.length)

const verdictCounts = computed(() => {
    const counts: Record<string, number> = {}
    results.value.forEach((item: any) => {
        const v = item.verdict || 'SE'
        counts[v] = (counts[v] || 0) + 1
    })
    return counts
})

const overallStatus = computed(() => {
    if (!props.submissionResult) return '未知'
    return props.submissionResult.verdict || props.submissionResult.status || '未知'
})

const totalTime = computed(() => {
    if (!props.submissionResult) return null
    return props.submissionResult.total_time || props.submissionResult.time
})

const totalMemory = computed(() => {
    if (!props.submissionResult) return null
    return props.submissionResult.total_memory || props.submissionResult.memory
})

const filteredResults = computed(() => {
    if (!props.filterVerdict) return results.value
    return results.value.filter((item: any) => item.verdict === props.filterVerdict)
})
</script>