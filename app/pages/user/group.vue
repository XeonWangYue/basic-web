<script setup>
const searchForm = reactive({
    groupName: ''
})

const tableData = ref([
    { id: 1, name: '管理员组', description: '拥有系统全部权限', memberCount: 5, createdAt: '2025-01-01' },
    { id: 2, name: '教师组', 'description': '可管理题目和查看判题结果', memberCount: 20, createdAt: '2025-02-01' },
    { id: 3, name: '学生组', description: '可提交代码和查看排名', memberCount: 200, createdAt: '2025-02-01' },
])

const handleSearch = () => {
    // TODO: 调用搜索接口
}

const handleReset = () => {
    searchForm.groupName = ''
}

const handleAdd = () => {
    // TODO: 打开新增用户组对话框
}

const handleEdit = (row) => {
    // TODO: 打开编辑用户组对话框
}

const handleDelete = (row) => {
    // TODO: 删除用户组
}

const handleMembers = (row) => {
    // TODO: 管理组成员
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="组名称">
                    <el-input v-model="searchForm.groupName" placeholder="请输入用户组名称" />
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
                    <span>用户组列表</span>
                    <el-button type="primary" @click="handleAdd">新增用户组</el-button>
                </div>
            </template>

            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="name" label="组名称" />
                <el-table-column prop="description" label="描述" />
                <el-table-column prop="memberCount" label="成员数" width="120" />
                <el-table-column prop="createdAt" label="创建时间" width="180" />
                <el-table-column label="操作" width="280">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="handleMembers(row)">成员管理</el-button>
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