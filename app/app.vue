<script setup>
const { accessToken, logout } = useAuth()

</script>
<template>
  <NuxtRouteAnnouncer />
  <el-container class="main-container">
    <el-aside width="200px">
      <el-menu class="main-menu" :router="true">
        <el-menu-item index="/">
          首页
        </el-menu-item>
        <el-menu-item index="/commit">
          提交测试
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row-container">
          <div class="header-title">Online Judge后台管理系统</div>
          <div class="header-user">
            <ClientOnly>
              <el-button type="primary" @click="logout" v-show="accessToken">登出</el-button>
            </ClientOnly>
          </div>
        </el-row>
      </el-header>
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

.header-row {
  height: 56px;
  border-bottom: 1px solid #dcdfe6;
}

.header-row-container {
  height: 100%;
  align-items: center;
}

.header-title {
  font-family: 'DingTalk Sans';
  font-size: 26px;
  font-weight: 600;
}

@media (max-width: 767px) {
  .header-title {
    display: none;
  }
}

.header-user {
  margin-left: auto;
}
</style>