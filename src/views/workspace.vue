<template>
    <div class="workspace">
        <!-- <video autoplay muted loop class="background-video">
            <source src="/public/background/background.mp4" type="video/mp4" />
            您的浏览器不支持视频播放。
        </video> -->
        <div class="background"></div>
        <header class="navbar">
            <div class="navbar-container">
                <div class="logo" @click="navigate('/')">AI3D 功能区</div>
                <nav class="nav-links">
                    <button @click="navigate('ai-qa')">AI问答</button>
                    <button @click="navigate('text-to-image')">文生图</button>
                    <button @click="navigate('image-edit')">图片修改</button>
                    <button @click="navigate('model-gen')">模型生成</button>
                    <button @click="navigate('model-edit')">模型修改</button>
                    <button @click="navigate('preview')">预览</button>
                    <button @click="navigate('video-gen')">视频生成</button>
                </nav>
            </div>
        </header>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        navigate(route) {
            this.$router.push(`/${route}`);
        }
    }
};
</script>

<style>
/* 重置全局样式 */
html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    /* background-image: linear-gradient(to bottom, #e0f7fa, #e4fcf2); 浅蓝到浅粉渐变 */
    /* background-color: aliceblue; */
}

.navbar {
    height: 50px;
    position: fixed;
    top: 0;
    left: 0; /* 确保导航栏从左侧开始 */
    width: 100%;
    color: rgb(255, 255, 255);
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    background-color: rgba(0, 0, 0, 0); /* 初始背景透明 */
    /* transition: background-color 0.3s, backdrop-filter 0.3s; */
}

.navbar:hover {
    background-color: rgba(219, 219, 219, 0.3); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 磨砂效果 */
}

.navbar-container {
    width: 90%;
    max-width: 1200px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.logo {
    font-size: 20px;
    font-weight: bold;
    color: rgb(0, 0, 0);
}
.logo:hover {
    color: #2e5242;
}

.nav-links {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.nav-links button {
    border: none;
    background: none; /* 去掉背景 */
    color: rgb(0, 0, 0); /* 按钮文字颜色 */
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
}

.content {
    margin: 80px auto; /* 垂直居中 */
    padding: 20px;
    z-index: 1;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: fit-content; /* 宽度自适应子内容 */
    height: 100vh; /* 高度自适应子内容 */
    min-width: 300px; /* 最小宽度 */
    min-height: 200px; /* 最小高度 */
    background-color: rgba(255, 255, 255, 0.3); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 磨砂效果 */
    border-radius: 15px; /* 圆角 */
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 添加阴影 */
}
</style>
