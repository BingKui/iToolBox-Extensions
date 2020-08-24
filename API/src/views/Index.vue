<template>
    <div class="v-index-page">
        <Divider orientation="center">示例项目</Divider>
        <div class="desc">本项目为示例项目，主要包含基本的框架，打包封装。可以零基础直接进行插件的开发。内置包含 "ant-design-vue" 组件库，方便快速构建界面。</div>
        <Divider orientation="left">AntdV基础组件展示</Divider>
        <div class="components-list">
            <Button>按钮</Button>
            <Icon type="smile" theme="twoTone" style="fontSize: 25px;" />
        </div>
        <Divider orientation="left">API 基础</Divider>
        <Button @click="apiVerAction">获取api版本</Button>
        <Button @click="apiNotice">系统提醒</Button>
        <div v-if="apiVersion" class="api-version">Api Version: v{{apiVersion}}</div>
        <Divider orientation="left">数据库操作</Divider>
        <DBTest />
        <AppManage />
    </div>
</template>

<script>
import { Button, Divider, Icon } from 'ant-design-vue';
import DBTest from './components/DBTest';
import AppManage from './components/AppManage';
const iToolBox = window.iToolBox;
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        DBTest,
        AppManage,
    },
    data() {
        return {
            apiVersion: '',
        };
    },
    methods: {
        apiVerAction() {
            this.apiVersion = iToolBox.version;
        },
        async apiNotice() {
            await iToolBox.sysNotice('API 测试', '这个是提示的内容~~~~~');
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
    .desc {
        .font-size();
        color: @text-color;
        text-indent: @font-size * 2;
    }
    .components-list {
        .flex();
        align-items: center;
    }
}
</style>
