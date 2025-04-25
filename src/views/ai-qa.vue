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
            :style="hasSentMessage ? { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', botton: '20px' } : { margin: 'auto' }">
            <textarea class="chat-input" v-model="newMessage" placeholder="发送消息、输入 @ 或 / 选择技能" rows="4"
                @keyup.enter="sendMessage"></textarea>
            <div class="chat-actions">
                <div class="icon-buttons">
                    <button class="icon-button">📎</button>
                    <button class="icon-button">🎨</button>
                    <button class="icon-button">🎤</button>
                    <button class="icon-button" @click="sendMessage"><img src="../../public/icon/发送.png"
                            alt=""></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage: '',
            messages: [],
        };
    },
    computed: {
        hasSentMessage() {
            return this.messages.length > 0;
        }
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                // 用户消息
                this.messages.push({ text: this.newMessage, isUser: true });
                this.newMessage = '';
                this.scrollToBottom(); // 滚动到底部
                // 模拟机器人回复
                setTimeout(() => {
                    this.messages.push({ text: '这是机器人的回复', isUser: false });
                    this.scrollToBottom(); // 滚动到底部
                }, 1000);
            }
            
        },
        scrollToBottom() {
            if(this.$refs.responseContainer){
            var div=this.$refs.responseContainer;
            console.log(div);
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            console.log(div.scrollHeight);
            }, 10);
            }
	        
        }
    },
};
</script>

<style>
.ai-chat-container {
    height: 100%;
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
    margin-top: 25%;
}

.chat-input-container {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    position: relative;
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
