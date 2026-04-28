<template>
    <div class="detail-panel">
        <h3>
            <el-icon>
                <Document />
            </el-icon>
            {{ problemData?.title || 'A + B Problem' }}
        </h3>

        <!-- 题目描述 -->
        <el-collapse v-model="activeSections" class="section-card">
            <el-collapse-item name="description">
                <template #title>
                    <div class="section-header">
                        <el-icon>
                            <Document />
                        </el-icon>
                        题目描述
                    </div>
                </template>
                <div class="section-content">
                    <div class="description-content">{{ problemData?.description || '这是 A + B Problem 的题目描述。' }}</div>
                </div>
            </el-collapse-item>
        </el-collapse>

        <!-- 输入格式 -->
        <el-collapse v-model="activeSections" class="section-card">
            <el-collapse-item name="inputFormat">
                <template #title>
                    <div class="section-header">
                        <el-icon>
                            <Download />
                        </el-icon>
                        输入格式
                    </div>
                </template>
                <div class="section-content">
                    <div class="description-content">{{ problemData?.inputFormat || '输入格式说明' }}</div>
                </div>
            </el-collapse-item>
        </el-collapse>

        <!-- 输出格式 -->
        <el-collapse v-model="activeSections" class="section-card">
            <el-collapse-item name="outputFormat">
                <template #title>
                    <div class="section-header">
                        <el-icon>
                            <Upload />
                        </el-icon>
                        输出格式
                    </div>
                </template>
                <div class="section-content">
                    <div class="description-content">{{ problemData?.outputFormat || '输出格式说明' }}</div>
                </div>
            </el-collapse-item>
        </el-collapse>

        <!-- 样例输入输出 -->
        <div class="section-card" v-for="(sample, index) in (problemData?.samples || defaultSamples)" :key="index">
            <div class="section-header">
                <el-icon>
                    <CopyDocument />
                </el-icon>
                样例 {{ Number(index) + 1 }}
            </div>
            <div class="section-content">
                <div class="io-block">
                    <div class="io-label">输入</div>
                    <div class="io-content">{{ sample.input }}</div>
                </div>
                <div class="io-block">
                    <div class="io-label">输出</div>
                    <div class="io-content">{{ sample.output }}</div>
                </div>
            </div>
        </div>

        <!-- 提示 -->
        <div class="section-card" v-if="problemData?.hint">
            <div class="section-header">
                <el-icon>
                    <Warning />
                </el-icon>
                提示
            </div>
            <div class="section-content">
                <div class="hint-content">{{ problemData.hint }}</div>
            </div>
        </div>

        <!-- 元数据 -->
        <div class="section-card">
            <div class="section-header">
                <el-icon>
                    <InfoFilled />
                </el-icon>
                题目信息
            </div>
            <div class="section-content">
                <div class="meta-grid">
                    <div class="meta-card">
                        <span class="meta-label">时间限制</span>
                        <span class="meta-value">{{ problemData?.timeLimit || 1 }} 秒</span>
                    </div>
                    <div class="meta-card">
                        <span class="meta-label">内存限制</span>
                        <span class="meta-value">{{ problemData?.memoryLimit || 256 }} MB</span>
                    </div>
                    <div class="meta-card">
                        <span class="meta-label">题目来源</span>
                        <span class="meta-value">{{ problemData?.source || '算法竞赛' }}</span>
                    </div>
                    <div class="meta-card">
                        <span class="meta-label">难度等级</span>
                        <span class="meta-value">{{ problemData?.difficulty || '简单' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 标签 -->
        <div class="section-card" v-if="problemData?.tags?.length">
            <div class="section-header">
                <el-icon>
                    <PriceTag />
                </el-icon>
                标签
            </div>
            <div class="section-content">
                <div class="tag-list">
                    <el-tag v-for="tag in problemData.tags" :key="tag" class="tag-item" type="info">{{ tag }}</el-tag>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Document,
    Download,
    Upload,
    CopyDocument,
    Warning,
    InfoFilled,
    PriceTag,
} from '@element-plus/icons-vue'

const props = defineProps<{
    problemData: any
}>()

const activeSections = ref(['description', 'inputFormat', 'outputFormat'])

const defaultSamples = [
    { input: '1 2', output: '3' },
]
</script>