<template>
    <div class="v-index-page">
        <div class="param-list">
            <ParamItem label="AppId">
                <Input v-model="appid" placeholder="小程序appid" />
            </ParamItem>
            <ParamItem label="Secret">
                <Input v-model="secret" placeholder="小程序appid" />
            </ParamItem>
            <ParamItem label="Path">
                <Input v-model="path" placeholder="页面路径，pages/index/index" />
            </ParamItem>
            <ParamItem label="Params">
                <Input type="textarea" :rows="4" v-model="params" maxlength="32" placeholder="页面参数, code=123&key=ksic" />
            </ParamItem>
        </div>
        <Button @click="createMiniCode" type="primary">生成小程序码</Button>
        <div class="mini-code-value">
            <img class="mini-code-img" v-if="imgSrc" :src="imgSrc" alt="">
        </div>
        <Button v-if="buffer" @click="saveMiniCode" type="primary">保存小程序码</Button>
    </div>
</template>

<script>
import { Button, Divider, Icon, Input, Form } from 'ant-design-vue';
import ParamItem from './ParamItem';
import { apiRequest, apiSaveFile, apiArrayBufferToBase64 } from '@common/itoolbox';
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Input,
        Form,
        FormItem: Form.Item,
        ParamItem,
    },
    data() {
        return {
            appid: 'wx943aa5702a72d768',
            secret: '2d556a3b13db9cefb657642be25ca51c',
            path: '',
            params: 'code=1111',
            imgSrc: '',
            buffer: '',
        };
    },
    methods: {
        async createMiniCode() {
            let token = '';
            console.log(window.iToolBox);
            if (this.appid && this.secret) {
                const res = await apiRequest({
                    url: 'https://api.weixin.qq.com/cgi-bin/token',
                    method: 'get',
                    param: {
                        grant_type: 'client_credential',
                        appid: this.appid,
                        secret: this.secret,
                    },
                });
                console.log('结果', res);
                res.success ? token = res.data.access_token || '' : '';
            } else {
                return;
            }
            if (token) {
                const codeRes = await apiRequest({
                    url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`,
                    method: 'post',
                    param: {
                        scene: this.params,
                        path: this.path,
                    },
                    other: {
                        responseType: 'arraybuffer',
                    },
                });
                const buffer = codeRes.data;
                const res = await apiArrayBufferToBase64(buffer);
                if (res.success) {
                    this.buffer = buffer;
                    this.imgSrc = `data:image/jpeg;base64,${res.data}`;
                }
            }
        },
        async saveMiniCode() {
            const flag = await apiSaveFile('minicode.png', this.buffer);
            if (flag) {
                console.log('保存成功');
            }
        },
    },
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
    .desc {
        .font-size();
        color: @text-color;
        text-indent: @font-size * 2;
    }
    .components-list {
        .flex();
        align-items: center;
    }
    .mini-code-value {
        .flex-center();
    }
}
</style>
