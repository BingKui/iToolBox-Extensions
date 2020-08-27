<template>
    <div class="v-imgurl-to-base">
        <Input v-model="url" placeholder="输入图片地址" />
        <Button class="margin-bottom margin-top" @click="transformUrl">转换</Button>
        <template v-if="baseValue">
            <Input v-model="baseValue" :rows="8" :disabled="true" type="textarea" placeholder="base64结果" />
            <Button class="margin-top" type="primary" @click="copyBaseValue">复制Base64</Button>
        </template>
    </div>
</template>

<script>
import { Button, Input } from 'ant-design-vue';
import { copyText } from '@common/itoolbox';
import { ImageUrlToBase64 } from '@common/image';
import { TipSuccess, TipError } from '@common/tip';
import { isUrl } from '@common/utils';
export default {
    name: 'ImgUrlToBase64', // 地址转换为base64
    components: {
        Button,
        Input,
    },
    data() {
        return {
            url: '',
            baseValue: '',
        };
    },
    methods: {
        async transformUrl() {
            if (isUrl(this.url)) {
                const val = await ImageUrlToBase64(this.url);
                if (val) {
                    this.baseValue = val;
                    TipSuccess('转换成功');
                }
            }
        },
        copyBaseValue() {
            this.baseValue ? copyText(this.baseValue) : TipError('请先选择图片转换');
        },
    },
};
</script>

<style lang="less">

</style>
