<script setup>
const apiToken = ref('')

const handleLogin = () => {
    $fetch("/api/auth/login", {
        method: "POST",
        params: {
            "initToken": apiToken.value
        }
    }).then((res) => {
        console.log(res)
    })
}

</script>

<template>
    <el-button @click="handleLogin">登录</el-button>
    <el-input v-model="apiToken" type="password"></el-input>
</template>