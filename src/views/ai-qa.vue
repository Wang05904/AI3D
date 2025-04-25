<template>
    <div class="ai-chat-container" :class="{ 'sent-message': hasSentMessage }">
        <h1 class="title" v-if="!hasSentMessage">你好，我是智能助理</h1>
        <div class="chat-input-container">
            <textarea
                class="chat-input"
                v-model="message"
                placeholder="发送消息、输入 @ 或 / 选择技能"
                rows="4"
            ></textarea>
            <div class="chat-actions">
                <button class="action-button" @click="sendMessage">发送</button>
                <div class="icon-buttons" v-if="!hasSentMessage">
                    <button class="icon-button">📎</button>
                    <button class="icon-button">🎨</button>
                    <button class="icon-button">🎤</button>
                    <button class="icon-button">📤</button>
                </div>
            </div>
        </div>
        <div class="quick-actions" v-if="!hasSentMessage">
            <button class="quick-action">帮我写作</button>
            <button class="quick-action">图像生成</button>
            <button class="quick-action">AI 搜索</button>
            <button class="quick-action">AI 阅读</button>
            <button class="quick-action">AI 编程</button>
            <button class="quick-action">翻译</button>
            <button class="quick-action">更多</button>
        </div>
        <div class="response-container" v-if="hasSentMessage">
            <p class="response-text">你好！有什么我可以帮助你的吗？</p>
            <div class="response-options">
                <button class="response-option">你是如何被训练的？</button>
                <button class="response-option">你都有哪些功能？</button>
                <button class="response-option">给我讲个笑话。</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            hasSentMessage: false,
        };
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== '') {
                this.hasSentMessage = true;
            }
        },
    },
};
</script>

<style>
.ai-chat-container {
    max-width: 800px;
    margin: 30px auto;
    text-align: center;
    font-family: Arial, sans-serif;
    transition: all 0.3s ease;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
}

.chat-input-container {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    margin: 20px auto;
    width: 90%;
    transition: all 0.3s ease;
}

.chat-input {
    width: 90%;
    height: 50px;
    padding: 10px;
    font-size: 16px;
    resize: none;
    border: none;
    outline: none;
    overflow: auto;
}

.chat-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.action-button {
    padding: 10px 20px;
    font-size: 16px;
    color: #000000;
    background-color: #ffffff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #e2e2e2;
}

.icon-buttons {
    display: flex;
    gap: 10px;
}

.icon-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.quick-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.quick-action {
    padding: 10px 15px;
    font-size: 14px;
    color: #000000;
    background-color: #ffffff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.quick-action:hover {
    background-color: #e2e2e2;
}

.response-container {
    margin-top: 20px;
    text-align: left;
}

.response-text {
    font-size: 16px;
    margin-bottom: 20px;
}

.response-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.response-option {
    padding: 10px 15px;
    font-size: 14px;
    color: #000000;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.response-option:hover {
    background-color: #e2e2e2;
}
</style>
