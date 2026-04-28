<script setup>
const searchForm = reactive({
    roleName: ''
})

const tableData = ref([
    { id: 1, name: '超级管理员', code: 'super_admin', description: '拥有系统所有权限', userCount: 2, createdAt: '2025-01-01' },
    { id: 2, name: '管理员', code: 'admin', description: '管理用户和题目', userCount: 5, createdAt: '2025-01-01' },
    { id: 3, name: '教师', code: 'teacher', description: '管理题目和查看判题', userCount: 20, createdAt: '2025-01-15' },
    { id: 4, name: '学生', code: 'student', description: '提交代码和查看排名', userCount: 200, createdAt: '2025-01-15' },
])

const handleSearch = () => {
    // TODO: 调用搜索接口
}

const handleReset = () => {
    searchForm.roleName = ''
}

const handleAdd = () => {
    // TODO: 打开新增角色对话框
}

const handleEdit = (row) => {
    // TODO: 打开编辑角色对话框
}

const handlePermission = (row) => {
    // TODO: 配置角色权限
}

const handleDelete = (row) => {
    // TODO: 删除角色
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="角色名称">
                    <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" />
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
                    <span>角色列表</span>
                    <el-button type="primary" @click="handleAdd">新增角色</el-button>
                </div>
            </template>

            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="name" label="角色名称" />
                <el-table-column prop="code" label="角色编码" />
                <el-table-column prop="description" label="描述" />
                <el-table-column prop="userCount" label="用户数" width="100" />
                <el-table-column prop="createdAt" label="创建时间" width="180" />
                <el-table-column label="操作" width="280">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="handlePermission(row)">权限配置</el-button>
                        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
                        <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="50"
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