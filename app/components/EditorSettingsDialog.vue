<template>
    <el-dialog v-model="visible" title="编辑器设置" width="480px" @close="$emit('close')">
        <el-form label-width="120px">
            <el-form-item label="字体大小">
                <el-slider v-model="localFontSize" :min="12" :max="24" :step="1" show-input />
            </el-form-item>
            <el-form-item label="Tab 大小">
                <el-select v-model="localTabSize" style="width: 100%">
                    <el-option :value="2" label="2 spaces" />
                    <el-option :value="4" label="4 spaces" />
                    <el-option :value="8" label="8 spaces" />
                </el-select>
            </el-form-item>
            <el-form-item label="主题">
                <el-select v-model="localTheme" style="width: 100%">
                    <el-option value="vs" label="Light" />
                    <el-option value="vs-dark" label="Dark" />
                    <el-option value="hc-black" label="High Contrast" />
                </el-select>
            </el-form-item>
            <el-form-item label="自动换行">
                <el-switch v-model="localWordWrap" />
            </el-form-item>
            <el-form-item label="小地图">
                <el-switch v-model="localMinimap" />
            </el-form-item>
            <el-form-item label="括号匹配">
                <el-switch v-model="localBracketMatching" />
            </el-form-item>
            <el-form-item label="行号">
                <el-select v-model="localLineNumbers" style="width: 100%">
                    <el-option value="on" label="显示" />
                    <el-option value="off" label="隐藏" />
                    <el-option value="relative" label="相对行号" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="$emit('close')">取消</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { EditorSettings } from '~/constants/commit'

const props = defineProps<{
    modelValue: boolean
    settings: EditorSettings
}>()

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})

// Local copies for editing
const localFontSize = ref(props.settings.fontSize)
const localTabSize = ref(props.settings.tabSize)
const localTheme = ref(props.settings.theme)
const localWordWrap = ref(props.settings.wordWrap === 'on')
const localMinimap = ref(props.settings.minimap)
const localBracketMatching = ref(props.settings.bracketMatching)
const localLineNumbers = ref(props.settings.lineNumbers)

watch(() => props.settings, (newSettings) => {
    localFontSize.value = newSettings.fontSize
    localTabSize.value = newSettings.tabSize
    localTheme.value = newSettings.theme
    localWordWrap.value = newSettings.wordWrap === 'on'
    localMinimap.value = newSettings.minimap
    localBracketMatching.value = newSettings.bracketMatching
    localLineNumbers.value = newSettings.lineNumbers
}, { deep: true })

const handleSave = () => {
    emit('save', {
        fontSize: localFontSize.value,
        tabSize: localTabSize.value,
        theme: localTheme.value,
        wordWrap: localWordWrap.value ? 'on' : 'off',
        minimap: localMinimap.value,
        bracketMatching: localBracketMatching.value,
        lineNumbers: localLineNumbers.value,
        fontFamily: props.settings.fontFamily,
        lineHeight: props.settings.lineHeight,
    } as EditorSettings)
    emit('close')
}
</script>