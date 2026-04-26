<script setup lang="ts">
// 支持的图标名称可在这里查看：https://microsoft.github.io/vscode-codicons/dist/codicon.html

const props = withDefaults(
    defineProps<{
        name: string // 图标名，例如 search / edit / delete
        color?: string // 颜色
        size?: number // 大小，默认 16px
    }>(),
    {
        color: '#333',
        size: 16
    }
)

</script>
<template>
    <span class="codicon" :class="[`codicon-${name}`]" :style="{ color, fontSize: size + 'px' }" />
</template>
