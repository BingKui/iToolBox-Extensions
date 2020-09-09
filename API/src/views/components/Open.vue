<template>
    <div class="v-open">
        <!-- <Divider orientation="left">打开链接</Divider> -->
        <Input v-model="url" placeholder="输入要打开的链接" />
        <Button class="margin-top margin-bottom" @click="openUrl">打开链接</Button>
        <Input v-model="filePath" placeholder="输入要打开的文件地址" />
        <Button class="margin-top margin-bottom" @click="openFile">打开文件</Button>
        <Input v-model="folderPath" placeholder="输入要打开的目录地址" />
        <Button class="margin-top margin-bottom" @click="openFolder">打开文件夹</Button>
        <Input v-model="filePathManage" placeholder="输入要查看的文件地址" />
        <Button class="margin-top margin-bottom" @click="showFileInManage">管理器展示文件</Button>
    </div>
</template>

<script>
import { Button, Input, Divider } from 'ant-design-vue';
import { apiOpenUrl, apiOpenFile, apiOpenFolder, apiShowFileInManage } from '@common/itoolbox';
export default {
    name: 'Open', // 打开类操作
    components: {
        Button,
        Input,
        Divider,
    },
    data() {
        return {
            url: '',
            filePath: '',
            folderPath: '',
            filePathManage: '',
        };
    },
    methods: {
        async openUrl() {
            await apiOpenUrl(this.url);
        },
        async openFile() {
            await apiOpenFile(this.filePath);
        },
        async openFolder() {
            await apiOpenFolder(this.folderPath);
        },
        async showFileInManage() {
            await apiShowFileInManage(this.filePathManage);
        },
    },
};
</script>

<style lang="less">

</style>
