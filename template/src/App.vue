<template>
  <div class="container">
    <div class="row">
      <el-text>
        <h1>{{ text }}</h1>
      </el-text>
    </div>

    <div class="row">
      <el-text>
        {{ configStore.someVar }} {{ configStore.someNum }}
      </el-text>
    </div>

    <div class="row">
      <el-button size="small" @click="toggleDark()">主题切换</el-button>
    </div>

    <div class="row">
      <el-button class="item" size="small" @click="getEvn">环境变量</el-button>
      <el-text>版本：{{ version }}</el-text>
    </div>

    <div class="row">
      <el-button class="item" size="small" @click="changeState">修改状态</el-button>
      <el-text>状态值：{{ configStore.someVar }}</el-text>
    </div>

    <div class="row">
      <el-button class="item" size="small" @click="doRequest" :disabled="!inputValue">网络请求</el-button>
      <el-input class="item" size="small" v-model.trim="inputValue" clearable></el-input>
    </div>
    <div class="row">
      <el-input v-if="requestResult" class="item" type="textarea" v-model="requestResult"
                :autosize="{ minRows: 5, maxRows: 10 }"></el-input>
    </div>

    <div class="row">
      <el-button size="small" @click="goPage('Home')">HOME</el-button>
      <el-button size="small" @click="goPage('Tool')">TOOL</el-button>
      <el-button size="small" @click="goPage('Setting')">SETTING</el-button>
    </div>
    <div class="row">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ky from 'ky';
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {useDark, useToggle} from "@vueuse/core";
import {useRouter} from 'vue-router';
import {useConfigStore} from "./stores/configStore"

const router = useRouter();
const configStore = useConfigStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const text = ref("你好 3h template");
const inputValue = ref();
const requestResult = ref("");

const version = ref("");

const getEvn = () => {
  version.value = import.meta.env.VITE_APP_VERSION
}

const changeState = () => {
  configStore.someVar = `新值 ${Date.now().toLocaleString()}`;
}

const doRequest = async () => {
  if (!inputValue.value) {
    ElMessage.error("请输入地址");
    return;
  }
  try {
    const response = await ky.get(inputValue.value);
    requestResult.value = await response.text();
  } catch (e: any) {
    ElMessage.error(e.message);
  }
}

const goPage = (routeName: string) => {
  router.push({name: routeName});
}
</script>

<style scoped>
.container {
  width: 500px;
  margin: 100px auto 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  text-align: center;
}

</style>
