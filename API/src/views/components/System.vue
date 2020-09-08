<template>
    <div class="v-sys">
        <Button @click="getSysInfo">系统信息</Button>
        <Button @click="getGpuInfo">GPU信息</Button>
        <Button @click="getCpuInfo">CPU信息</Button>
        <Button @click="isMac">是否是mac</Button>
        <Button @click="isWindows">是否是windows</Button>
        <Button @click="isLinux">是否是linux</Button>
        <div class="sys-info" v-if="sysInfo">
            系统信息 => {{sysInfo}}
        </div>
        <div class="sys-info" v-if="gpuInfo">
            GPU => {{gpuInfo}}
        </div>
        <div class="sys-info" v-if="cpuInfo">
            CPU => {{cpuInfo}}
        </div>
    </div>
</template>

<script>
import { Button, Divider, Icon } from 'ant-design-vue';
import { apiGetSysInfo, apiGetGupInfo, apiGetCpuInfo, apiIsMac, apiIsWindows, apiIsLinux } from '@common/itoolbox';
import { Tip } from '@common/tip';
export default {
    name: 'Notice', // 提醒类
    components: {
        Button,
        Divider,
    },
    data() {
        return {
            sysInfo: null,
            gpuInfo: null,
            cpuInfo: null,
        };
    },
    methods: {
        async getSysInfo() {
            const info = await apiGetSysInfo();
            this.sysInfo = JSON.stringify(info.data);
        },
        async getGpuInfo() {
            const info = await apiGetGupInfo();
            this.gpuInfo = JSON.stringify(info.data);
        },
        async getCpuInfo() {
            console.log('获取cpu信息');
            const info = await apiGetCpuInfo();
            this.cpuInfo = JSON.stringify(info.data);
        },
        async isMac() {
            const res = await apiIsMac();
            Tip(`是否是Mac：${res.data}`);
        },
        async isWindows() {
            const res = await apiIsWindows();
            Tip(`是否是Windows：${res.data}`);
        },
        async isLinux() {
            const res = await apiIsLinux();
            Tip(`是否是Linux：${res.data}`);
        },
    },
};
</script>

<style lang="less">
.v-sys {
    .sys-info {
        word-break: break-all;
    }
}
</style>
