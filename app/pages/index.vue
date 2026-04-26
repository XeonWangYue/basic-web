<script setup>
import { UserFilled } from '@element-plus/icons-vue';


</script>

<template>
    <div class="index-container">
        <el-row class="index-main-body">
            <el-col :md="8">
                <el-card>
                    <el-row justify="space-between">
                        <el-col :span="20">
                            <div class="card-title">
                                在线人数
                            </div>
                            <div class="card-number">
                                244
                            </div>
                            <div>较昨日 {{ '+24.4%' }}</div>
                        </el-col>
                        <el-col :span="4" class="icon-col">
                            <el-icon class="index-user-icon">
                                <UserFilled />
                            </el-icon>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :md="8">
                <el-card>
                    <el-row justify="space-between">
                        <el-col :span="20">
                            <div class="card-title">
                                今日累计访问
                            </div>
                            <div class="card-number">
                                244
                            </div>
                            <div>较昨日 {{ '+24.4%' }}</div>
                        </el-col>
                        <el-col :span="4" class="icon-col">
                            <el-icon class="index-view-icon">
                                <View />
                            </el-icon>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :md="8">
                <el-card>
                    <el-row justify="space-between">
                        <el-col :span="20">
                            <div class="card-title">
                                题目提交数
                            </div>
                            <div class="card-number">
                                244
                            </div>
                            <div>较昨日 {{ '+24.4%' }}</div>
                        </el-col>
                        <el-col :span="4" class="icon-col">
                            <el-icon class="index-code-icon">
                                <Codicon name="code" size="32" color="rgb(0, 187, 147)"></Codicon>
                            </el-icon>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :lg="16">
                <el-card>
                    <div class="card-title">
                        近7日访问人数
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.index-main-body {
    max-width: 1600px;
    margin: auto;
}

.index-container {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;

    background: rgb(249, 250, 251);
}

.index-container :deep(.el-card) {
    margin: 4px;
}

.card-title {
    font-size: 18px;
    color: rgb(107, 114, 128);
}

.card-number {
    font-size: 44px;
    font-weight: 400;
    color: black
}

.icon-col {
    display: flex;
    justify-content: end;
}

.index-user-icon {
    background-color: rgb(231, 238, 255);
    font-size: 32px;
    color: rgb(22, 93, 255);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 16px;
}

.index-view-icon {
    background-color: rgb(255, 242, 229);
    font-size: 32px;
    color: rgb(255, 125, 0);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 16px;
}

.index-code-icon {
    background-color: rgb(229, 247, 233);
    border-radius: 50%;
    font-size: 32px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 16px;
}
</style>