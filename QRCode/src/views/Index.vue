<template>
    <div class="v-index-page">
        <div class="create-qrcode">
            <Input v-model="qrcodeValue" type="textarea" :disabled="isCreate" :rows="6" placeholder="输入要生成的文本、网址" />
            <div class="qrcode-value">
                <canvas id="qrcode"></canvas>
                <img v-if="!isCreate" class="logo-img" :src="logo" alt="">
            </div>
        </div>
        <Button v-if="!isCreate" type="primary" @click="createQrcode">生成</Button>
        <template v-if="isCreate">
            <Button type="primary" @click="recreateQrcode">重新生成</Button>
            <Button type="primary" @click="saveQrcode">保存</Button>
        </template>
        <template v-if="qrcodeList.length > 0">
            <Divider orientation="left">本地二维码</Divider>
            <Row :gutter="10">
                <Col v-for="(item, index) in qrcodeList" :span="8" :key="index">
                    <LocalItem :itemInfo="item" @refreshList="getHistoryList" />
                </Col>
            </Row>
        </template>
        <SaveItem ref="save" :codeValue="qrcodeValue" @refreshList="getHistoryList" />
    </div>
</template>

<script>
import { Button, Divider, Icon, Input, Modal, List, Row, Col } from 'ant-design-vue';
import { TipError, TipSuccess } from '@common/tip';
import QRCode from 'qrcode';
import LOGO from '@assets/logo.png';
import SaveItem from './SaveItem';
import LocalItem from './LocalItem';

const iToolBox = window.iToolBox || {};
const DB_NAME= 'qrcode';
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Input,
        Modal,
        SaveItem,
        LocalItem,
        Row,
        Col,
    },
    data() {
        return {
            logo: LOGO,
            qrcodeValue: '',
            isCreate: false,
            qrcodeList: [],
        };
    },
    created() {
        setTimeout(async () => {
            await this.getHistoryList();
        }, 1000);
    },
    methods: {
        createQrcode() {
            const _this = this;
            const canvas = document.querySelector('#qrcode');
            if (!this.qrcodeValue) {
                TipError('内容不能为空');
                return;
            }
            if (canvas) {
                QRCode.toCanvas(canvas, this.qrcodeValue, {
                    errorCorrectionLevel: 'L',
                    margin: 1,
                    width: 280,
                }, function(err) {
                    if (err) _this.isCreate = false;
                    TipSuccess('生成二维码成功！');
                    _this.isCreate = true;
                });
            }
        },
        recreateQrcode() {
            this.isCreate = false;
            const canvas = document.querySelector('#qrcode');
            const cxt = canvas.getContext('2d');
            cxt.clearRect(0, 0, canvas.width, canvas.height);
        },
        // 保存二维码
        saveQrcode() {
            this.$refs.save.open();
        },
        async getHistoryList() {
            const res = await iToolBox.DB.getAllItems(DB_NAME);
            console.log('获取的结果：', res);
            this.qrcodeList = res.success ? res.data : '';
        },
        async addQrcodeItem() {
            if (!this.qrcodeName) {
                TipError('名字不能为空');
                return;
            }
            const url = await QRCode.toDataURL(this.qrcodeValue, {
                errorCorrectionLevel: 'H',
                margin: 1,
                width: 280,
            });
            const res = await iToolBox.DB.addItem(DB_NAME, {
                name: this.qrcodeName || this.qrcodeValue,
                url,
            });
            console.log('保存结果：', res);
            this.addModal = false;
            this.qrcodeName = '';
            await this.getHistoryList();
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
    .qrcode-value {
        .flex-column-center();
        height: 280px;
        position: relative;
        .logo-img {
            position: absolute;
            width: 128px;
            height: 128px;
        }
    }
    #canvas {
        display: block;
        height: 280px;
    }
}
</style>
