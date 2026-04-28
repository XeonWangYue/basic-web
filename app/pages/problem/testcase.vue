<script setup>
const searchForm = reactive({
    problemId: '',
    keyword: ''
})

const tableData = ref([
    { id: 1, problemId: 1001, problemTitle: 'A + B Problem', inputPreview: '1 2', outputPreview: '3', score: 10, createdAt: '2025-01-10' },
    { id: 2, problemId: 1001, problemTitle: 'A + B Problem', inputPreview: '10 20', outputPreview: '30', score: 10, createdAt: '2025-01-10' },
    { id: 3, problemId: 1002, problemTitle: '快速排序', inputPreview: '5\n3 1 4 1 5', outputPreview: '1 1 3 4 5', score: 20, createdAt: '2025-02-01' },
    { id: 4, problemId: 1002, problemTitle: '快速排序', inputPreview: '3\n3 2 1', outputPreview: '1 2 3', score: 20, createdAt: '2025-02-01' },
])

const handleSearch = () => {
    // TODO: 调用搜索接口
}

const handleReset = () => {
    searchForm.problemId = ''
    searchForm.keyword = ''
}

const handleUpload = () => {
    // TODO: 上传用例文件
}

const handleBatchUpload = () => {
    // TODO: 批量上传用例
}

const handleEdit = (row) => {
    // TODO: 编辑用例
}

const handleDelete = (row) => {
    // TODO: 删除用例
}

const handleDownload = (row) => {
    // TODO: 下载用例文件
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="题目ID">
                    <el-input v-model="searchForm.problemId" placeholder="请输入题目ID" />
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="searchForm.keyword" placeholder="题目名称" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 16px;">
            <template #header>
                <div class="card-header">
                    <span>用例列表</span>
                    <div>
                        <el-button @click="handleBatchUpload">批量上传</el-button>
                        <el-button type="primary" @click="handleUpload">上传用例</el-button>
                    </div>
                </div>
            </template>

            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="problemId" label="题目ID" width="100" />
                <el-table-column prop="problemTitle" label="题目名称" />
                <el-table-column prop="inputPreview" label="输入预览">
                    <template #default="{ row }">
                        <el-text truncated>{{ row.inputPreview }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="outputPreview" label="输出预览">
                    <template #default="{ row }">
                        <el-text truncated>{{ row.outputPreview }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="分值" width="80" />
                <el-table-column prop="createdAt" label="创建时间" width="180" />
                <el-table-column label="操作" width="250">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="handleDownload(row)">下载</el-button>
                        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
                        <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="100"
                    :page-sizes="[10, 20, 50, 100]" />
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.page-container {
    padding: 0;
}

.search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
}
</style>