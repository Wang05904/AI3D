<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { OrbitControls } from '@tresjs/cientos';
import { ref } from 'vue';

// 使用 Vue Router
const router = useRouter();
const route = useRoute();

// 选中的对象
const selectedObject = ref(null);

// 跳转到视频生成页面
const goToVideoGen = () => {
  router.push('/video-gen'); // 使用路径跳转
};

// 改变选中对象的颜色
const changeObjectColor = (color: string) => {
  if (selectedObject.value) {
    selectedObject.value.material.color.set(color); // 设置选中对象的颜色
  } else {
    alert('请先选中一个对象');
  }
};

// 处理对象点击事件
const handleObjectClick = (object: any) => {
  selectedObject.value = object; // 设置当前选中的对象
};
</script>

<template>
  <el-button type="info" plain @click="goToVideoGen">
    生成预览视频
  </el-button>
  <div class="color-picker">
    <label for="color">选择颜色：</label>
    <input id="color" type="color" @input="(e) => changeObjectColor(e.target.value)" />
  </div>
  <TresCanvas window-size clear-color="#fff">
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <TresMesh
      :position="[-2, 2, 0]"
      :rotation="[0, Math.PI, 0]"
      @click="handleObjectClick($event.object)"
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 0, 0]"
      cast-shadow
      @click="handleObjectClick($event.object)"
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh
      :position="[2, -2, 0]"
      @click="handleObjectClick($event.object)"
    >
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
  position: fixed;
  top: 20px;
  left: 40px;
  z-index: 1000;
}

.color-picker {
  position: fixed;
  top: 70px;
  left: 40px;
  z-index: 1000;
}
</style>
