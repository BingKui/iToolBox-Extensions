<template>
    <div class="v-encode-or-decode">
        <Input v-model="value" type="textarea" rows="5" placeholder="输入要 Encode 或者 Decode 的内容" />
        <div class="v-btn-list">
            <Button type="primary" @click="encode">Encode</Button>
            <Button type="primary" @click="decode">Decode</Button>
        </div>
        <div v-if="encodeValue" class="encode-result">
            <Divider size="small" orientation="left">Encode结果</Divider>
            <div class="result-value">{{encodeValue}}</div>
        </div>
        <div v-if="decodeValue" class="decode-result">
            <Divider size="small" orientation="left">Decode结果</Divider>
            <div class="result-value">{{decodeValue}}</div>
        </div>
    </div>
</template>

<script>
import { Input, Divider, Button } from 'ant-design-vue';
import { TipError, TipSuccess } from '@common/tip';
export default {
    name: 'EncodeOrDecode', // 加密或解密
    components: {
        Input,
        Divider,
        Button,
    },
    data() {
        return {
            value: '',
            encodeValue: '',
            decodeValue: '',
        };
    },
    methods: {
        encode() {
            if (this.urlReg()) {
                this.encodeValue = encodeURIComponent(this.value);
                this.decodeValue = '';
                TipSuccess('Encode 成功！');
            }
        },
        decode() {
            this.encodeValue = '';
            this.decodeValue = decodeURIComponent(this.value);
            TipSuccess('Decode 成功！');
        },
        urlReg() {
            const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g;
            const flag = reg.test(this.value);
            if (!flag) {
                TipError('不是正确的url地址');
            }
            return flag;
        },
    },
};
</script>

<style lang="less">
.v-encode-or-decode {
    .v-btn-list {
        .m-t(@gap);
    }
    .result-value {
        word-break: break-all;
    }
}
</style>
