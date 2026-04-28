<script setup>
const treeData = ref([
    {
        id: 1,
        label: '系统管理',
        children: [
            {
                id: 11,
                label: '用户管理',
                children: [
                    { id: 111, label: '查看用户' },
                    { id: 112, label: '创建用户' },
                    { id: 113, label: '编辑用户' },
                    { id: 114, label: '删除用户' },
                ]
            },
            {
                id: 12,
                label: '角色管理',
                children: [
                    { id: 121, label: '查看角色' },
                    { id: 122, label: '创建角色' },
                    { id: 123, label: '编辑角色' },
                    { id: 124, label: '删除角色' },
                ]
            },
            {
                id: 13,
                label: '权限管理',
                children: [
                    { id: 131, label: '查看权限' },
                    { id: 132, label: '分配权限' },
                ]
            }
        ]
    },
    {
        id: 2,
        label: '题目管理',
        children: [
            {
                id: 21,
                label: '题目操作',
                children: [
                    { id: 211, label: '查看题目' },
                    { id: 212, label: '创建题目' },
                    { id: 213, label: '编辑题目' },
                    { id: 214, label: '删除题目' },
                ]
            },
            {
                id: 22,
                label: '用例操作',
                children: [
                    { id: 221, label: '查看用例' },
                    { id: 222, label: '上传用例' },
                    { id: 223, label: '删除用例' },
                ]
            }
        ]
    },
    {
        id: 3,
        label: '判题机管理',
        children: [
            { id: 31, label: '查看负载' },
            { id: 32, label: '修改环境' },
        ]
    }
])

const treeRef = ref()
const defaultProps = {
    children: 'children',
    label: 'label'
}

const handleCheckChange = () => {
    // TODO: 权限变更处理
}

const handleSave = () => {
    const checkedKeys = treeRef.value?.getCheckedKeys(false)
    const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys()
    console.log('已选权限:', [...checkedKeys, ...halfCheckedKeys])
    // TODO: 调用保存权限接口
}

const handleCheckAll = () => {
    treeRef.value?.setCheckedNodes(treeData.value)
}

const handleUncheckAll = () => {
    treeRef.value?.setCheckedKeys([])
}
</script>

<template>
    <div class="page-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>权限管理</span>
                    <div>
                        <el-button @click="handleCheckAll">全选</el-button>
                        <el-button @click="handleUncheckAll">取消全选</el-button>
                        <el-button type="primary" @click="handleSave">保存</el-button>
                    </div>
                </div>
            </template>

            <el-tree ref="treeRef" :data="treeData" :props="defaultProps" show-checkbox node-key="id"
                :default-expand-all="true" @check-change="handleCheckChange" />
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
</style>