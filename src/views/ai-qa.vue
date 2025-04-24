<template>
    <div class="ai-chat-container">
        <h1 class="title">你好，我是智能助理</h1>
        <div class="chat-input-container">
            <textarea class="chat-input" placeholder="发送消息、输入 @ 或 / 选择技能"></textarea>
            <div class="chat-actions">
                <button class="action-button">深度思考</button>
                <div class="icon-buttons">
                    <button class="icon-button">📎</button>
                    <button class="icon-button">🎨</button>
                    <button class="icon-button">🎤</button>
                    <button class="icon-button">📤</button>
                </div>
            </div>
        </div>
        <div class="quick-actions">
            <button class="quick-action">帮我写作</button>
            <button class="quick-action">图像生成</button>
            <button class="quick-action">AI 搜索</button>
            <button class="quick-action">AI 阅读</button>
            <button class="quick-action">AI 编程</button>
            <button class="quick-action">翻译</button>
            <button class="quick-action">更多</button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.ai-chat-container {
    max-width: 800px;
    margin: 30px auto;
    text-align: center;
    font-family: Arial, sans-serif;
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
}

.chat-input {
    width: 90%;
    height: 50px;
    padding: 10px;
    font-size: 16px;
    resize: none;
    border: none;
    outline:none;
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
    color: #ffffff;
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
</style>
