<template>
    <div class="v-color-item">
        <div class="item-content">
            <div class="color-name">{{name}}</div>
            <div class="color-value">{{value}}</div>
        </div>
        <div :class="`item-color-demo ${isWhite ? 'white' : ''} ${isTransparent ? 'transparent' : ''} ${isBlack ? 'black' : ''}`" title="点击复制" @click="copyColorValue" :style="{ backgroundColor: `${value}` }"></div>
    </div>
</template>

<script>
import { copyText } from '@common/itoolbox';
import { TipSuccess, TipError } from '@common/tip';
export default {
    name: 'ColorItem', // 颜色项
    props: {
        name: String,
        value: String,
    },
    methods: {
        async copyColorValue() {
            const flag = await copyText(this.$props.value.toLocaleLowerCase());
            if (flag) {
                TipSuccess('复制成功');
            } else {
                TipError('复制失败');
            }
        },
    },
    computed: {
        isWhite() {
            const { value } = this.$props;
            const val = value.toLocaleLowerCase();
            if (val === '#ffffff') {
                return true;
            }
            return false;
        },
        isTransparent() {
            const { value } = this.$props;
            const val = value.toLocaleLowerCase();
            if (val === 'transparent') {
                return true;
            }
            return false;
        },
        isBlack() {
            const { value } = this.$props;
            const val = value.toLocaleLowerCase();
            if (val === '#000000') {
                return true;
            }
            return false;
        },
    },
};
</script>

<style lang="less" scoped>
.v-color-item {
    .flex();
    height: 80px;
    .m-b(@gap);
    // .m(@gap-sm);
    // overflow: hidden;
    // box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    .item-content {
        border-top-left-radius: @border-radius;
        border-bottom-left-radius: @border-radius;
        border: @border;
        border-right: none;
        flex: 1;
        .flex-column();
        justify-content: center;
        .p-l(@gap-md);
        .color-name {
            font-size: @font-size-md;
            font-weight: 500;
        }
        .color-value {
            font-size: @font-size;
            color: @tip-color;
        }
    }
    .item-color-demo {
        width: 80px;
        height: 80px;
        border-top-right-radius: @border-radius;
        border-bottom-right-radius: @border-radius;
        cursor: pointer;
        &.white {
            border: 1px solid @border-color;
        }
        &.transparent {
            border: 1px solid @error;
            position: relative;
            &::after {
                height: 1px;
                width: 107px;
                content: '';
                background-color: @error;
                position: absolute;
                transform: rotate(-45deg);
                top: 50%;
                left: -15px;
            }
        }
    }
}
</style>
