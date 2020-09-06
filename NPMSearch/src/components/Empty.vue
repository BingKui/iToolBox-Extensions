<template>
    <div class="v-empty">
        <Icon type="alert" style="fontSize:30px;" />
        <div class="empty-msg">{{msg}}</div>
    </div>
</template>

<script>
import { Icon } from 'ant-design-vue';
export default {
    name: 'Empty', // 空
    components: {
        Icon,
    },
    props: {
        msg: {
            type: String,
            default: '暂无数据',
        }
    },
};
</script>

<style lang="less" scoped>
.v-empty {
    width: 100%;
    height: 100px;
    .flex-column-center();
    .anticon {
        color: @disable-color;
    }
    .empty-msg {
        .m-t(@gap);
        color: @disable-color;
        font-size: @font-size-sm;
    }
}
@media (prefers-color-scheme: dark) {
    .v-empty {
        .anticon,
        .empty-msg {
            color: @gray-darker;
        }
    }
}
</style>
