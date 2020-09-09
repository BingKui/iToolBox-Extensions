<template>
    <div>
        <Input v-model="folder" placeholder="输入想要获取内容的文件夹地址" />
        <Button class="margin-top margin-bottom" @click="getFolderContent">获取文件夹内容</Button>
        <div class="info" v-if="folderContent">{{folderContent}}</div>
        <Input v-model="filePath" placeholder="输入想要获取内容的文件地址" />
        <Button class="margin-top margin-bottom" @click="getFileContent">获取文件内容</Button>
        <div class="info" v-if="fileContent">{{fileContent}}</div>
        <Input v-model="delFilePath" placeholder="删除文件地址" />
        <Button class="margin-top margin-bottom" @click="deleteFile" type="danger">删除文件</Button>
        <Input v-model="trashFilePath" placeholder="移入回收站文件地址" />
        <Button class="margin-top margin-bottom" @click="trashFile">移入回收站</Button>
        <Input v-model="delFolderPath" placeholder="删除文件夹地址" />
        <Button class="margin-top margin-bottom" @click="deleteFolder" type="danger">删除文件夹</Button>
        <Input v-model="trashFolderPath" placeholder="移入回收站文件夹地址" />
        <Button class="margin-top margin-bottom" @click="trashFolder">移入回收站</Button>
    </div>
</template>

<script>
import { Button, Input } from 'ant-design-vue';
import { apiGetFolderContent, apiGetFileContent, apiDeleteFile, apiDeleteFolder, apiTrashFile, apiTrashFolder } from '@common/itoolbox';
import { TipSuccess, TipError } from '@common/tip';
export default {
    name: 'FolderAndFile', // 文件&文件夹相关
    components: {
        Button,
        Input,
    },
    data() {
        return {
            folder: '',
            folderContent: '',
            filePath: '',
            fileContent: '',
            delFilePath: '',
            trashFilePath: '',
            delFolderPath: '',
            trashFolderPath: ''
        };
    },
    methods: {
        async getFolderContent() {
            const res = await apiGetFolderContent(this.folder);
            if (res.success) {
                this.folderContent = JSON.stringify(res.data);
            }
        },
        async getFileContent() {
            const res = await apiGetFileContent(this.filePath);
            if (res.success) {
                this.fileContent = JSON.stringify(res.data);
            }
        },
        async deleteFile() {
            const res = await apiDeleteFile(this.delFilePath);
            if (res.success) {
                TipSuccess('删除成功！');
            }
        },
        async trashFile() {
            const res = await apiTrashFile(this.trashFilePath);
            if (res.success) {
                TipSuccess('删除成功！');
            }
        },
        async deleteFolder() {
            const res = await apiDeleteFolder(this.delFolderPath);
            if (res.success) {
                TipSuccess('删除成功！');
            }
        },
        async trashFolder() {
            const res = await apiTrashFolder(this.trashFolderPath);
            if (res.success) {
                TipSuccess('删除成功！');
            }
        },
    },
};
</script>

<style lang="less">

</style>
