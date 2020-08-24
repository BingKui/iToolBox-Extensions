<template>
    <div class="v-db-test">
        <!-- 添加数据 -->
        <Card class="margin-btoom" hoverable title="添加数据">
            <Input class="margin-btoom" v-model="name" placeholder="输入内容进行保存" />
            <Button class="margin-btoom" @click="addItemData">保存</Button>
            <div class="add-result" v-if="addResult">保存结果：{{addResult}}</div>
        </Card>
        <!-- 数据列表 -->
        <Card class="margin-btoom" title="数据列表">
            <Button class="margin-btoom" @click="getAllDataList">获取本地数据列表</Button>
            <Button class="margin-btoom" @click="getAllDataCount">统计总数</Button>
            <List :grid="{ gutter: 15, column: 1 }" :data-source="dbList">
                <ListItem slot="renderItem" slot-scope="item, index" :key="index">
                    {{item.name}}
                    <Button slot="actions" type="danger" @click="() => deleteItemData(item)">删除</Button>
                    <Button slot="actions" type="primary" @click="() => getItemData(item)">获取详情</Button>
                    <Button slot="actions" @click="() => updateItemData(item)">更新信息</Button>
                </ListItem>
            </List>
        </Card>
        <Card v-if="itemDetail" class="margin-btoom" title="单条详情">
            {{itemDetail}}
        </Card>
    </div>
</template>

<script>
import { Button, Divider, Icon, Input, message, Card, List } from 'ant-design-vue';
const DB = window.iToolBox.DB;
const DB_NAME = 'api-db';
export default {
    name: 'DBTest',
    components: {
        Input,
        Button,
        Card,
        List,
        ListItem: List.Item,
    },
    data() {
        return {
            name: '',
            addResult: '',
            dbList: [],
            itemDetail: null,
        };
    },
    async mounted() {
        await this.getAllDataList();
    },
    methods: {
        async addItemData() {
            const res = await DB.addItem(DB_NAME, {
                name: this.name,
            });
            if (res) {
                this.addResult = JSON.stringify(res);
                await this.getAllDataList();
            }
        },
        async getItemData(item) {
            const res = await DB.getItemById(DB_NAME, item._id);
            if (res.code === 200) {
                this.itemDetail = JSON.stringify(res.data);
            }
        },
        async updateItemData(item) {
            const _item = {
                name: `${item.name}-update`
            };
            const res = await DB.updateItemById(DB_NAME, item._id, _item);
            if (res.code === 200) {
                message.success('更新成功');
                await this.getAllDataList();
            }
        },
        async deleteItemData(item) {
            console.log('API => 执行删除', item);
            const res = await DB.deleteItemById(DB_NAME, item._id);
            if (res.code === 200) {
                message.success('删除成功');
                await this.getAllDataList();
            }
        },
        async getAllDataList() {
            const res = await DB.getAllItems(DB_NAME);
            console.log('API => 获取所有数据', res);
            if (res) {
                this.dbList = res.data;
            }
        },
        async getAllDataCount() {
            const res = await DB.getCount(DB_NAME);
            if (res) {
                message.success(`获取统计信息成功：总共${res.data}条数据！`);
            }
        },
    },
};
</script>

<style lang="less">
.v-db-test {
    .margin-btoom {
        .m-b(@gap-md);
    }
}
</style>
