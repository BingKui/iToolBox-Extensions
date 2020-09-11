<template>
    <div class="v-index-page">
        <Collapse v-model="activeKey">
            <CollapsePanel key="base" header="API 基础">
                <Button @click="apiVerAction">获取api版本</Button>
                <div v-if="apiVersion" class="api-version">Api Version: v{{iToolBox.version}}</div>
            </CollapsePanel>
            <CollapsePanel key="notice" header="提醒类">
                <Notice />
            </CollapsePanel>
            <CollapsePanel key="run" header="执行类">
                <Run />
            </CollapsePanel>
            <CollapsePanel key="sys" header="系统类">
                <System />
            </CollapsePanel>
            <CollapsePanel key="screen" header="屏幕类">
                <Screen />
            </CollapsePanel>
            <CollapsePanel key="open" header="打开类操作">
                <Open />
            </CollapsePanel>
            <CollapsePanel key="select" header="选择类">
                <Select />
            </CollapsePanel>
            <CollapsePanel key="copyandpaste" header="复制粘贴类">
                <CopyAndPaste />
            </CollapsePanel>
            <CollapsePanel key="folderandfile" header="文件&文件夹">
                <FolderAndFile />
            </CollapsePanel>
            <CollapsePanel key="db" header="本地数据库">
                <DBTest />
            </CollapsePanel>
            <CollapsePanel key="app" header="App 相关类">
                <AppManage />
            </CollapsePanel>
        </Collapse>
    </div>
</template>

<script>
import { Button, Divider, Icon, Collapse } from 'ant-design-vue';
import Notice from './components/Notice';
import System from './components/System';
import Run from './components/Run';
import Screen from './components/Screen';
import Open from './components/Open';
import Select from './components/Select';
import CopyAndPaste from './components/CopyAndPaste';
import FolderAndFile from './components/FolderAndFile';
import DBTest from './components/DBTest';
import AppManage from './components/AppManage';
const iToolBox = window.iToolBox;
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Collapse,
        CollapsePanel: Collapse.Panel,
        Notice,
        System,
        Run,
        Screen,
        Open,
        Select,
        CopyAndPaste,
        FolderAndFile,
        DBTest,
        AppManage,
    },
    data() {
        return {
            iToolBox,
            apiVersion: '',
            activeKey: [],
        };
    },
    methods: {
        apiVerAction() {
            this.apiVersion = iToolBox.version;
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
    .info {
        word-break: break-all;
    }
}
</style>
