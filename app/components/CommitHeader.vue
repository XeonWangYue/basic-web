<template>
    <div class="commit-header header">
        <div class="header-left">
            <el-button class="back-button" :icon="ArrowLeft" text @click="router.back()">返回</el-button>
            <span class="problem-title">{{ problemData?.title || '代码提交' }}</span>
            <el-tag class="problem-badge" size="small">#{{ problemData?.id }}</el-tag>
            <span class="difficulty" v-if="problemData?.difficulty">难度: {{ problemData.difficulty }}</span>
        </div>
        <div class="header-right">
            <el-select v-model="localLanguage" class="language-select" size="default" @change="handleLanguageChange">
                <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="toolbar-btn save-btn" @click="$emit('save')">
                <el-icon class="el-icon--left">
                    <FolderOpened />
                </el-icon>
                保存
                <span v-if="lastSavedTime" class="last-saved-time">{{ lastSavedTime }}</span>
            </el-button>
            <el-button class="toolbar-btn run-btn" @click="$emit('togglePanel', 'run')">
                <el-icon class="el-icon--left">
                    <CaretRight />
                </el-icon>
                运行
            </el-button>
            <el-button type="primary" class="toolbar-btn submit-btn" @click="$emit('submit')" :loading="loading">
                <el-icon class="el-icon--left">
                    <Promotion />
                </el-icon>
                提交
            </el-button>
            <el-button class="toolbar-btn settings-btn" @click="$emit('settings')">
                <el-icon>
                    <Setting />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ArrowLeft,
    FolderOpened,
    CaretRight,
    Promotion,
    Setting,
} from '@element-plus/icons-vue'
import { languageOptions } from '~/constants/commit'

const router = useRouter()

const props = defineProps<{
    code: string
    language: string
    loading: boolean
    lastSavedTime: string | null
    problemData?: any
}>()

const emit = defineEmits(['languageChange', 'save', 'submit', 'togglePanel', 'settings'])

const localLanguage = ref(props.language)

watch(() => props.language, (val) => {
    localLanguage.value = val
})

const handleLanguageChange = (val: string) => {
    emit('languageChange', val)
}
</script>