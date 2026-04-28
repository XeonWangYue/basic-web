<script setup>
const judgerList = ref([
    { id: 1, name: '判题机-01', ip: '192.168.1.101', status: 'online', cpuUsage: 45, memoryUsage: 62, diskUsage: 38, taskCount: 12, maxTasks: 50, uptime: '15天 3小时' },
    { id: 2, name: '判题机-02', ip: '192.168.1.102', status: 'online', cpuUsage: 78, memoryUsage: 85, diskUsage: 42, taskCount: 35, maxTasks: 50, uptime: '10天 12小时' },
    { id: 3, name: '判题机-03', ip: '192.168.1.103', status: 'offline', cpuUsage: 0, memoryUsage: 0, diskUsage: 55, taskCount: 0, maxTasks: 50, uptime: '—' },
])

const overallStats = reactive({
    totalJudgers: 3,
    onlineJudgers: 2,
    totalTasks: 47,
    avgResponseTime: '128ms',
})

const handleRefresh = () => {
    // TODO: 刷新判题机状态
}

const getStatusType = (status) => {
    return status === 'online' ? 'success' : 'danger'
}

const getStatusText = (status) => {
    return status === 'online' ? '在线' : '离线'
}

const getProgressColor = (percentage) => {
    if (percentage < 50) return '#67c23a'
    if (percentage < 80) return '#e6a23c'
    return '#f56c6c'
}
</script>

<template>
    <div class="page-container">
        <el-row :gutter="16" class="stat-row">
            <el-col :xs="12" :sm="6">
                <el-card shadow="hover" class="stat-card">
                    <div class="stat-title">判题机总数</div>
                    <div class="stat-value">{{ overallStats.totalJudgers }}</div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="6">
                <el-card shadow="hover" class="stat-card">
                    <div class="stat-title">在线数量</div>
                    <div class="stat-value stat-success">{{ overallStats.onlineJudgers }}</div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="6">
                <el-card shadow="hover" class="stat-card">
                    <div class="stat-title">当前任务数</div>
                    <div class="stat-value">{{ overallStats.totalTasks }}</div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="6">
                <el-card shadow="hover" class="stat-card">
                    <div class="stat-title">平均响应时间</div>
                    <div class="stat-value">{{ overallStats.avgResponseTime }}</div>
                </el-card>
            </el-col>
        </el-row>

        <el-card style="margin-top: 16px;">
            <template #header>
                <div class="card-header">
                    <span>判题机负载监控</span>
                    <el-button type="primary" @click="handleRefresh">
                        <el-icon>
                            <Refresh />
                        </el-icon>
                        刷新
                    </el-button>
                </div>
            </template>

            <el-row :gutter="16">
                <el-col :xs="24" :md="12" :lg="8" v-for="judger in judgerList" :key="judger.id">
                    <el-card shadow="hover" class="judger-card">
                        <div class="judger-header">
                            <div>
                                <span class="judger-name">{{ judger.name }}</span>
                                <el-tag :type="getStatusType(judger.status)" size="small" style="margin-left: 8px;">
                                    {{ getStatusText(judger.status) }}
                                </el-tag>
                            </div>
                            <div class="judger-ip">{{ judger.ip }}</div>
                        </div>

                        <el-divider />

                        <div class="metric-item">
                            <div class="metric-label">
                                <span>CPU 使用率</span>
                                <span>{{ judger.cpuUsage }}%</span>
                            </div>
                            <el-progress :percentage="judger.cpuUsage" :color="getProgressColor(judger.cpuUsage)"
                                :show-text="false" />
                        </div>

                        <div class="metric-item">
                            <div class="metric-label">
                                <span>内存使用率</span>
                                <span>{{ judger.memoryUsage }}%</span>
                            </div>
                            <el-progress :percentage="judger.memoryUsage" :color="getProgressColor(judger.memoryUsage)"
                                :show-text="false" />
                        </div>

                        <div class="metric-item">
                            <div class="metric-label">
                                <span>磁盘使用率</span>
                                <span>{{ judger.diskUsage }}%</span>
                            </div>
                            <el-progress :percentage="judger.diskUsage" :color="getProgressColor(judger.diskUsage)"
                                :show-text="false" />
                        </div>

                        <el-divider />

                        <div class="judger-footer">
                            <span>任务: {{ judger.taskCount }}/{{ judger.maxTasks }}</span>
                            <span>运行时间: {{ judger.uptime }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<style scoped>
.page-container {
    padding: 0;
}

.stat-row {
    margin-bottom: 0;
}

.stat-card {
    text-align: center;
}

.stat-title {
    font-size: 14px;
    color: #909399;
    margin-bottom: 8px;
}

.stat-value {
    font-size: 28px;
    font-weight: 600;
    color: #303133;
}

.stat-success {
    color: #67c23a;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.judger-card {
    margin-bottom: 16px;
}

.judger-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.judger-name {
    font-size: 16px;
    font-weight: 600;
}

.judger-ip {
    font-size: 13px;
    color: #909399;
}

.metric-item {
    margin-bottom: 12px;
}

.metric-label {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #606266;
    margin-bottom: 4px;
}

.judger-footer {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #909399;
}
</style>