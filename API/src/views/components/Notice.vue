<template>
    <div>
        <Button @click="notice">系统提醒</Button>
        <Button @click="noticeUrl">系统提醒，带链接</Button>
        <Button @click="beep">系统提醒</Button>
    </div>
</template>

<script>
import { Button, Divider, Icon } from 'ant-design-vue';
import { apiNotice, apiBeep } from '@common/itoolbox';
export default {
    name: 'Notice', // 提醒类
    components: {
        Button,
        Divider,
    },
    methods: {
        async notice() {
            await apiNotice('API Notice 测试', '这个是提示的内容~~~~~');
        },
        async noticeUrl() {
            await apiNotice('API Notice 测试', '这个是提示的内容~~~~~', 'https://uiseed.cn');
        },
        async beep() {
            await apiBeep();
        },
    },
};
</script>

<style lang="less">

</style>
