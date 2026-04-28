<script setup>
const searchForm = reactive({
    username: '',
    email: '',
    status: ''
})

const tableData = ref([
    { id: 1, username: 'admin', email: 'admin@example.com', role: '超级管理员', status: '正常', createdAt: '2025-01-01' },
    { id: 2, username: 'user01', email: 'user01@example.com', role: '普通用户', status: '正常', createdAt: '2025-02-15' },
    { id: 3, username: 'user02', email: 'user02@example.com', role: '普通用户', status: '禁用', createdAt: '2025-03-20' },
])

const handleSearch = () => {
    // TODO: 调用搜索接口
}

const handleReset = () => {
    searchForm.username = ''
    searchForm.email = ''
    searchForm.status = ''
}

const handleAdd = () => {
    // TODO: 打开新增用户对话框
}

const handleEdit = (row) => {
    // TODO: 打开编辑用户对话框
}

const handleDelete = (row) => {
    // TODO: 删除用户
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="用户名">
                    <el-input v-model="searchForm.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="searchForm.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                        <el-option label="正常" value="active" />
                        <el-option label="禁用" value="disabled" />
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
                    <span>用户列表</span>
                    <el-button type="primary" @click="handleAdd">新增用户</el-button>
                </div>
            </template>

            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="role" label="角色" />
                <el-table-column prop="status" label="状态">
                    <template #default="{ row }">
                        <el-tag :type="row.status === '正常' ? 'success' : 'danger'">{{ row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" />
                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
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