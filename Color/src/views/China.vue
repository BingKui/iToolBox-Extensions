<template>
    <div class="v-china-color">
        <Input class="margin-bottom" placeholder="输入颜色名称、色值" v-model="inputVal" />
        <ScrollBar class="china-color-list">
            <Row :gutter="15">
                <Col :span="8" v-for="(item, index) in (searchList.length > 0 ? searchList : colorList)" :key="index">
                    <ColorItem :name="item.name" :value="item.value" />
                </Col>
            </Row>
        </ScrollBar>
    </div>
</template>

<script>
import { Input, Row, Col } from 'ant-design-vue';
import ScrollBar from '@components/ScrollBar';
import ColorItem from './components/ColorItem';
import { CHINA_COLOR_LIST } from '@constants/china';
export default {
    name: 'China', // 中国色
    components: {
        Row,
        Col,
        Input,
        ColorItem,
        ScrollBar,
    },
    data() {
        return {
            inputVal: '',
            colorList: CHINA_COLOR_LIST,
        };
    },
    computed: {
        searchList() {
            return CHINA_COLOR_LIST.filter(item => item.name.indexOf(this.inputVal) > -1 || item.value.indexOf(this.inputVal) > -1);
        },
    },
};
</script>

<style lang="less" scoped>
.v-china-color {
    height: calc(100vh - 82px);
    .china-color-list {
        height: calc(100% - 40px);
    }
}
</style>

