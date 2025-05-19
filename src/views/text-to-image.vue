<template>
    <div class="text-to-image-container">
        <h1 class="title" v-if="!hasSentMessage">图像生成</h1>
        <span class="sub-title">自定风格，搜集灵感，复制同款</span>
        <div class="chat-input-container">
            <textarea class="chat-input" v-model="newMessage" placeholder="描述你所想象的画面，角色，情绪，场景，风格..." rows="4"
                @keyup.enter="sendMessage" autofocus></textarea>
            <div class="chat-actions">
                <div class="icon-buttons">
                    <button class="icon-button">📎</button>
                    <button class="icon-button">🎨</button>
                    <button class="icon-button">🎤</button>
                    <button class="icon-button" @click="sendMessage" v-if="!isLoading"><img src="../../public/icon/发送.png"
                            alt=""></button>
                    <button class="icon-button" @click="sendMessage" v-else><img src="../../public/icon/loading.gif"
                            alt=""></button>
                </div>
            </div>
        </div>
        <div class="function-container">
            <button
                class="function-button"
                :class="{ selected: selectedStyle === 'cartoon' }"
                @click="selectStyle('cartoon')"
            >
                卡通风
                <img src="../../public/icon/卡通.png" alt="卡通风" class="button-icon" />
            </button>
            <button
                class="function-button"
                :class="{ selected: selectedStyle === 'cyber' }"
                @click="selectStyle('cyber')"
            >
                赛博风
                <img src="../../public/icon/赛博.png" alt="赛博风" class="button-icon" />
            </button>
            <button
                class="function-button"
                :class="{ selected: selectedStyle === 'oil' }"
                @click="selectStyle('oil')"
            >
                油画风
                <img src="../../public/icon/油画.png" alt="油画风" class="button-icon" />
            </button>
            <button
                class="function-button"
                :class="{ selected: selectedStyle === 'anime' }"
                @click="selectStyle('anime')"
            >
                动漫风
                <img src="../../public/icon/动漫.png" alt="动漫风" class="button-icon" />
            </button>
            <button
                class="function-button"
                :class="{ selected: selectedStyle === 'ink' }"
                @click="selectStyle('ink')"
            >
                水墨风
                <img src="../../public/icon/水墨.png" alt="水墨风" class="button-icon" />
            </button>
        </div>
        <div class="preview">
            <span class="preview-text" v-if="!generatedImage">预览区域</span>
            <img v-else :src="generatedImage" alt="生成的图片" class="generated-image" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage: '',
            messages: [],
            isLoading: false,
            generatedImage: null, // 存储生成的图片 URL
            selectedStyle: '', // 存储选中的风格
        };
    },
    computed: {
        
    },
    methods: {
        async sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({
                    style:this.selectStyle,
                    text: this.newMessage
                });
                const prompt = this.newMessage;
                const style = this.selectedStyle;
                this.newMessage = '';
                this.isLoading = true;

                // 模拟调用后端接口
                try {
                    // 真实后端接口
                    // const result = await this.$ttiApi.generateImage(prompt, style);
                    const response = await this.mockGenerateImage(prompt,style);
                    this.generatedImage = response.imageUrl; // 设置生成的图片 URL
                } catch (error) {
                    console.error('生成图片失败:', error);
                } finally {
                    this.isLoading = false;
                }
            }
        },
        // 模拟后端接口
        mockGenerateImage(prompt,style) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        imageUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.dHI9ywA-U4xRaV7AKuoCSAHaKQ?rs=1&pid=ImgDetMain'
                    });
                }, 2000); // 模拟 2 秒的延迟
            });
        },
        selectStyle(style) {
            this.selectedStyle = style;
        },
    }
};
</script>

<style scoped>
html,
body {
    overflow: auto;
}

.chat-input-container {
    margin: auto;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    position: relative;
    /* margin: 20px auto; */
    width: 800px;
    transition: all 0.3s ease;
    padding: 0 10px;
}

.chat-input {
    width: 90%;
    height: 80px;
    padding-top: 10px;
    font-size: 16px;
    resize: none;
    border: none;
    outline: none;
    overflow: auto;
}

.chat-actions {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-bottom: 10px;
}

.icon-buttons {
    display: flex;
    gap: 10px;
    margin: 10px 10px;
}

.icon-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
    }
}

.function-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 60px;
}
.function-button:hover,
.function-button.selected {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(200, 200, 255, 0.8)); /* 背景渐变 */
    border: 2px solid #8d44ad74; /* 边框渐变 */
    color: #8e44ad; /* 悬浮时文字颜色 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}
.function-button:hover .button-icon {
    transform: scale(1.2);
    /* 鼠标悬浮时图片放大 */
}

.function-button {
    height: 70px;
    border-radius: 12px;
    background-color: #f4f4f49a;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: space-between;
    /* 文字和图片两端对齐 */
}

.button-icon {
    width: 40px;
    /* 调整图片宽度 */
    height: 40px;
    /* 调整图片高度 */
    margin-left: 10px;
    /* 与文字保持间距 */
    transition: transform 0.3s ease;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
    display: flex;
    justify-content: center;
}

.sub-title {
    color: #ccc;
    font-size: medium;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.text-to-image-container {
    height: 90vw;
    min-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

.preview {
    border-radius: 10px;
    width: 90%;
    min-width: 1000px;
    margin-top: 20px;
    padding: 10px;
    border: 1px dashed #ccc;
    background-color: #f9f9f9;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.preview-text{
    font-size: 48px;
    color: #ccc;
}
.generated-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>
