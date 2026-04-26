<script setup>
const commitSettings = useCommitSettingsStore()

const code = ref(`print("hello world!")`)
const lang = ref("python")

const options = reactive({
    automaticLayout: true,
    minimap: { enabled: false },
    theme: 'vs-dark',
    fontSize: commitSettings.monacoSettings.fontSize || 22
})

const userSettings = reactive({
    fontSize: 16
})


const editorRef = useTemplateRef("editorRef")

const commitCode = async () => {
    let formData = new FormData()
    formData.append("language", "python");
    formData.append("code", new File([code.value], "code.js", {
        type: "text/plain", // 文件类型
    }));

    const { data } = await $fetch(`/api/commit/${1}`, {
        method: "POST",
        body: formData
    })

    console.log(data)
}


onMounted(() => {
    window.addEventListener('resize', () => {
        requestAnimationFrame(() => {
            editorRef.value?.$editor.layout()
        })
    })

    watch(userSettings, useDebounceFn((newValue) => {
        editorRef.value?.$editor.updateOptions(newValue)
    }, 1000), { deep: true, immediate: true })
})
</script>

<template>
    <div class="commit-container">
        <div class="commit-header">
            <el-form :inline="true" class="commit-option-form">
                <el-form-item label="字体大小">
                    <el-input v-model="userSettings.fontSize">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="commitCode">提交</el-button>
                </el-form-item>
            </el-form>

        </div>
        <el-splitter layout="vertical" class="commit-spliter">
            <el-splitter-panel>
                <ClientOnly>
                    <MonacoEditor v-model="code" :options="options" :lang="lang" ref="editorRef"
                        style="height: calc(100% - 10px);">
                    </MonacoEditor>
                </ClientOnly>
            </el-splitter-panel>
            <el-splitter-panel>
                <div>
                    {{ userSettings }}
                </div>
            </el-splitter-panel>

        </el-splitter>
    </div>
</template>

<style scoped>
.commit-container {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
}

.commit-header {
    display: flex;
    height: 40px;
    align-items: center;
}

.commit-spliter {
    height: calc(100% - 40px);
}

.commit-option-form {
    display: flex;
    align-items: center;
}

.commit-option-form :deep(.el-form-item) {
    display: flex;
    align-items: center;
    margin-bottom: 0;
}
</style>