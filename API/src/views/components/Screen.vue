<template>
    <div class="v-screen">
        <Button @click="getMoustPoint">获取鼠标位置</Button>
        <Button @click="getMainDisplay">获取主屏幕</Button>
        <Button @click="getAllDisplay">获取所有屏幕</Button>
        <Button @click="getDisplay">获取{x:100, y:100}最近的屏幕</Button>
        <Button @click="getDisplayRect">获取{x:100, y:100, width: 10, height: 10}最近的屏幕</Button>
        <div class="info" v-if="mousePoint">鼠标位置 => {{mousePoint}}</div>
        <div class="info" v-if="mainInfo">主屏幕 => {{mainInfo}}</div>
        <div class="info" v-if="allInfo">所有屏幕 => {{allInfo}}</div>
        <div class="info" v-if="pointInfo">Point屏幕 => {{pointInfo}}</div>
        <div class="info" v-if="rectInfo">Rect屏幕 => {{rectInfo}}</div>
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import { apiGetMousePoint, apiGetMainDisplay, apiGetAllDisplays, apiGetDisplay, apiGetDisplayRect } from '@common/itoolbox';
export default {
    name: 'Screen', // 屏幕相关
    components: {
        Button,
    },
    data() {
        return {
            mousePoint: null,
            mainInfo: null,
            allInfo: null,
            pointInfo: null,
            rectInfo: null,
        };
    },
    methods: {
        async getMoustPoint() {
            const res = await apiGetMousePoint();
            this.mousePoint = JSON.stringify(res.data);
        },
        async getMainDisplay() {
            const res = await apiGetMainDisplay();
            this.mainInfo = JSON.stringify(res.data);
        },
        async getAllDisplay() {
            const res = await apiGetAllDisplays();
            this.allInfo = JSON.stringify(res.data);
        },
        async getDisplay() {
            const res = await apiGetDisplay(100, 100);
            this.pointInfo = JSON.stringify(res.data);
        },
        async getDisplayRect() {
            const res = await apiGetDisplay(100, 100, 10, 10);
            this.rectInfo = JSON.stringify(res.data);
        },
    },
};
</script>

<style lang="less">

</style>
