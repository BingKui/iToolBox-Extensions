<template>
    <div class="v-index-page">
        <Divider orientation="left">规则</Divider>
        <Checkbox v-model="haveNumber">数字</Checkbox>
        <Checkbox v-model="haveUpper">大写字母</Checkbox>
        <Checkbox v-model="haveLower">小写字母</Checkbox>
        <Checkbox v-model="haveExt">特殊字符</Checkbox>
        <div class="margin-bottom" v-if="haveUpper || haveLower">
            <Divider orientation="left">特殊规则</Divider>
            <Checkbox v-model="isLetterStar">字母开头</Checkbox>
            <template v-if="isLetterStar && haveUpper">
                <Checkbox v-model="isUpperStar">首字母大写</Checkbox>
            </template>
        </div>
        <div class="margin-bottom">
            <Divider orientation="left">特殊规则</Divider>
            <InputNumber v-model="passwordLength" />
        </div>
        <div class="margin-bottom">
            <Button type="primary" @click="createPassword">生成</Button>
        </div>
        <template v-if="passwordValue">
            <Divider orientation="left">结果</Divider>
            <div class="password-result">{{passwordValue}}</div>
        </template>
    </div>
</template>

<script>
import { Button, Divider, Checkbox, InputNumber } from 'ant-design-vue';
import { NUMBER_ENMU, LOWER_ENMU, UPPER_ENMU, EXT_ENMU } from '@constants/enmu';
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Checkbox,
        CheckboxGroup: Checkbox.Group,
        InputNumber,
    },
    data() {
        return {
            haveNumber: true,
            haveUpper: true,
            haveLower: true,
            haveExt: true,
            isLetterStar: false,
            isUpperStar: false,
            passwordLength: 6,
            passwordValue: '',
        };
    },
    methods: {
        createPassword() {
            let baseStr = '';
            let len = this.passwordLength;
            let result = '';
            if (this.haveNumber) {
                baseStr += NUMBER_ENMU;
            }
            if (this.haveUpper) {
                baseStr += UPPER_ENMU;
            }
            if (this.haveLower) {
                baseStr += LOWER_ENMU;
            }
            if (this.haveExt) {
                baseStr += EXT_ENMU;
            }
            if (this.isLetterStar) {
                len -= 1;
                result += this.getOneRandomStr(this.isUpperStar ? UPPER_ENMU : LOWER_ENMU);
            }
            for (let i = 0; i < len; i++) {
                result += this.getOneRandomStr(baseStr);
            }
            this.passwordValue = result;
        },
        getOneRandomStr(str) {
            const targetString = this.shuffleStr(str);
            const length = targetString.length;
            const index = parseInt(Math.random() * length);
            return targetString[index];
        },
        shuffleStr(str) {
            const array = str.split('');
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;

            }
            return array.join('');
        }
    },
};
</script>

<style lang="less">
.v-index-page {
    .p-h(@gap-md);
    .password-result {
        color: @success;
        word-spacing: 10px;
        word-break: break-all;
    }
}
</style>
