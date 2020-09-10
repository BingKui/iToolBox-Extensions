<template>
    <div class="v-index-page">
        <div class="translate-type">
            <Select class="type-item base-type" v-model="baseValue" default-value="zh">
                <Option v-for="item in languageList" :key="item.key" :title="item.value" :value="item.key">{{item.value}}</Option>
            </Select>
            <Icon class="change-action" type="swap" />
            <Select class="type-item target-type" v-model="targetValue" default-value="en">
                <Option v-for="item in languageList" :key="item.key" :title="item.value" :value="item.key">{{item.value}}</Option>
            </Select>
        </div>
        <Textarea v-model="translateText" :rows="4" @pressEnter="translateAction" placeholder="输入需要翻译的内容..." :allowClear="true" />
        <Divider orientation="center">结果</Divider>
        <div class="translate-result">{{translateResult}}</div>
    </div>
</template>

<script>
import { Button, Divider, Icon, Input, Select } from 'ant-design-vue';
import { TYPE_ENMU, TYPE_LIST } from '@constants/type';
import { translateText } from '@common/baidu';
import { TencentTranslate } from '@common/tencent';
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Textarea: Input.TextArea,
        Select,
        Option: Select.Option,
    },
    data() {
        return {
            languageList: TYPE_LIST,
            baseValue: 'zh',
            targetValue: 'en',
            translateText: '',
            translateResult: '',
        };
    },
    methods: {
        async translateAction(e) {
            e.path[0].blur();
            const objectValue = await TencentTranslate(this.translateText, {
                base: this.baseValue,
                target: this.targetValue,
            });
            this.translateResult = objectValue.Response.TargetText;
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
    .translate-type {
        .flex();
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        .m-b(@gap);
        .type-item {
            width: 40%;
        }
    }
    .translate-result {
        font-size: @font-size-md;
        font-weight: 500;
        color: black;
        line-height: 20px;
    }
}
</style>
