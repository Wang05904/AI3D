<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { OrbitControls } from '@tresjs/cientos';
import { ref } from 'vue';

// 使用 Vue Router
const router = useRouter();
const route = useRoute();

// 返回函数
const goback = () => {
  router.push('/model-gen'); // 返回上一个路径
};

</script>

<template>
  <el-button type="info" plain @click="goback">
   返回
  </el-button>
  <TresCanvas window-size clear-color="#fff">
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <TresMesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[0, 0, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh :position="[2, -2, 0]">
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
  </TresCanvas>
  </template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}

.el-button {
  position: fixed; /* 固定定位 */
  top: 20px; /* 距离顶部 10px */
  left:40px; /* 距离左侧 10px */
  z-index: 1000; /* 确保按钮在最上层 */
}
</style>
