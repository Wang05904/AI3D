<template>
    <div class="upload-container">
        <h1 class="title">图片修改</h1>
        <span class="sub-title">上传一张图片，在线编辑</span>

        <div class="upload-section">
            <v-file-input label="点击上传图片" variant="outlined" accept="image/*" @change="handleImageUpload"
                :disabled="isGenerating"></v-file-input>
        </div>

        <div v-if="canvas" class="canvas-container" @input="updateObjectColor">
            <div class="color-picker">
                <img src="../../public/icon/取色.png" alt="">
                选中对象后在此调整颜色<input class="color-input" type="color" v-model="selectedColor" :disabled="!hasActiveObject" />
            </div>
            <canvas id="drawingCanvas" ref="drawingCanvas"></canvas>
            <div class="controls">
                <!-- <input type="color" v-model="selectedColor" :disabled="!hasActiveObject" /> -->
                <div class="button-group">
                    <!-- <v-btn block @click="changeColor" :disabled="!hasActiveObject" class="action-btn">
                        <i class="el-icon-edit"></i> 修改颜色
                    </v-btn> -->
                    <v-btn block @click="resetCanvas" class="action-btn">
                        <i class="el-icon-refresh"></i> 重置画布
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-else class="image-preview">
            <el-empty description="请先上传图片" />
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>
</template>

<script>
import * as fabric from 'fabric';

export default {
    components: {
    },
    data() {
        return {
            canvas: null,// Fabric.js 画布实例
            error: null,
            isGenerating: false,//禁用上传文件
            selectedColor: '#ff0000', // 默认颜色
            hasActiveObject: false, // 是否有选中对象
            group: null, // 用于存储正方形和内部元素的组
        }
    },
    methods: {
        initCanvas() {
            const canvasElement = this.$refs.drawingCanvas;

            // 初始化 Fabric.js 画布
            this.canvas = new fabric.Canvas(canvasElement, {
                width: 1000,
                height: 800,
                backgroundColor: '#fff',
            });

            // 绘制正方形底
            const square = new fabric.Rect({
                left: 250, // 居中画布
                top: 150,
                width: 500,
                height: 500,
                fill: '#fff',
                stroke: '#000', // 边框颜色（黑色）
                strokeWidth: 5, // 边框宽度
                selectable: false, // 禁止拖拽正方形底
            });
            this.canvas.add(square);

            // 添加可拖拽的几何体
            this.addDraggableShapes();

           // 监听选中和取消选中事件
           this.canvas.on('selection:created', this.updateSelectedColor);
            this.canvas.on('selection:updated', this.updateSelectedColor);
            this.canvas.on('selection:cleared', () => {
                this.hasActiveObject = false;
                this.selectedColor = '#ff0000'; // 重置为默认颜色
            });
        },
        updateSelectedColor() {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                this.hasActiveObject = true;
                this.selectedColor = activeObject.fill || '#ffffff'; // 更新颜色选择器的值
            }
        },
        updateObjectColor() {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                activeObject.set('fill', this.selectedColor); // 动态更新选中对象的颜色
                this.canvas.renderAll(); // 重新渲染画布
            }
        },
        addDraggableShapes() {
            // 添加红色圆形
            const circle = new fabric.Circle({
                left: 300,
                top: 200,
                radius: 50,
                fill: '#ff0000',
                hasControls: false, // 禁止缩放和旋转
            });
            this.canvas.add(circle);

            const rectangle = new fabric.Rect({
                left: 400,
                top: 300,
                width: 100,
                height: 50,
                fill: '#00ff00',
                hasControls: false, // 禁止缩放和旋转
            });
            this.canvas.add(rectangle);

            const triangle = new fabric.Triangle({
                left: 500,
                top: 400,
                width: 100,
                height: 100,
                fill: '#0000ff',
                hasControls: false, // 禁止缩放和旋转
            });
            this.canvas.add(triangle);

            // 限制几何体拖拽范围
            this.canvas.on('object:moving', (e) => {
                const obj = e.target;

                // 限制在正方形范围内
                const minX = 250; // 正方形左边界
                const minY = 150; // 正方形上边界
                const maxX = 750 - obj.width; // 正方形右边界
                const maxY = 650 - obj.height; // 正方形下边界

                if (obj.left < minX) obj.left = minX;
                if (obj.top < minY) obj.top = minY;
                if (obj.left > maxX) obj.left = maxX;
                if (obj.top > maxY) obj.top = maxY;
            });
        },
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
                // this.addImageToCanvas(e.target.result);
                this.canvas = true;
                setTimeout(() => {
                    this.initCanvas(); // 初始化画布
                }, 1000);
            }
            reader.readAsDataURL(file);
            console.log(1)
        },
        changeColor() {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                activeObject.set('fill', this.selectedColor); // 设置选中对象的颜色
                this.canvas.renderAll(); // 重新渲染画布
            } else {
                alert('请先选择一个对象');
            }
        },
        resetCanvas() {
            if (this.canvas) {
                this.canvas.dispose(); // 清空画布上的所有内容
            }
            this.initCanvas(); // 重新初始化画布
        },
    },
    mounted() {
        // this.canvas = true;
        // setTimeout(() => {
        //     this.initCanvas(); // 初始化画布
        // }, 1000);
    },
}
</script>


<style>
.canvas-container {
    /* border: 1px solid #ccc; */
    height: 100%;
    max-height: 1000px;
    width: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    /* 确保子元素不会脱离父容器 */
    overflow: auto;
    padding: 20px
        /* 防止子元素超出容器 */
}

.color-picker{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    img{
        width: 20px;
        height: 20px;
    }
}

.controls {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.button-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    /* 按钮组的最大宽度 */
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    /* 图标和文字之间的间距 */
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.action-btn:hover {
    background-color: #45a049;
}

.action-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.action-btn i {
    font-size: 16px;
    /* 图标大小 */
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

.upload-section {
    width: 100%;
}

.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
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

input[type='color'] {
    width: 40px;
    height: 40px;
    border: none;
    cursor: pointer;
}

.error-message {
    color: red;
    margin-top: 20px;
}
</style>
