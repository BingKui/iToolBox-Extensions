<template>
    <HalfModal
        title=""
        ref="detail"
        extClass="detail-modal"
        :height="510"
        okText="关闭"
    >
        <div class="detail-content">
            <img class="detail-img" :src="imgSrc" alt="详情">
        </div>
    </HalfModal>
</template>

<script>
import HalfModal from '@components/HalfModal';
export default {
    name: 'Detail', // 详情
    props: {
        imgSrc: {
            type: String,
            default: '',
        },
    },
    components: {
        HalfModal,
    },
    methods: {
        open() {
            this.$refs.detail.open();
        },
        close() {
            this.$refs.detail.close();
        },
    },
};
</script>

<style lang="less">
.detail-modal {
    .detail-content {
        .flex-column-center();
        .p-v(30);
    }
    .detail-img {
        width: 380px;
        height: 380px;
        margin: 0 auto;
    }
}
</style>
