<template>
    <div class="v-img-to-base">
        <Button class="margin-bottom" @click="selectImage">选择图片</Button>
        <template v-if="baseValue">
            <Input v-model="baseValue" :rows="8" :disabled="true" type="textarea" placeholder="base64结果" />
            <Button class="margin-top" type="primary" @click="copyBaseValue">复制Base64</Button>
        </template>
    </div>
</template>

<script>
import { Button, Input } from 'ant-design-vue';
import { selectImage, copyText } from '@common/itoolbox';
import { ImageToBase64, base64ToImg } from '@common/image';
import { TipSuccess, TipError } from '@common/tip';
export default {
    name: 'ImgToBase64', // 图片转base64
    components: {
        Button,
        Input,
    },
    data() {
        return {
            baseValue: '',
        };
    },
    methods: {
        async selectImage() {
            const filePath = await selectImage();
            filePath && await this.imageToBaseConversion(filePath);
        },
        async imageToBaseConversion(filePath) {
            const val = await ImageToBase64(filePath);
            if (val) {
                this.baseValue = val;
                TipSuccess('转换成功');
            }
        },
        copyBaseValue() {
            this.baseValue ? copyText(this.baseValue) : TipError('请先选择图片转换');
        },
    },
};
</script>

<style lang="less">
.v-img-to-base {}
</style>
