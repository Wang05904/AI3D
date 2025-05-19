import axios from 'axios';

import OpenAI from "openai";

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: 'https://your-backend-api.com/api', // 替换为你的后端 API 基础 URL
    timeout: 5000, // 请求超时时间
});

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-e9e76c09c3f045239369152df2c21424',
    dangerouslyAllowBrowser: true
});

// 示例接口：生成图片
export const generateImage = async (prompt, style) => {
    try {
        const response = await apiClient.post('/generate-image', {
            prompt,
            style,
        });
        return response.data; // 返回后端返回的数据
    } catch (error) {
        console.error('生成图片失败:', error);
        throw error; // 抛出错误以便调用方处理
    }
};

// 示例接口：获取生成状态
export const getGenerationStatus = async (taskId) => {
    try {
        const response = await apiClient.get(`/generation-status/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('获取生成状态失败:', error);
        throw error;
    }
};

// ds对话流式返回接口
export const getDialogFlowResponse = async (message) => {    
    try {
        const completion = await openai.chat.completions.create({
            messages:[{
                role: "user", // or "assistant", "system" depending on context
                content: message
              }],
            // stream: true,
            model: "deepseek-chat",
          });
        // console.log(completion.choices[0].message.content);
        console.log(completion);
        return completion.choices[0].message.content;
        // return '1'
    } catch (error) {
        console.error('获取对话流式返回失败:', error);
        throw error;
    }
};
// 模型生成接口(图片->obj模型)
export const generateModelFromImage = async (imageBlob) => {
    const formData = new FormData()
    formData.append('image', imageBlob)
    
    const response = await axios.post(`${API_BASE_URL}/generate-model`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'arraybuffer' // 重要：接收二进制数据
    })
    
    // return response.data
    return '1'
  }