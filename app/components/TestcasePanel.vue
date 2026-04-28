<template>
    <div class="testcase-panel">
        <div class="testcase-toolbar">
            <span style="font-size: 13px; font-weight: 600; color: var(--el-text-color-primary);">
                测试用例 ({{ testcases.length }})
            </span>
            <el-button size="small" type="primary" text @click="$emit('addTestcase')">
                <el-icon class="el-icon--left">
                    <Plus />
                </el-icon>
                添加
            </el-button>
        </div>
        <div class="testcase-list">
            <div v-for="(tc, idx) in testcases" :key="idx" class="testcase-item"
                :class="{ 'testcase-selected': selectedTestcaseIndex === idx }" @click="$emit('selectTestcase', idx)">
                <div class="testcase-info">
                    <div class="testcase-name">测试用例 {{ idx + 1 }}</div>
                    <div class="testcase-preview">
                        <span class="preview-label">输入:</span>
                        <span class="preview-value">{{ tc.stdin || '(空)' }}</span>
                    </div>
                    <div class="testcase-preview" v-if="tc.expected_output">
                        <span class="preview-label">期望:</span>
                        <span class="preview-value">{{ tc.expected_output }}</span>
                    </div>
                </div>
                <el-button size="small" type="danger" text @click.stop="$emit('removeTestcase', idx)">
                    <el-icon>
                        <Delete />
                    </el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Plus, Delete } from '@element-plus/icons-vue'

defineProps<{
    testcases: Array<{ stdin: string; expected_output: string }>
    selectedTestcaseIndex: number | null
}>()

defineEmits(['addTestcase', 'selectTestcase', 'removeTestcase'])
</script>