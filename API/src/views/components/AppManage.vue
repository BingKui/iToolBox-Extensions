<template>
    <div class="v-app-manage">
        <Button @click="getAppListData">获取APP列表</Button>
        <Button @click="updateAppListData">更新app数据</Button>
        <Row :gutter="15">
            <Col :span="8" v-for="(item, index) in applist" :key="index">
                <Card class="app-item">
                    <img class="app-icon" :src="item.icon" />
                    <div class="app-name">{{item.displayName || item.name}}</div>
                    <div class="action">
                        <Button size="small" type="primary" @click="() => openApp(item)">打开</Button>
                        <Button size="small" type="danger" @click="() => delApp(item)">删除</Button>
                        <Button size="small" type="danger" @click="() => delAppData(item)">删除数据</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { Card, Button, Avatar, Row, Col, message } from 'ant-design-vue';
const iToolBox = window.iToolBox;
export default {
    name: 'AppManage', // app 管理
    components: {
        Card,
        Button,
        Avatar,
        Row,
        Col,
    },
    data() {
        return {
            applist: [],
        };
    },
    methods: {
        async getAppListData() {
            const res = await iToolBox.getAllApp();
            this.applist = res.success ? res.data : [];
        },
        async updateAppListData() {
            const res = await iToolBox.refreshAppList();
            if (res.success) {
                message.success('更新成功');
                await this.getAppListData();
            } else {
                message.error('更新失败');
            }
        },
        async openApp(item) {
            console.log('open app data', item);
            const res = await iToolBox.openApp(item.id);
            if (res.success) {
                message.success(`${item.displayName || item.name}打开成功！`);
            }
        },
        async delApp(item) {
            console.log('删除app', item);
            const res = await iToolBox.deleteApp(item.id);
            if(res.success) {
                message.success(`删除${item.displayName || item.name}成功`);
            } else {
                message.error(`删除${item.displayName || item.name}失败`);
            }
        },
        async delAppData(item) {
            console.log('删除app data', item);
            const res = await iToolBox.deleteAppData(item.id);
            if(res.success) {
                message.success(`删除${item.displayName || item.name}数据成功`);
            } else {
                message.error(`删除${item.displayName || item.name}数据失败`);
            }
        },
    },
};
</script>

<style lang="less">
.v-app-manage {
    .app-item {
        height: 160px;
        .m-t(@gap-md);
        .ant-card-body {
            .flex-column-center();
        }
        .app-icon {
            width: 60px;
            height: 60px;
        }
        .app-name {
            width: 100px;
            .t-c();
            .text-overflow();
            flex: 1;
        }
        .action {
            height: 50px;
            .flex();
        }
    }
}
</style>
