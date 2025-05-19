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
                    <button v-for="link in links" :key="link.route" :class="{ active: $route.path === `/${link.route}`  }" @click="navigate(link.route)">{{ link.label }}</button>
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
    data() {
        return {
            links: [
                { label: 'AI问答', route: 'ai-qa' },
                { label: '文生图', route: 'text-to-image' },
                { label: '图片修改', route: 'image-edit' },
                { label: '模型生成', route: 'model-gen' },
                { label: '模型修改', route: 'model-edit' },
                { label: '预览', route: 'preview' },
                { label: '视频生成', route: 'video-gen' },
            ],
        };
    },
    methods: {
        navigate(route) {
            this.$router.push(`/${route}`);
        },
    },
    mounted() {
        // 设置默认的 active 类
        if (this.$route.path === '/workspace' || this.$route.path === '/ai-qa') {
            this.$router.push('/ai-qa'); // 默认跳转到 AI问答
        }
    },
};
</script>

<style scoped>
/* 重置全局样式 */
html, body {
    margin: 0;
    padding: 0;
    height: 100%; /* 确保占满视口高度 */
    box-sizing: border-box;
}
.workspace{
    height: 100%;
    overflow: hidden;
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
    position: absolute;
    left: 10%;
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
    color: rgb(0, 0, 0); /* 默认文字颜色 */
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
    transition: color 0.3s ease; /* 添加颜色过渡效果 */
}

.nav-links button.active {
    color: green; /* 当前页面的文字变成绿色 */
    font-weight: bold; /* 可选：加粗当前页面的文字 */
}

.content {
    margin: 80px auto; /* 垂直居中 */
    margin-bottom: 0;
    padding: 0;
    z-index: 1;
    display: flex;
    /* justify-content: center; 水平居中 */
    /* align-items: center; 垂直居中 */
    width: fit-content; /* 宽度自适应子内容 */
    height: fit-content;
    min-height: calc(100vh - 160px);
    min-width: 300px; /* 最小宽度 */
    background-color: rgba(255, 255, 255, 0.3); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 磨砂效果 */
    border-radius: 15px; /* 圆角 */
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 添加阴影 */
}
</style>
