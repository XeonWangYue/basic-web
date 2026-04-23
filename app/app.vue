<script setup>


</script>
<template>
  <NuxtRouteAnnouncer />
  <el-container class="main-container">
    <el-aside width="200px">
      <el-menu @open="handleOpen" class="main-menu" :router="true">
        <el-menu-item index="/">
          首页
        </el-menu-item>
        <el-menu-item index="/commit">
          提交测试
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header :height="60">Header</el-header>
      <el-main>
        <NuxtPage />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.main-container {
  height: 100vh;
  width: 100vw;
}

.main-menu {
  height: 100%;
}
</style>