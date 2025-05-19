<template>
    <div>
        <header class="navbar">
            <div class="navbar-container">
                <div class="logo">AI3D</div>
                <nav class="nav-links">
                    <a href="#home">首页</a>
                    <a href="#features">功能</a>
                    <a href="#about">关于我们</a>
                    <a href="#contact">联系我们</a>
                </nav>
            </div>
        </header>
        <full-page :options="options" ref="fullpage">
            <div class="section video-section">
                <video autoplay muted loop class="background-video">
                    <source src="/background/bg1.mp4" type="video/mp4" />
                    您的浏览器不支持视频播放。
                </video>
                <div class="content-overlay">
                    <button @click="goToFeatures" class="action-button">立即体验</button>
                </div>
            </div>
            <div class="section video-section">
                <video autoplay muted loop class="background-video">
                    <source src="/background/bg2.mp4" type="video/mp4" />
                    您的浏览器不支持视频播放。
                </video>
                <div class="content-overlay">
                    <button @click="goToFeatures" class="action-button">立即体验</button>
                </div>
            </div>
            <div class="section video-section">
                <video autoplay muted loop class="background-video">
                    <source src="/background/bg3.mp4" type="video/mp4" />
                    您的浏览器不支持视频播放。
                </video>
                <div class="content-overlay">
                    <button @click="goToFeatures" class="action-button">立即体验</button>
                </div>
            </div>
        </full-page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
                    navigation: true,
                }
            }
        },
        methods: {
            goToFeatures() {
                // 跳转到功能页面
                this.$router.push('/workspace');
            }
        }
    }
</script>

<style>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0); /* 背景透明 */
    color: #0a9544; /* 高级绿色字体 */
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    transition: background-color 0.3s, backdrop-filter 0.3s;
}

.navbar:hover {
    background-color: rgba(255, 255, 255, 0.3); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 磨砂效果 */
}

.navbar-container {
    display: flex;
    justify-content: center; /* 左右对齐 */
    align-items: center; /* 垂直居中 */
    width: 100%;
}

.logo {
    position: absolute;
    left: 140px;
    font-size: 24px;
    font-weight: bold;
    color: #3c6c50; /* 高级绿色字体 */
    margin-right: 20px; /* 添加右边距 */
}

.nav-links {
    display: flex;
    justify-content: flex-end; /* 靠右对齐 */
    align-items: center; /* 垂直居中 */
    margin-right: 20px; /* 添加右边距 */
}

.nav-links a {
    color: #ffffff; /* 高级绿色字体 */
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #466a55; /* 更深的绿色 */
}

.action-button {
    padding: 15px 30px;
    font-size: 18px;
    border: none;
    border-radius: 25px;
    background-color: #ffffff;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #e0e0e0; /* 鼠标悬浮时的背景颜色 */
}

.background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 确保视频覆盖整个背景 */
    z-index: 1; /* 将视频置于内容后面 */
}

.video-section {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.content-overlay {
    position: relative;
    z-index: 1; /* 确保内容显示在视频上方 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100%;
}

.section {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 确保每个 section 占满视口高度 */
}
</style>