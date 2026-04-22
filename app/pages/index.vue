<script setup>
const code = ref(`console.log('Hello Monaco + Nuxt!')`)

const editorRef = useTemplateRef("editorRef")

const commitCode = () => {
    let formData = new FormData()
    formData.append("language", "javascript");
    formData.append("code", new File([code.value], "code.js", {
        type: "text/plain", // 文件类型
    }));

    $fetch(`/api/commit/${1}`, {
        method: "POST",
        body: formData
    }).then((response) => {
        console.log(response)
    })
}
</script>
<template>

    <el-button type="primary" @click="commitCode">提交</el-button>
    <div style="height:800px">
        <ClientOnly>
            <MonacoEditor v-model="code" lang="javascript" theme="vs-dark"
                :options="{ automaticLayout: true, minimap: { enabled: false } }" :style="{ height: '100%' }" />
        </ClientOnly>
    </div>
</template>