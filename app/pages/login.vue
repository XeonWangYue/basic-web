<script setup>
const { login } = useAuth()
const apiToken = ref("")
</script>

<template>
    <el-button @click="login(apiToken)">登录</el-button>
    <el-input v-model="apiToken" type="password"></el-input>
</template>