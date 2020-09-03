<template>
    <div class="v-lib-theme">
        <ScrollBar class="lib-theme-container">
            <div class="lib-theme-list">
                <template v-for="item in libList">
                    <div class="lib-item" :key="item.libName">
                        <div class="lib-name">{{item.libName}}</div>
                        <div class="lib-main-color">
                            <div class="group-name">主色</div>
                            <div class="color-tip">{{item.mainColorTip}}</div>
                            <Row :gutter="15">
                                <Col span="8" v-for="(mainItem, index) in item.mainColor" :key="index">
                                    <ColorItem :name="mainItem.name" :value="mainItem.value" />
                                </Col>
                            </Row>
                        </div>
                        <div class="lib-assist-color">
                            <div class="group-name">辅助色</div>
                            <div class="color-tip">{{item.assistColorTip}}</div>
                            <Row :gutter="15">
                                <Col span="8" v-for="(assistItem, index) in item.assistColor" :key="index">
                                    <ColorItem :name="assistItem.name" :value="assistItem.value" />
                                </Col>
                            </Row>
                        </div>
                        <div class="lib-neutral-color">
                            <div class="group-name">中性色</div>
                            <div class="color-tip">{{item.neutralColorTip}}</div>
                            <Row :gutter="15">
                                <Col span="8" v-for="(neutralItem, index) in item.neutralColor" :key="index">
                                    <ColorItem :name="neutralItem.name" :value="neutralItem.value" />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </template>
            </div>
        </ScrollBar>
    </div>
</template>

<script>
import { Row, Col } from 'ant-design-vue';
import ScrollBar from '@components/ScrollBar';
import ColorItem from './components/ColorItem';
import { LIBTHEME_LIST } from '@constants/libtheme';
export default {
    name: 'LibTheme', // 三方库主题色
    components: {
        Row,
        Col,
        ScrollBar,
        ColorItem,
    },
    data() {
        return {
            libList: LIBTHEME_LIST,
        };
    },
};
</script>

<style lang="less" scoped>
.v-lib-theme {
    height: calc(100vh - 92px);
    .lib-theme-container {
        height: 100%;
    }
    .lib-theme-list {
        .lib-item {
            .lib-name {
                font-size: 20px;
                color: @black;
                font-weight: 500;
            }
            .group-name {
                font-size: @font-size-md;
                color: @text-color;
            }
            .color-tip {
                font-size: @font-size-sm;
                color: @tip-color;
                .m-v(@gap-sm);
            }
        }
    }
}
</style>
