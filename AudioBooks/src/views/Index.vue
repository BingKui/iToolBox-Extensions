<template>
    <div class="v-index-page">
        <Divider orientation="left">读物列表</Divider>
        <Button @click="openAddModal">添加读物</Button>
        <HalfModal ref="modal" title="添加读物" :isHaveCancel="true" okText="添加" @ok="addAudioItem">
            <Input class="audio-name" placeholder="输入名称" :value="name" />
            <TextArea class="audio-value" placeholder="输入地址" :rows="6" :value="value" />
        </HalfModal>
    </div>
</template>

<script>
import { Button, Divider, Icon, Input } from 'ant-design-vue';
import HalfModal from '../components/HalfModal';
const { addItemData, getAllDataList } = require('../common/itoolbox');
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Input,
        TextArea: Input.TextArea,
        HalfModal,
    },
    data() {
        return {
            name: '',
            value: '',
        };
    },
    methods: {
        openAddModal () {
            this.$refs.modal.open();
        },
        addAudioItem () {
            console.log(this.name);
            console.log(this.value);
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
    .audio-value {
        margin-top: @gap;
    }
}
</style>
