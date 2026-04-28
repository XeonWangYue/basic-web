<script setup>
const activeTab = ref('languages')

const languageList = ref([
    { id: 1, name: 'Python 3', version: '3.11.5', enabled: true, compileCmd: 'python3 {file}', runCmd: 'python3 {file}', memoryLimit: 256, timeLimit: 5000 },
    { id: 2, name: 'C++ 17', version: 'GCC 13.2', enabled: true, compileCmd: 'g++ -o {output} {file} -std=c++17', runCmd: './{output}', memoryLimit: 256, timeLimit: 3000 },
    { id: 3, name: 'Java 17', version: 'OpenJDK 17.0.8', enabled: true, compileCmd: 'javac {file}', runCmd: 'java {main}', memoryLimit: 512, timeLimit: 5000 },
    { id: 4, name: 'Go', version: '1.21.3', enabled: false, compileCmd: 'go build -o {output} {file}', runCmd: './{output}', memoryLimit: 256, timeLimit: 5000 },
    { id: 5, name: 'JavaScript (Node.js)', version: 'v20.10.0', enabled: true, compileCmd: '', runCmd: 'node {file}', memoryLimit: 256, timeLimit: 5000 },
])

const systemSettings = reactive({
    dockerImage: 'oj-judger:latest',
    maxContainers: 10,
    containerTimeout: 300,
    networkEnabled: false,
    seccompEnabled: true,
    cgroupEnabled: true,
    tmpfsSize: 64,
})

const handleSaveLanguage = (row) => {
    // TODO: 保存语言环境配置
    console.log('保存语言配置:', row)
}

const handleTestLanguage = (row) => {
    // TODO: 测试语言环境
    console.log('测试语言环境:', row)
}

const handleToggleLanguage = (row) => {
    row.enabled = !row.enabled
    // TODO: 调用切换语言状态接口
}

const handleSaveSystem = () => {
    // TODO: 保存系统设置
    console.log('保存系统设置:', systemSettings)
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>判题环境配置</span>
                </div>
            </template>

            <el-tabs v-model="activeTab">
                <el-tab-pane label="语言环境" name="languages">
                    <el-table :data="languageList" stripe border style="width: 100%">
                        <el-table-column prop="name" label="语言" width="160" />
                        <el-table-column prop="version" label="版本" width="140" />
                        <el-table-column label="状态" width="100">
                            <template #default="{ row }">
                                <el-tag :type="row.enabled ? 'success' : 'info'">
                                    {{ row.enabled ? '已启用' : '已禁用' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="compileCmd" label="编译命令">
                            <template #default="{ row }">
                                <el-text type="info" style="font-family: monospace;">{{ row.compileCmd || '—'
                                    }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column prop="runCmd" label="运行命令">
                            <template #default="{ row }">
                                <el-text type="info" style="font-family: monospace;">{{ row.runCmd }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label="内存限制" width="120">
                            <template #default="{ row }">{{ row.memoryLimit }} MB</template>
                        </el-table-column>
                        <el-table-column label="时间限制" width="120">
                            <template #default="{ row }">{{ row.timeLimit }} ms</template>
                        </el-table-column>
                        <el-table-column label="操作" width="250">
                            <template #default="{ row }">
                                <el-button type="primary" link @click="handleSaveLanguage(row)">保存</el-button>
                                <el-button type="success" link @click="handleTestLanguage(row)">测试</el-button>
                                <el-button :type="row.enabled ? 'warning' : 'success'" link
                                    @click="handleToggleLanguage(row)">
                                    {{ row.enabled ? '禁用' : '启用' }}
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="系统设置" name="system">
                    <el-form :model="systemSettings" label-width="180px" style="max-width: 800px; margin-top: 16px;">
                        <el-form-item label="Docker 镜像">
                            <el-input v-model="systemSettings.dockerImage" />
                        </el-form-item>

                        <el-form-item label="最大容器数">
                            <el-input-number v-model="systemSettings.maxContainers" :min="1" :max="100" />
                        </el-form-item>

                        <el-form-item label="容器超时时间(秒)">
                            <el-input-number v-model="systemSettings.containerTimeout" :min="30" :max="3600"
                                :step="30" />
                        </el-form-item>

                        <el-form-item label="Tmpfs 大小(MB)">
                            <el-input-number v-model="systemSettings.tmpfsSize" :min="16" :max="1024" :step="16" />
                        </el-form-item>

                        <el-divider content-position="left">安全设置</el-divider>

                        <el-form-item label="启用网络">
                            <el-switch v-model="systemSettings.networkEnabled" />
                            <span class="form-tip">开启后判题容器可以访问网络（不推荐）</span>
                        </el-form-item>

                        <el-form-item label="启用 Seccomp">
                            <el-switch v-model="systemSettings.seccompEnabled" />
                            <span class="form-tip">使用 Seccomp 限制系统调用</span>
                        </el-form-item>

                        <el-form-item label="启用 Cgroup">
                            <el-switch v-model="systemSettings.cgroupEnabled" />
                            <span class="form-tip">使用 Cgroup 限制资源使用</span>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="handleSaveSystem">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
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