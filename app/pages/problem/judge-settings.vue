<script setup>
const settingsForm = reactive({
    defaultTimeLimit: 1000,
    defaultMemoryLimit: 256,
    defaultLanguage: ['python', 'cpp', 'java'],
    judgeMode: 'strict',
    outputComparison: 'exact',
    showWrongAnswer: true,
    maxSubmitRate: 10,
    maxSubmitRateUnit: 'minute',
    enableSpecialJudge: false,
    specialJudgeCode: '',
    compileTimeout: 10000,
    runTimeout: 30000,
    maxOutputSize: 64,
    maxStackSize: 128,
})

const languageOptions = [
    { label: 'Python 3', value: 'python' },
    { label: 'C++ 17', value: 'cpp' },
    { label: 'Java 17', value: 'java' },
    { label: 'Go', value: 'go' },
    { label: 'JavaScript (Node.js)', value: 'javascript' },
    { label: 'Rust', value: 'rust' },
]

const handleSave = () => {
    // TODO: 调用保存判题设置接口
    ElMessage.success('保存成功')
}

const handleReset = () => {
    // TODO: 重置为默认值
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>判题设置</span>
                    <div>
                        <el-button @click="handleReset">恢复默认</el-button>
                        <el-button type="primary" @click="handleSave">保存设置</el-button>
                    </div>
                </div>
            </template>

            <el-form :model="settingsForm" label-width="160px" style="max-width: 800px;">
                <el-divider content-position="left">默认限制</el-divider>

                <el-form-item label="默认时间限制(ms)">
                    <el-input-number v-model="settingsForm.defaultTimeLimit" :min="100" :max="60000" :step="100" />
                </el-form-item>

                <el-form-item label="默认内存限制(MB)">
                    <el-input-number v-model="settingsForm.defaultMemoryLimit" :min="16" :max="4096" :step="16" />
                </el-form-item>

                <el-form-item label="允许的语言">
                    <el-checkbox-group v-model="settingsForm.defaultLanguage">
                        <el-checkbox v-for="lang in languageOptions" :key="lang.value" :label="lang.value">
                            {{ lang.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-divider content-position="left">判题模式</el-divider>

                <el-form-item label="判题模式">
                    <el-radio-group v-model="settingsForm.judgeMode">
                        <el-radio value="strict">严格模式</el-radio>
                        <el-radio value="loose">宽松模式</el-radio>
                        <el-radio value="spj">Special Judge</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="输出比较方式">
                    <el-radio-group v-model="settingsForm.outputComparison">
                        <el-radio value="exact">完全匹配</el-radio>
                        <el-radio value="ignore_space">忽略空白字符</el-radio>
                        <el-radio value="ignore_all_space">忽略所有空白</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="显示错误答案">
                    <el-switch v-model="settingsForm.showWrongAnswer" />
                    <span class="form-tip">开启后提交详情中会显示错误的输出结果</span>
                </el-form-item>

                <el-divider content-position="left">提交限制</el-divider>

                <el-form-item label="提交频率限制">
                    <el-input-number v-model="settingsForm.maxSubmitRate" :min="1" :max="100" />
                    <span style="margin-left: 8px;">次 /</span>
                    <el-select v-model="settingsForm.maxSubmitRateUnit" style="margin-left: 8px; width: 120px;">
                        <el-option label="分钟" value="minute" />
                        <el-option label="小时" value="hour" />
                    </el-select>
                </el-form-item>

                <el-divider content-position="left">高级设置</el-divider>

                <el-form-item label="编译超时(ms)">
                    <el-input-number v-model="settingsForm.compileTimeout" :min="5000" :max="60000" :step="1000" />
                </el-form-item>

                <el-form-item label="运行超时(ms)">
                    <el-input-number v-model="settingsForm.runTimeout" :min="5000" :max="120000" :step="1000" />
                </el-form-item>

                <el-form-item label="最大输出大小(MB)">
                    <el-input-number v-model="settingsForm.maxOutputSize" :min="1" :max="512" />
                </el-form-item>

                <el-form-item label="最大栈大小(MB)">
                    <el-input-number v-model="settingsForm.maxStackSize" :min="1" :max="1024" />
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>
.page-container {
    padding: 0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-tip {
    margin-left: 12px;
    font-size: 12px;
    color: #909399;
}
</style>