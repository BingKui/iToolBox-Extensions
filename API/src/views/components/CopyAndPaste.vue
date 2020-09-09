<template>
    <div class="v-select">
        <Input v-model="text" placeholder="输入需要复制的内容" />
        <Button class="margin-bottom margin-top" @click="copyText">复制</Button>
        <Input v-model="imageFilePath" placeholder="输入需要复制的图片地址" />
        <Button class="margin-bottom margin-top" @click="copyImage">复制图片</Button>
        <Input v-model="filePath" placeholder="输入需要复制的文件地址" />
        <Button class="margin-bottom margin-top" @click="copyFile">复制文件内容</Button>
    </div>
</template>

<script>
import { Button, Input } from 'ant-design-vue';
import { apiCopyText, apiCopyFileContent, apiCopyImage } from '@common/itoolbox';
import { TipSuccess, TipError } from '@common/tip';
export default {
    name: 'CopyAndPaste', // 复制粘贴类
    components: {
        Button,
        Input,
    },
    data() {
        return {
            text: '',
            imageFilePath: '',
            filePath: '',
        };
    },
    methods: {
        async copyText() {
            const res = await apiCopyText(this.text);
            if (res.success) {
                TipSuccess(`复制 ${this.text} 成功！`);
            }
        },
        async copyImage() {
            const res = await apiCopyImage(this.imageFilePath);
            if (res.success) {
                TipSuccess('复制成功！');
            }
        },
        async copyFile() {
            const res = await apiCopyFileContent(this.filePath);
            if (res.success) {
                TipSuccess('复制成功！');
            }
        },
    },
};
</script>

<style lang="less">

</style>
