<template>
    <div class="v-local-qrcode-item">
        <img class="item-img" :src="itemInfo.url" />
        <div class="item-name">{{itemInfo.name}}</div>
        <div class="item-action">
            <Button class="margin-bottom" type="success" @click="openDetailModal">大图</Button>
            <Button type="danger" @click="delQrcodeItem">删除</Button>
        </div>
        <Detail ref="detail" :imgSrc="itemInfo.url" />
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import { TipError, TipSuccess } from '@common/tip';
import { delLocalItem } from '@common/itoolbox';
import Detail from './Detail';
export default {
    name: 'LocalItem', // 本地项
    props: {
        itemInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    components: {
        Button,
        Detail,
    },
    data() {
        return {
            detailValue: '',
        };
    },
    methods: {
        async delQrcodeItem() {
            const { itemInfo } = this.$props;
            const flag = await delLocalItem(itemInfo._id);
            flag ? TipSuccess('删除成功！') : TipError('删除失败！');
            this.$emit('refreshList');
        },
        openDetailModal() {
            this.$refs.detail.open();
        },
    },
};
</script>

<style lang="less" scoped>
.v-local-qrcode-item {
    width: 100%;
    position: relative;
    border-radius: @border-radius;
    overflow: hidden;
    .item-img {
        width: 100%;
    }
    .item-name {
        .text-overflow();
        height: 35px;
        line-height: 35px;
        .t-c();
        font-size: @font-size;
        color: @primary;
        font-weight: bold;
    }
    &:hover{
        .item-action {
            display: flex;
        }
    }
    .item-action {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .flex-column-center();
        display: none;
        background-color: rgba(0, 0, 0, .3);
    }
}
</style>
