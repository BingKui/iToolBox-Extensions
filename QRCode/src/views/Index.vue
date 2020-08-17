<template>
    <div class="v-index-page">
        <div class="create-qrcode">
            <Input v-model="qrcodeValue" type="textarea" :disabled="isCreate" :rows="6" placeholder="输入要生成的文本、网址" />
            <!-- <Divider size="small" orientation="left">二维码</Divider> -->
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
        <Divider orientation="left">本地二维码</Divider>
        <!-- <Button type="primary" @click="openModal">保存二维码</Button>
        <template v-if="qrcodeList.length > 0">
            <Row class="local-qrcode-list" gutter="10">
                <Col :span="8" class="qrcode-item" v-for="item in qrcodeList" :key="item._id">
                    <img class="item-img" :src="item.url" />
                    <div class="item-name">{{item.name}}</div>
                    <div class="item-del">
                        <Button type="success" @click="() => openDetailModal(item.url, item.name)">大图</Button>
                        <Button type="error" @click="() => delQrcodeItem(item._id)">删除</Button>
                    </div>
                </Col>
            </Row>
        </template> -->
        <!-- <Modal v-model="addModal" title="保存二维码" ok-text="保存" @ok="addQrcodeItem">
            <Input v-model="qrcodeName" autofocus placeholder="输入二维码名字" :maxlength="10" @on-enter="addQrcodeItem" />
        </Modal>
        <Modal v-model="detailModal" class-name="detail-modal" :footer-hide="true" :width="480">
            <img class="detail-img" :src="detailValue" />
            <div class="detail-name">{{detailName}}</div>
        </Modal> -->
        <SaveItem ref="save" :codeValue="qrcodeValue" @refreshList="getHistoryList" />
    </div>
</template>

<script>
import { Button, Divider, Icon, Input, Modal } from 'ant-design-vue';
import { TipError, TipSuccess } from '@common/tip';
import QRCode from 'qrcode';
import LOGO from '@assets/logo.png';
import SaveItem from './SaveItem';

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
    },
    data() {
        return {
            logo: LOGO,
            qrcodeValue: '',
            isCreate: false,
            qrcodeList: [],
            // addModal: false,
            // qrcodeName: '',
            // detailModal: false,
            // detailValue: '',
            // detailName: '',
        };
    },
    mounted() {
        this.qrcodeValue && this.createQrcode();
        this.getHistoryList();
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
        openModal() {
            this.addModal = true;
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
        async delQrcodeItem(id) {
            await iToolBox.DB.delItem(DB_NAME, id);
            await this.getHistoryList();
        },
        openDetailModal(val, name) {
            this.detailValue = val;
            this.detailName = name;
            this.detailModal = true;
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
