<template>
    <HalfModal
        title="保存"
        ref="save"
        extClass="save-modal"
        :height="130"
        :isHaveCancel="true"
        okText="保存"
        @ok="addData"
    >
        <Input v-model="name" placeholder="输入二维码名字" :maxlength="10" @pressEnter="addData" />
    </HalfModal>
</template>

<script>
import { Input } from 'ant-design-vue';
import HalfModal from '@components/HalfModal';
import { TipError, TipSuccess } from '@common/tip';
import QRCode from 'qrcode';
import { addLocalItem } from '@common/itoolbox';
export default {
    name: 'SaveItem', // 保存单项
    props: {
        codeValue: {
            type: String,
            default: '',
        },
    },
    components: {
        Input,
        HalfModal,
    },
    data() {
        return {
            name: '',
        };
    },
    methods: {
        open() {
            this.$refs.save.open();
        },
        close() {
            this.$refs.save.close();
            Object.assign(this.$data, this.$options.data());
        },
        async addData() {
            if (!this.name) {
                TipError('名字不能为空');
                return;
            }
            const { codeValue } = this.$props;
            const url = await QRCode.toDataURL(codeValue, {
                errorCorrectionLevel: 'H',
                margin: 1,
                width: 280,
            });
            const flag = await addLocalItem({
                name: this.name,
                url,
            });
            TipSuccess(flag ? '保存成功！' : '保存失败！');
            this.$emit('refreshList');
        },
    },
};
</script>

<style lang="less">
.save-modal {

}
</style>
