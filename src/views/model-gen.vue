<template>
    <div class="upload-container">
        <h1 class="title">3D模型生成</h1>
        <span class="sub-title">上传一张图片，AI3D将自动生成3D模型</span>

        <div class="upload-section">
            <v-file-input label="点击上传图片" variant="outlined" accept="image/*" @change="handleImageUpload"
                :disabled="isGenerating"></v-file-input>

            <div v-if="previewImage" class="image-preview">
                <img :src="previewImage" alt="预览">
                <el-button @click="generateModel" :disabled="isGenerating" type="primary" plain size="large">
                    {{ isGenerating ? '生成中...' : '生成3D模型' }}
                </el-button>
            </div>
            <div v-else class="image-preview">
                <el-empty description="请先上传图片" />
            </div>
        </div>

        <!-- <div  class="model-viewer-container">
            <h2 style="margin: 0 20px;">3D模型预览</h2>
        </div> -->

        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>
</template>

<script>
import ModelViewer from '@/components/ModelViewer.vue'
import { generateModelFromImage } from '@/api/index'

export default {
    components: {
        ModelViewer
    },
    data() {
        return {
            previewImage: null,
            modelUrl: null,
            isGenerating: false,
            error: null,
            showModal:false,
        }
    },
    methods: {
        handleImageUpload(event) {
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
        },
        async generateModel() {
            if (!this.previewImage) {
                this.error = '请先上传图片';
                return;
            }

            this.isGenerating = true;
            this.error = null;

            try {
                setTimeout(() => {
                    this.isGenerating = false;
                    console.log('模拟生成模型成功');
                    this.showModal=true;
                    this.$router.push('/model-viewer');
                }, 2000); // 模拟延迟
                // 模拟调用后端API，延迟2秒后返回
                // await new Promise((resolve) => setTimeout(resolve, 2000));

                // // 模拟返回的OBJ文件路径
                // const staticModelPath = '/obj/test.obj';

                // // 创建OBJ文件的URL
                // this.modelUrl = staticModelPath; // 直接使用静态文件路径
            } catch (err) {
                console.error('生成模型失败:', err);
                this.error = '生成模型失败: ' + (err.message || '未知错误');
            } finally {
                this.isGenerating = false;
            }
        }
    }
}
</script>

<style>
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

.preview {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}

.upload-container {
    width: 100vw;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.upload-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 20px;
}

.upload-button:hover {
    background-color: #45a049;
}

.image-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.image-preview img {
    max-width: 100%;
    max-height: 300px;
    display: block;
    margin-bottom: 15px;
}

.model-section {
    margin-top: 40px;
}

.error-message {
    color: red;
    margin-top: 20px;
}
</style>
