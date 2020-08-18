<template>
    <Drawer
        :title="title"
        placement="bottom"
        :wrapClassName="`half-modal ${extClass}`"
        :closable="false"
        :maskClosable="false"
        :visible="visible"
        :height="title ? height + 55 : height"
        :drawerStyle="{backgroundColor: '#EAEBEC'}"
        @close="close"
    >
        <div class="half-modal-content" :style="halfContentStyle">
            <slot></slot>
        </div>
        <div class="half-modal-bottom">
            <template v-if="isHaveCancel">
                <div class="btn-list">
                    <Button class="btn-item" :type="cancelType" size="large" @click="cancelAction">{{cancelText}}</Button>
                    <Button class="btn-item margin-left" :type="okType" size="large" @click="okAction">{{okText}}</Button>
                </div>
            </template>
            <template v-else>
                <Button block :type="btnType" size="large" @click="btnAction">{{btnText}}</Button>
            </template>
        </div>
    </Drawer>
</template>

<script>
import { Drawer, Icon, Row, Col, Button } from 'ant-design-vue';
export default {
    name: 'HalfModal', // 弹框
    props: {
        title: String,
        extClass: {
            type: String,
            default: '',
        },
        height: {
            type: Number,
            default: 310,
        },
        btnText: {
            type: String,
            default: '关闭',
        },
        btnType: {
            type: String,
            default: 'default',
        },
        okText: {
            type: String,
            default: '确定',
        },
        okType: {
            type: String,
            default: 'primary',
        },
        isHaveCancel: {
            type: Boolean,
            default: false,
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        cancelType: {
            type: String,
            default: 'default',
        },
    },
    components: {
        Drawer,
        Button,
    },
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        halfContentStyle() {
            const { height } = this.$props;
            return {
                height: `${height - 70}px`,
            };
        },
    },
    methods: {
        open() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
        btnAction() {
            this.$emit('btnAction');
            this.close();
        },
        okAction() {
            this.$emit('ok');
            this.close();
        },
        cancelAction() {
            this.$emit('cancel');
            this.close();
        },
    },
};
</script>

<style lang="less">
@half-bg: #EAEBEC;
.half-modal {
    .ant-drawer-header {
        background-color: @half-bg;
        .border-line();
    }
    .ant-drawer-content {
        overflow: hidden;
        border-top-left-radius: @gap-md;
        border-top-right-radius: @gap-md;
    }
    .ant-drawer-body {
        .p(0);
    }
    .half-modal-content {
        .p(@gap-md);
    }
    .margin-left {
        margin-left: @gap-md;
    }
    .half-modal-bottom {
        height: 70px;
        display: flex;
        align-items: center;
        .p-h(@gap-md);
        .btn-list {
            width: 100%;
            .flex-row-center();
            .btn-item {
                flex: 1;
            }
        }
    }
}
</style>
