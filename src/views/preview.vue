<template>
    <div>
        <h2>预览</h2>
        <div class="preview">
            <ModelViewer :model-url="modelUrl" />
        </div>
    </div>
</template>

<script>
import ModelViewer from '@/components/ModelViewer.vue'

export default {
    components: {
        ModelViewer
    },
    data() {
        return {
            modelUrl: null,
        }
    },
    methods: {  
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
    },
    mounted() {
        this.$router.push('/model-viewer');
    }
};
</script>

<style>
.preview {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}
</style>
