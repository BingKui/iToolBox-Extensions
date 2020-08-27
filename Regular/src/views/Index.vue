<template>
    <div class="v-index-page">
        <div class="regular-input">
            <Input v-model="regularName" placeholder="输入正则名称" />
        </div>
        <ScrollBar class="regular-container">
            <div class="regular-list">
                <RegularItem v-for="item in regularList" :key="item.title" :itemInfo="item" />
            </div>
        </ScrollBar>
    </div>
</template>

<script>
import { Input } from 'ant-design-vue';
import ScrollBar from '@components/ScrollBar';
import RegularItem from './RegularItem';
import { dealRegularSearch } from '@common/regular';
import { REGULAR_LIST } from '@constants/regular';
export default {
    name: 'Index',
    components: {
        Input,
        ScrollBar,
        RegularItem,
    },
    data() {
        return {
            regularName: '',
        };
    },
    computed: {
        regularList() {
            return dealRegularSearch(REGULAR_LIST, this.regularName);
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .regular-input {
        height: 60px;
        .flex-row-center();
        .p-h(@gap-md);
    }
    .regular-container {
        height: calc(100vh - 60px);
        .regular-list {
            .p-h(@gap-md);
        }
    }
}
</style>
