<template>
    <div class="upload-container">
        <h1 class="title">3D模型编辑</h1>
        <span class="sub-title">上传3D模型，可在此调整3D模型</span>
        <div class="upload-section">
            <v-file-input label="点击上传模型" variant="outlined" accept=".obj,.gltf" @change="handleModelUpload"
                :disabled="isGenerating"></v-file-input>
        </div>
        <div class="upload-section">
            <div v-if="modelUrl" class="model-viewer-container">
                <h2 style="margin: 0 20px;">3D模型预览</h2>
                <!-- <ModelEditViewer></ModelEditViewer> -->
            </div>
            <div v-else class="image-preview">
                <el-empty description="请先上传图片" />
            </div>
        </div>
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>
</template>
<script>
// import ModelEditViewer from '@/components/ModelEditViewer.vue'

export default {
    components: {
    },
    data() {
        return {
            previewModel: null,
            modelUrl: null,
            isGenerating: false,
            error: null,
            showModal: false,
        }
    },
    methods: {
        handleModelUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                this.error = '未选择文件';
                return;
            }

            // 验证文件类型
            const validExtensions = ['.obj', '.gltf', '.glb'];
            const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                this.error = '请选择有效的3D模型文件（支持 .obj, .gltf, .glb）';
                return;
            }

            this.error = null;

            // 使用 FileReader 读取文件内容
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewModel = e.target.result; // 设置预览模型的 URL
                this.modelUrl = e.target.result; // 更新模型 URL，用于展示
                this.$router.push('/model-edit-viewer')
            };
            reader.onerror = () => {
                this.error = '文件读取失败，请重试';
            };
            reader.readAsDataURL(file); // 读取文件为 Data URL
        },
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

.error-message {
    color: red;
    margin-top: 20px;
}
</style>
