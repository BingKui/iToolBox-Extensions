<template>
    <div class="v-select">
        <Button @click="selectFile">选择文件</Button>
        <Button @click="selectFolder">选择文件夹</Button>
        <div class="info" v-if="filePath">选择的文件地址： {{filePath}}</div>
        <div class="info" v-if="folderPath">选择的文件夹地址： {{folderPath}}</div>
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import { apiSelectFile, apiSelectFolder } from '@common/itoolbox';
export default {
    name: 'Select', // 选择类
    components: {
        Button,
    },
    data() {
        return {
            filePath: '',
            folderPath: '',
        };
    },
    methods: {
        async selectFile() {
            const res = await apiSelectFile();
            console.log(res);
            this.filePath = res.success ? res.data : '';
        },
        async selectFolder() {
            const res = await apiSelectFolder();
            this.folderPath = res.success ? res.data : '';
        },
    },
};
</script>

<style lang="less">

</style>
