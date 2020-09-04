<template>
    <div class="v-code-terser">
        <Input class="value-box" v-model="codeString" type="textarea" :rows="8" placeholder="输入需要压缩的 Javascript 代码" />
        <Button class="magin-top" type="primary" @click="terserCodeString">压缩</Button>
        <template v-if="terserString">
            <ScrollBar class="terser-value-scroll">
                <div class="terser-value">{{terserString}}</div>
                <Button class="magin-top" type="primary" @click="copyTerserString">复制</Button>
            </ScrollBar>
        </template>
    </div>
</template>

<script>
import { Divider, Input, Button } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import { TipSuccess } from '@common/tip';
import { copyText } from '@common/itoolbox';
import { jsCodeTerser } from '@common/codeTerser';
export default {
    name: 'CodeTerser', // 代码压缩
    components: {
        Divider,
        Input,
        ScrollBar,
        Button,
    },
    data() {
        return {
            codeString: '',
            terserString: '',
        };
    },
    methods: {
        async terserCodeString() {
            this.terserString = await jsCodeTerser(`${this.codeString}`);
            TipSuccess('压缩成功！');
        },
        copyTerserString() {
            copyText(this.terserString);
        },
    },
};
</script>

<style lang="less">
.v-code-terser {
    .m(@gap-md);
    .magin-top {
        margin-top: 10px;
    }
    .terser-value-scroll {
        height: 360px;
        .terser-value {
            color: @info;
        }
    }
}
</style>
