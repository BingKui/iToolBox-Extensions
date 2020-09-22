<template>
    <div class="v-param-item">
        <div class="label">{{label}}</div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ParamItem', // 参数项
    props: {
        label: String
    },
};
</script>

<style lang="less">
.v-param-item {
    .flex();
    align-items: center;
    .m-b(@gap-md);
    .label {
        width: 60px;
        .t-l();
        .m-r(@gap-md);
    }
    .content {
        flex: 1;
    }
}
</style>
