<template>
    <div class="v-transform">
        <Divider size="small" orientation="left">RGB 转 16进制</Divider>
        <div class="v-color-rgb-hex">
            <div class="v-color-convert">
                <Input class="v-color-rgb-item" v-model="rValue" placeholder="0~255" :maxlength="3" />
                <Input class="v-color-rgb-item" v-model="gValue" placeholder="0~255" :maxlength="3" />
                <Input class="v-color-rgb-item" v-model="bValue" placeholder="0~255" :maxlength="3" />
                <Button type="primary" @click="convertRgbToHex">转换</Button>
            </div>
            <div class="v-color-convert-result">
                <div class="color-block" :style="rgbColorBlock"></div>
                <div v-if="rgbToHexValue" class="convert-result-value">
                    <div class="value">{{rgbToHexValue}}</div>
                    <Button type="primary" @click="copyHex">复制</Button>
                </div>
            </div>
        </div>
        <Divider size="small" orientation="left">16进制 转 RGB</Divider>
        <div class="v-color-rgb-hex">
            <div class="v-color-convert">
                <Input class="v-color-hex-item" v-model="hexValue" placeholder="例如：#44abe5、44abe5" :maxlength="7" />
                <Button type="primary" @click="convertHexToRgb">转换</Button>
            </div>
            <div class="v-color-convert-result">
                <div class="color-block" :style="hexColorBlock"></div>
                <div v-if="hexToRgbValue" class="convert-result-value">
                    <div class="value">{{hexToRgbValue}}</div>
                    <Button type="primary" @click="copyRgb">复制</Button>
                </div>
            </div>
        </div>
        <!-- <template v-if="colorHistoryList.length > 0">
            <Divider size="small" orientation="left">历史记录</Divider>
            <div class="v-color-history-list">
                <Row :gutter="10">
                    <Col span="6" v-for="(item, i) in colorHistoryList" :key="i">
                        <ColorHistoryItem :colorInfo="item" @refresh="getColorList" />
                    </Col>
                </Row>
            </div>
        </template> -->
    </div>
</template>

<script>
import { Divider, Input, Button, Card, Row, Col } from 'ant-design-vue';
// import ColorHistoryItem from './components/ColorHistoryItem';
import { rgbToHex, hexToRgb } from '@common/transform';
import { addItem, getAllItems, copyText } from '@common/itoolbox';
import DB_NAME from '@constants/db';
export default {
    name: 'Transform', // 颜色转换
    components: {
        Divider,
        Input,
        Button,
        Card,
        Row,
        Col,
        // ColorHistoryItem,
    },
    data() {
        return {
            rValue: '',
            gValue: '',
            bValue: '',
            rgbToHexValue: '',
            hexValue: '',
            hexToRgbValue: '',
            // colorHistoryList: [],
        };
    },
    computed: {
        rgbColorBlock() {
            const bg = this.rgbToHexValue || '#ccc';
            return `background: ${bg};`;
        },
        hexColorBlock() {
            const bg = this.hexToRgbValue || '#ccc';
            return `background: ${bg};`;
        },
    },
    // async mounted() {
    //     await this.getColorList();
    // },
    methods: {
        // async getColorList() {
        //     this.colorHistoryList = await getAllItems(DB_NAME.transform);
        // },
        convertRgbToHex() {
            this.rgbToHexValue = rgbToHex(this.rValue, this.gValue, this.bValue);
            // this.addColorItem(this.rgbToHexValue, `rgb(${this.rValue}, ${this.gValue}, ${this.bValue})`);
        },
        convertHexToRgb() {
            this.hexToRgbValue = hexToRgb(this.hexValue);
            // this.addColorItem(this.hexValue, this.hexToRgbValue);
        },
        // async addColorItem(hex, rgb) {
        //     await addItem(DB_NAME.transform, {
        //         hex,
        //         rgb,
        //     });
        //     await this.getColorList();
        // },
        copyHex() {
            copyText(this.rgbToHexValue);
        },
        copyRgb() {
            copyText(this.hexToRgbValue);
        },
    },
};
</script>

<style lang="less" scoped>
.v-transform {
    height: calc(100vh - 92px);
    .v-color-rgb-hex {
        .m-b(@gap);
        .v-color-convert {
            .flex();
            .v-color-rgb-item {
                width: 100px;
                .m-r(@gap);
            }
            .v-color-hex-item {
                width: 210px;
                .m-r(@gap);
            }
        }
        .v-color-convert-result {
            .m-t(@gap);
            .flex();
            .color-block {
                height: 100px;
                width: 100px;
            }
            .convert-result-value {
                .m-l(@gap);
                .flex-column();
                div {
                    height: 50%;
                    .flex-column-center();
                }
                .value {
                    .font-size-lg();
                    font-weight: @font-weight-bold;
                }
            }
        }
    }
    .v-color-history-list {
        overflow: hidden;
    }
}
</style>
