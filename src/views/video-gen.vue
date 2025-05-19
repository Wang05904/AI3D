<template>
  <div class="video-gen-container">
    <h2 class="title">视频生成</h2>

    <!-- 上传素材 -->
    <div class="upload-section">
        <v-file-input label="点击上传素材" variant="outlined" accept="image/*,video/*" @change="handleImageUpload"
        :disabled="isGenerating"></v-file-input>
        <p class="upload-hint">支持格式：mp4, avi, mov, jpg, jpeg, png</p>
    </div>

    <!-- 视频预览区域 -->
    <div :class="['preview', { 'has-border': previewImage }]">
      <p v-if="!previewImage">视频预览区域</p>
      <video v-else src="../../public/background/bg1.mp4" autoplay loop muted ></video>
    </div>

    <!-- 视频生成操作 -->
    <div class="actions">
      <button class="generate-button" @click="generateVideo">生成视频</button>
      <button class="reset-button" @click="reset">重置</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isGenerating: false,
            previewImage: null,
        }
    },
    methods:{
        handleImageUpload(event){
            const file = event.target.files[0]
            if (!file) return

            if (!file.type.match('image.*')) {
                this.error = '请选择有效的图片文件'
                return
            }

            this.error = null

            // 创建预览
            const reader = new FileReader()
            reader.onload = (e) => {
                this.previewImage = e.target.result
            }
            reader.readAsDataURL(file)
            // 重置模型
            this.modelUrl = null
            console.log('上传素材');
        },
        generateVideo(){
            this.previewImage = '../../public/background/bg1.mp4'
            console.log('生成视频');
        },
        reset(){
            this.previewImage = null
        }
    }
};
</script>

<style scoped>
.video-gen-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.preview.has-border {
  border: 1px solid #ccc; /* 添加边框样式 */
}
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.upload-section {
  text-align: center;
  margin-bottom: 20px;
}

.upload-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #0056b3;
}

.upload-hint {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.preview {
  width: 80vw;
  height: 60vh;
  margin-top: 20px;
  padding: 0; /* 移除内边距 */
  /* background-color: #f9f9f9; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview video {
  /* width: 80vw; 设置宽度为父容器的 100% */
  height: 60vh;
  object-fit: cover; /* 视频内容填充整个容器，可能会裁剪 */
  border-radius: 4px; /* 可选：为视频添加圆角 */
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.generate-button,
.reset-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.generate-button {
  background-color: #28a745;
  color: white;
}

.generate-button:hover {
  background-color: #218838;
}

.reset-button {
  background-color: #dc3545;
  color: white;
}

.reset-button:hover {
  background-color: #c82333;
}
</style>
