<template>
    <Spin :spinning="loading">
        <div class="v-index-page">
            <div class="search-container">
                <Input v-model="searchVal" @pressEnter="searchNpm" placeholder="输入要搜索的 npm 库" />
            </div>
            <ScrollBar class="npm-list-container">
                <template v-if="list.length > 0">
                    <List :grid="{ gutter: 15, column: 1 }" :dataSource="list">
                        <ListItem slot="renderItem" slot-scope="item, index">
                            <NpmItem :info="item" :key="index" />
                        </ListItem>
                    </List>
                    <div class="next-page-action" v-if="list.length > 0">
                        <Divider class="no-more-divider" v-if="isEndPage">没有更多了</Divider>
                        <Button class="next-page-btn" v-else type="default" @click="getNextPage">下一页</Button>
                    </div>
                </template>
                <template v-else>
                    <Empty msg="暂无相应 npm 库" />
                </template>
            </ScrollBar>
        </div>
    </Spin>
</template>

<script>
import { Button, Divider, Icon, Input, Spin, List } from 'ant-design-vue';
import ScrollBar from '@components/ScrollBar';
import Empty from '@components/Empty';
import NpmItem from './NpmItem';
import { searchLibrary } from '@common/npm';
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Input,
        Spin,
        Empty,
        ScrollBar,
        List,
        ListItem: List.Item,
        NpmItem,
    },
    data() {
        return {
            loading: false,
            searchVal: '',
            list: [],
            page: 1,
            isEndPage: false,
        };
    },
    methods: {
        async searchNpm() {
            this.page = 1;
            await this.getPageNpmList();
        },
        async getNextPage() {
            this.page += 1;
            await this.getPageNpmList();
        },
        async getPageNpmList() {
            this.loading = true;
            const _list = await searchLibrary(this.searchVal, this.page);
            this.list = this.page === 1 ? _list : [...this.list, ..._list];
            this.isEndPage = _list.length < 20;
            this.loading = false;
        },
    },
};

</script>

<style lang="less">
.v-index-page {
    .search-container {
        .p-h(@gap-md);
        height: 60px;
        .flex-row-center();
        input::-webkit-input-placeholder {
            font-size: @font-size-sm;
            color: @disable-color;
        }
    }
    .npm-list-container {
        height: calc(100vh - 62px);
        width: 100%;
        .next-page-action {
            overflow: hidden;
            width: 100%;
            .next-page-btn {
                .m-h(@gap-md);
                .m-b(@gap-lg);
                width: calc(100% - 62px);
            }
        }
    }
    .no-more-divider {
        .p-h(@gap-md);
        .ant-divider-inner-text {
            font-size: @font-size-sm;
            color: @disable-color;
        }
    }
}
</style>
