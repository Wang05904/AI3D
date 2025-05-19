<template>
    <div class="ai-chat-container">
        <div class="response-container" v-if="hasSentMessage" ref="responseContainer">
            <!-- <div class="chat-messages"> -->
                <div v-for="(message, index) in messages" :key="index" class="message"
                    :class="message.isUser ? 'user-message' : 'bot-message'">
                    <span>{{ message.text }}</span>
                </div>
            <!-- </div> -->
        </div>
        <h1 class="title" v-if="!hasSentMessage">你好，我是智能助理</h1>
        <div class="chat-input-container"
            :style="hasSentMessage ? { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' } : { margin: 'auto' }">
            <textarea class="chat-input" v-model="newMessage" placeholder="发送消息、输入 @ 或 / 选择技能" rows="4"
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
    </div>
</template>

<script>
import { getDialogFlowResponse } from '@/api/index'; // 引入封装好的 API 方法
import {Marked} from 'marked'; // 引入 marked 库用于 Markdown 转换
export default {
    data() {
        return {
            newMessage: '',
            messages: [],
            isLoading: false,
        };
    },
    computed: {
        hasSentMessage() {
            return this.messages.length > 0;
        }
    },
    methods: {
        async sendMessage() {
            if (this.newMessage.trim() !== '' && !this.isLoading) {
                this.isLoading = true;

                // 用户消息
                this.messages.push({ text: this.newMessage, isUser: true });
                const userMessage = this.newMessage; // 保存用户输入
                this.newMessage = '';
                this.scrollToBottom(); // 滚动到底部

                try {
                    // 调用封装的流式返回接口
                    const stream = await getDialogFlowResponse(userMessage);

                    // 处理流式返回
                    let botMessage = '';
                    for await (const chunk of stream) {
                        botMessage += chunk; // 拼接流式返回的内容
                        this.updateBotMessage(botMessage); // 实时更新机器人消息
                        this.scrollToBottom(); // 滚动到底部
                        this.convertMarkdowntoHTML(); // 转换 Markdown 格式到 HTML
                    }

                    this.isLoading = false;
                } catch (error) {
                    console.error('获取对话流式返回失败:', error);
                    this.messages.push({ text: '机器人回复失败，请稍后重试。', isUser: false });
                    this.isLoading = false;
                }
            }
        },
        convertMarkdowntoHTML(){
            document.getElementById("responseContainer").innerHTML = marked(this.messages[this.messages.length-1].text);
        },
        updateBotMessage(content) {
            // 如果机器人消息还未添加到消息列表中，则添加
            if (!this.messages.some((msg) => !msg.isUser)) {
                this.messages.push({ text: '', isUser: false });
            }

            // 更新最后一条机器人的消息内容
            const botMessage = this.messages.find((msg) => !msg.isUser);
            if (botMessage) {
                botMessage.text = content;
            }
        },
        scrollToBottom() {
            if(this.$refs.responseContainer){
            var div=this.$refs.responseContainer;
            // console.log(div);
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            // console.log(div.scrollHeight);
            }, 10);
            }
	        
        }
    },
};
</script>

<style scoped>

html, body {
    margin: 0;
    padding: 0;
    height: 100%; /* 确保占满视口高度 */
    box-sizing: border-box;
}
.ai-chat-container {
    /* height: 100vh; */
    max-width: 800px;
    text-align: center;
    font-family: Arial, sans-serif;
    transition: all 0.3s ease;
    max-height: calc(100vh - 160px);
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 25%;
}

.chat-input-container {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    /* position: relative; */
    /* margin: 20px auto; */
    width: 800px;
    transition: all 0.3s ease;
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

.response-container {
    /* padding: 0 20px; */
    margin-top: 20px;
    text-align: left;
    height: 65%;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    text-align: left;
    margin-bottom: 5px;
}

.input-container {
    display: flex;
    justify-content: center;
}

.input-container button {
    padding: 5px 10px;
}

.chat-messages {
    /* border: 1px solid #ccc; */
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    max-width: 70%;
    word-wrap: break-word;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
}

.user-message {
    align-self: flex-end;
    background-color: #ececec;
    color: #000;
    border-radius: 10px 10px 0 10px;
}

.bot-message {
    align-self: flex-start;
    background-color: transparent;
    color: #000;
    border-radius: 0;
}
</style>
