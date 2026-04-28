<script setup>
const { accessToken, logout } = useAuth()
import { HomeFilled, EditPen, User, Document, Monitor } from '@element-plus/icons-vue'
</script>
<template>
  <NuxtRouteAnnouncer />
  <el-container class="main-container">
    <el-aside width="200px">
      <el-menu class="main-menu" :router="true">
        <el-menu-item index="/">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/commit">
          <el-icon>
            <EditPen />
          </el-icon>
          <span>提交测试</span>
        </el-menu-item>
        <el-sub-menu index="user">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user/account">用户账号管理</el-menu-item>
          <el-menu-item index="/user/group">用户组管理</el-menu-item>
          <el-menu-item index="/user/role">角色管理</el-menu-item>
          <el-menu-item index="/user/permission">权限管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="problem">
          <template #title>
            <el-icon>
              <Document />
            </el-icon>
            <span>题目管理</span>
          </template>
          <el-menu-item index="/problem/list">题目管理</el-menu-item>
          <el-menu-item index="/problem/testcase">用例管理</el-menu-item>
          <el-menu-item index="/problem/judge-settings">判题设置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="judger">
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>判题机管理</span>
          </template>
          <el-menu-item index="/judger/load">负载监控</el-menu-item>
          <el-menu-item index="/judger/environment">环境修改</el-menu-item>
        </el-sub-menu>
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