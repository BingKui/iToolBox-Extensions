<template>
    <div class="v-keyword-item">
        <div class="item-value">{{info.value}}</div>
        <div class="item-tip-text">{{info.text}}</div>
    </div>
</template>

<script>
export default {
    name: 'KeywordItem', // 单项
    props: {
        info: Object,
    },
};
</script>

<style lang="less">
.v-keyword-item {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .m-v(@gap);
    .p(@gap-md);
    .flex-column();
    justify-content: center;
    border-radius: @border-radius;
    .item-value {
        font-size: @font-size-md;
        font-weight: bold;
        height: 30px;
    }
    .item-tip-text {
        height: 20px;
        color: @tip-color;
    }
}
@media (prefers-color-scheme: dark) {
    .v-keyword-item {
        background-color: @dark-mode-item-background;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
        .item-value {
            color: @dark-title-color;
        }
    }
}
</style>
