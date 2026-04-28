<template>
    <div class="page-container commit-page">
        <!-- 顶部操作栏 -->
        <CommitHeader :code="code" :language="language" :loading="submitting" :last-saved-time="lastSavedTime"
            :problem-data="problemData" @language-change="handleLanguageChange" @save="handleSaveCode"
            @submit="handleSubmit" @toggle-panel="togglePanel" @settings="showSettingsDialog = true" />

        <!-- 主体工作区：左右两栏 -->
        <el-splitter class="main-workspace">
            <!-- ====== 左侧面板：题目详情 + 测试用例 ====== -->
            <el-splitter-panel class="left-panel">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-panel label="题目详情" name="question">
                        <div class="left-panel-top">
                            <ProblemDetail :problem-data="problemData" />
                        </div>
                        <div class="left-panel-bottom">
                            <TestcasePanel :testcases="testcases" :selected-testcase-index="selectedTestcaseIndex"
                                @add-testcase="addTestcase" @select-testcase="selectTestcase"
                                @remove-testcase="removeTestcase" />
                        </div>
                    </el-tab-panel>
                    <el-tab-panel label="提交结果" name="submission">
                        <!-- 评测结果 -->
                        <SubmissionPanel :submitting="submitting" :submit-polling="submitPolling"
                            :submit-polling-count="submitPollingCount" :submission-id="submissionId"
                            :submission-result="submissionResult" :expanded-results="expandedResults"
                            :filter-verdict="filterVerdict" @toggle-expand="toggleExpand" @set-filter="setFilter" />
                    </el-tab-panel>
                </el-tabs>



            </el-splitter-panel>

            <!-- ====== 右侧面板：代码编辑器（上）+ 运行样例（下） ====== -->
            <el-splitter-panel class="right-panel">
                <el-splitter layout="vertical">
                    <!-- 右上：答案提交（代码编辑器 + 评测结果） -->
                    <el-splitter-panel class="right-panel-top">
                        <div class="editor-tab-content">
                            <!-- 代码编辑器 -->
                            <div class="editor-wrapper">
                                <div ref="editorContainer" style="width: 100%; height: 100%;"></div>
                            </div>

                        </div>
                    </el-splitter-panel>

                    <!-- 右下：运行样例 -->
                    <el-splitter-panel class="right-panel-bottom">
                        <SamplePanel v-model="sampleStdin" :sample-running="sampleRunning"
                            :sample-exec-result="sampleExecResult" :sample-exec-error="sampleExecError"
                            :sample-exec-polling-count="sampleExecPollingCount" :sample-console-log="sampleConsoleLog"
                            @run-sample="handleRunSample" />
                    </el-splitter-panel>
                </el-splitter>
            </el-splitter-panel>
        </el-splitter>

        <!-- 设置对话框 -->
        <EditorSettingsDialog v-model="showSettingsDialog" :settings="settings" @close="showSettingsDialog = false"
            @save="handleSettingsSave" />
    </div>
</template>

<script setup lang="ts">

import {
    Document,
    Promotion,
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import type { EditorSettings } from '~/constants/commit'
import { defaultTemplates } from '~/constants/commit'

const route = useRoute()

// Use existing composables
const {
    sampleStdin, sampleRunning, sampleExecResult, sampleExecError,
    sampleExecPollingCount, sampleConsoleLog, handleSampleRun,
} = useSampleRun()

const {
    submitting, submitPolling, submitPollingCount, submissionId,
    submissionResult, expandedResults, filterVerdict,
    handleSubmit: doSubmit, toggleResultExpand,
} = useSubmission()

// Panel state
const activePanel = ref('editor')
const showSettingsDialog = ref(false)
const editorContainer = useTemplateRef("editorContainer")
let editor: any = null
let monacoRef: any = null

// Code & language state
const code = ref('')
const language = ref('python')
const settings = ref<EditorSettings>({
    fontSize: 14,
    tabSize: 4,
    theme: 'vs-dark',
    wordWrap: 'off',
    minimap: false,
    fontFamily: 'Consolas, "Courier New", monospace',
    lineHeight: 1.6,
    bracketMatching: true,
    lineNumbers: 'on',
})
const lastSavedTime = ref<string | null>(null)

// Testcases
const testcases = ref<Array<{ stdin: string; expected_output: string }>>([])
const selectedTestcaseIndex = ref<number | null>(null)

// Problem data
const problemData = ref<any>({
    id: route.params.id,
    title: 'A + B Problem',
    description: '这是 A + B Problem 的题目描述。',
    inputFormat: '输入格式说明',
    outputFormat: '输出格式说明',
    samples: [{ input: '1 2', output: '3' }],
    timeLimit: 1,
    memoryLimit: 256,
    source: '算法竞赛',
    difficulty: '简单',
})

// Status tag type for result badge
const getStatusTagType = computed(() => {
    if (!submissionResult.value) return 'info'
    const verdict = submissionResult.value?.verdict || submissionResult.value?.status || ''
    const map: Record<string, string> = {
        'AC': 'success', 'WA': 'danger', 'TLE': 'warning',
        'MLE': 'warning', 'RE': 'danger', 'CE': 'danger',
    }
    return (map[verdict] || 'info') as any
})

// Toggle panel
const togglePanel = (panel: string) => {
    activePanel.value = panel
}

// Toggle expand
const toggleExpand = (key: string) => {
    toggleResultExpand(key)
}

// Set filter
const setFilter = (verdict: string | null) => {
    filterVerdict.value = verdict
}

// Initialize default code
const initDefaultCode = (problemId: string) => {
    if (!import.meta.client) {
        return
    }
    const savedCode = localStorage.getItem(`code_${problemId}_${language.value}`)
    code.value = savedCode || defaultTemplates[language.value as keyof typeof defaultTemplates] || ''
}

initDefaultCode(route.params.id as string)

// Language change
const handleLanguageChange = (newLang: string) => {
    if (!import.meta.client) {
        return
    }
    language.value = newLang
    const savedCode = localStorage.getItem(`code_${route.params.id}_${newLang}`)
    code.value = savedCode || defaultTemplates[newLang as keyof typeof defaultTemplates] || ''
    if (editor && monacoRef) {
        const model = editor.getModel()
        if (model) {
            monacoRef.editor.setModelLanguage(model, newLang)
            editor.setValue(code.value)
        }
    }
}

// Save code
const handleSaveCode = async () => {
    if (!route.params.id) return
    localStorage.setItem(`code_${route.params.id}_${language.value}`, code.value)
    lastSavedTime.value = new Date().toLocaleTimeString()
    ElMessage.success('代码已保存')
}

// Submit
const handleSubmit = async () => {
    if (!route.params.id) {
        ElMessage.warning('无法获取题目 ID')
        return
    }
    if (!code.value.trim()) {
        ElMessage.warning('代码不能为空')
        return
    }
    activePanel.value = 'result'
    await doSubmit(code.value, language.value)
}

// Run sample
const handleRunSample = async () => {
    if (!route.params.id) {
        ElMessage.warning('无法获取题目 ID')
        return
    }
    if (!code.value.trim()) {
        ElMessage.warning('代码不能为空')
        return
    }
    await handleSampleRun(code.value, language.value)
}

// Testcase management
const addTestcase = () => {
    testcases.value.push({ stdin: '', expected_output: '' })
}

const removeTestcase = (index: number) => {
    testcases.value.splice(index, 1)
    if (selectedTestcaseIndex.value === index) {
        selectedTestcaseIndex.value = null
    } else if (selectedTestcaseIndex.value !== null && selectedTestcaseIndex.value > index) {
        selectedTestcaseIndex.value--
    }
}

const selectTestcase = (index: number) => {
    selectedTestcaseIndex.value = index
}

// Settings save
const handleSettingsSave = (newSettings: EditorSettings) => {
    settings.value = { ...settings.value, ...newSettings }
    if (editor) {
        editor.updateOptions({
            fontSize: newSettings.fontSize,
            tabSize: newSettings.tabSize,
            wordWrap: newSettings.wordWrap as any,
            minimap: { enabled: newSettings.minimap },
            lineNumbers: newSettings.lineNumbers as any,
        })
        if (monacoRef) {
            monacoRef.editor.setTheme(newSettings.theme)
        }
    }
}

// Editor initialization
onMounted(async () => {
    if (import.meta.client && editorContainer.value) {
        const monaco = await import('monaco-editor')
        monacoRef = monaco

        editor = monaco.editor.create(editorContainer.value, {
            value: code.value,
            language: language.value,
            theme: settings.value.theme,
            fontSize: settings.value.fontSize,
            tabSize: settings.value.tabSize,
            wordWrap: settings.value.wordWrap as any,
            minimap: { enabled: settings.value.minimap },
            lineNumbers: settings.value.lineNumbers as any,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            bracketPairColorization: { enabled: true },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'all',
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            folding: true,
            autoClosingBrackets: 'always',
        })

        editor.onDidChangeModelContent(() => {
            code.value = editor!.getValue()
        })
    }
})

onBeforeUnmount(() => {
    if (editor) {
        editor.dispose()
        editor = null
    }
    monacoRef = null
})

</script>

<style>
@import "~/assets/css/commit.css";
</style>
