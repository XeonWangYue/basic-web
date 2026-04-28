<script setup>
const searchForm = reactive({
    keyword: '',
    difficulty: '',
    status: ''
})

const tableData = ref([
    { id: 1001, title: 'A + B Problem', difficulty: '简单', timeLimit: 1000, memoryLimit: 256, submitCount: 500, acceptRate: '78.5%', status: '已发布' },
    { id: 1002, title: '快速排序', difficulty: '中等', timeLimit: 2000, memoryLimit: 512, submitCount: 320, acceptRate: '45.2%', status: '已发布' },
    { id: 1003, title: '最长公共子序列', difficulty: '困难', timeLimit: 3000, memoryLimit: 512, submitCount: 150, acceptRate: '22.1%', status: '草稿' },
])

const handleSearch = () => {
    // TODO: 调用搜索接口
}

const handleReset = () => {
    searchForm.keyword = ''
    searchForm.difficulty = ''
    searchForm.status = ''
}

const handleAdd = () => {
    // TODO: 打开新增题目对话框
}

const handleEdit = (row) => {
    // TODO: 打开编辑题目对话框
}

const handleDelete = (row) => {
    // TODO: 删除题目
}

const handlePreview = (row) => {
    // TODO: 预览题目
}

const getDifficultyType = (difficulty) => {
    const map = { '简单': 'success', '中等': 'warning', '困难': 'danger' }
    return map[difficulty] || 'info'
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="关键词">
                    <el-input v-model="searchForm.keyword" placeholder="题目名称/ID" />
                </el-form-item>
                <el-form-item label="难度">
                    <el-select v-model="searchForm.difficulty" placeholder="请选择难度" clearable>
                        <el-option label="简单" value="简单" />
                        <el-option label="中等" value="中等" />
                        <el-option label="困难" value="困难" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                        <el-option label="已发布" value="published" />
                        <el-option label="草稿" value="draft" />
                    </el-select>
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
                    <span>题目列表</span>
                    <el-button type="primary" @click="handleAdd">新增题目</el-button>
                </div>
            </template>

            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="id" label="题号" width="100" />
                <el-table-column prop="title" label="题目名称" />
                <el-table-column prop="difficulty" label="难度" width="100">
                    <template #default="{ row }">
                        <el-tag :type="getDifficultyType(row.difficulty)">{{ row.difficulty }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="timeLimit" label="时间限制(ms)" width="130" />
                <el-table-column prop="memoryLimit" label="内存限制(MB)" width="130" />
                <el-table-column prop="submitCount" label="提交数" width="100" />
                <el-table-column prop="acceptRate" label="通过率" width="100" />
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.status === '已发布' ? 'success' : 'info'">{{ row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="handlePreview(row)">预览</el-button>
                        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
                        <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="200"
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