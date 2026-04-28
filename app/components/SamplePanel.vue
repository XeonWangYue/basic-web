<template>
    <div class="sample-panel">
        <div class="sample-header">
            <div class="sample-title">
                <el-icon>
                    <CaretRight />
                </el-icon>
                样例运行
            </div>
            <el-button type="primary" size="small" class="toolbar-btn run-btn" @click="$emit('runSample')"
                :loading="sampleRunning">
                <el-icon class="el-icon--left">
                    <CaretRight />
                </el-icon>
                运行
            </el-button>
        </div>
        <div class="sample-body">
            <div class="sample-left">
                <div class="sample-label">
                    <el-icon>
                        <Edit />
                    </el-icon>
                    输入
                </div>
                <div class="sample-textarea">
                    <el-input type="textarea" v-model="localStdin" placeholder="输入测试数据..." />
                </div>
            </div>
            <div class="sample-right">
                <div class="sample-label">
                    <el-icon>
                        <Monitor />
                    </el-icon>
                    输出
                </div>
                <div class="sample-result">
                    <!-- 无结果时的空状态 -->
                    <div v-if="!sampleRunning && !sampleExecResult && !sampleExecError" class="idle-state">
                        <el-icon :size="32" color="var(--el-text-color-placeholder)">
                            <CaretRight />
                        </el-icon>
                        <p>点击运行按钮执行代码</p>
                    </div>
                    <!-- 运行中状态 -->
                    <div v-else-if="sampleRunning" class="sample-result-content">
                        <div class="execution-status">
                            <div class="status-info">
                                <div class="status-dot"></div>
                                <span>正在执行...</span>
                            </div>
                            <span class="elapsed-time">轮询次数: {{ sampleExecPollingCount }}</span>
                        </div>
                        <div v-if="sampleConsoleLog.length > 0" class="console-output">
                            {{ sampleConsoleLog.join('\n') }}
                        </div>
                    </div>
                    <!-- 错误状态 -->
                    <div v-else-if="sampleExecError" class="sample-result-content">
                        <div class="error-message">
                            <div class="error-title">执行错误</div>
                            <div class="error-detail">{{ sampleExecError }}</div>
                        </div>
                    </div>
                    <!-- 结果展示 -->
                    <div v-else-if="sampleExecResult" class="sample-result-content">
                        <el-tabs v-model="activeTab" class="sample-result-tabs">
                            <el-tab-pane label="标准输出" name="stdout">
                                <div class="output-block" v-if="sampleExecResult.stdout">
                                    <div class="output-label">stdout</div>
                                    <div class="output-content">{{ sampleExecResult.stdout }}</div>
                                </div>
                                <div class="output-block" v-if="sampleExecResult.stderr">
                                    <div class="output-label">stderr</div>
                                    <div class="output-content stderr">{{ sampleExecResult.stderr }}</div>
                                </div>
                                <div class="output-block" v-if="sampleExecResult.exit_code !== undefined">
                                    <div class="output-label">exit code</div>
                                    <div class="output-content exit-code"
                                        :class="sampleExecResult.exit_code === 0 ? 'exit-zero' : 'exit-nonzero'">
                                        {{ sampleExecResult.exit_code }}
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="控制台" name="console">
                                <div class="console-output" v-if="sampleConsoleLog.length > 0">
                                    {{ sampleConsoleLog.join('\n') }}
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    CaretRight,
    Edit,
    Monitor,
} from '@element-plus/icons-vue'

const props = defineProps<{
    modelValue: string
    sampleRunning: boolean
    sampleExecResult: any
    sampleExecError: string | null
    sampleExecPollingCount: number
    sampleConsoleLog: string[]
}>()

const emit = defineEmits(['update:modelValue', 'runSample'])

const activeTab = ref('stdout')

const localStdin = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})
</script>