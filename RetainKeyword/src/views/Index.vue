<template>
    <div class="v-index-page">
        <div class="search-el">
            <Input v-model="searchVal" placeholder="输入要查找的关键字" />
        </div>
        <ScrollBar class="container">
            <Row class="group-list" :gutter="15">
                <Col :span="24" class="grounp-title">JavaScript 关键字</Col>
                <template v-if="searchJsList.length > 0">
                    <Col :span="8" v-for="(item, index) in searchJsList" :key="index + 'js'">
                        <KeywordItem :info="item" />
                    </Col>
                </template>
                <template v-else>
                    <Col :span="24">
                        <Empty msg="未找到相应的 JavaScript 关键字" />
                    </Col>
                </template>
                <Col :span="24" class="grounp-title">Window 关键字</Col>
                <template v-if="searchWinList.length > 0">
                    <Col :span="8" v-for="(item, index) in searchWinList" :key="index + 'win'">
                        <KeywordItem :info="item" />
                    </Col>
                </template>
                <template v-else>
                    <Col :span="24">
                        <Empty msg="未找到相应的 Window 关键字" />
                    </Col>
                </template>
                <Col :span="24" class="grounp-title">HTML 事件句柄</Col>
                <template v-if="searchHtmlList.length > 0">
                    <Col :span="8" v-for="(item, index) in searchHtmlList" :key="index + 'html'">
                        <KeywordItem :info="item" />
                    </Col>
                </template>
                <template v-else>
                    <Col :span="24">
                        <Empty msg="未找到相应的 HTML 事件句柄" />
                    </Col>
                </template>
            </Row>
        </ScrollBar>
    </div>
</template>

<script>
import { Button, Divider, Icon, Input, Row, Col } from 'ant-design-vue';
import ScrollBar from '@components/ScrollBar';
import Empty from '@components/Empty';
import KeywordItem from './KeywordItem';
import JS_KEYWORD from '@constants/keyword';
import WIN_KEYWORD from '@constants/window';
import HTML_KEYWORD from '@constants/html';
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Input,
        Row,
        Col,
        Empty,
        ScrollBar,
        KeywordItem,
    },
    data() {
        return {
            searchVal: '',
        };
    },
    computed: {
        searchJsList() {
            if (this.searchVal) {
                return JS_KEYWORD.filter(item => item.value.indexOf(this.searchVal) > -1);
            } else  {
                return JS_KEYWORD;
            }
        },
        searchWinList() {
            if (this.searchVal) {
                return WIN_KEYWORD.filter(item => item.value.indexOf(this.searchVal) > -1);
            } else {
                return WIN_KEYWORD;
            }
        },
        searchHtmlList() {
            if (this.searchVal) {
                return HTML_KEYWORD.filter(item => item.value.indexOf(this.searchVal) > -1);
            } else {
                return HTML_KEYWORD;
            }
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .search-el {
        .p(@gap-md);
        .flex-column-center();
    }
    .container {
        height: calc(100vh - 62px);
        .group-list {
            .p-h(@gap-md);
        }
        .grounp-title {
            font-size: @font-size;
            color: @title-color;
        }
    }
}
@media (prefers-color-scheme: dark) {
    .v-index-page {
        .container {
            .grounp-title {
                color: @dark-title-color;
            }
        }
    }
}
</style>
