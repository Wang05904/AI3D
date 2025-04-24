<template>
    <div>
        <h2>文生图</h2>
        <textarea placeholder="输入描述"></textarea>
        <button>生成图片</button>
        <div class="preview">图片预览区域</div>
    </div>
</template>

<script>
export default {};
</script>

<style>
textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

.preview {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}
</style>
