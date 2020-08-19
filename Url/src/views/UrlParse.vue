<template>
    <div class="v-url-parse">
        <Input v-model="value" type="textarea" rows="5" placeholder="输入需要解析的 url 链接" />
        <Button class="parse-btn" type="primary" @click="parse">解析</Button>
        Decode <a-switch v-model="isDecode" @change="changeEncodeFlag" />
        <div v-if="resultList.length > 0" class="parse-result">
            <Divider size="small" orientation="left">域名</Divider>
            <div class="url-value">{{urlValue}}</div>
            <Divider size="small" orientation="left">参数列表</Divider>
            <div class="parse-result-list">
                <div class="parse-item" v-for="item in resultList" :key="item.name">
                    <div class="item-name">{{item.name}}</div>
                    <div class="item-val">{{item.val}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Input, Divider, Button, Switch } from 'ant-design-vue';
import { TipError, TipSuccess } from '@common/tip';
export default {
    name: 'UrlParse', // url 解析
    components: {
        Input,
        Divider,
        Button,
        'a-switch': Switch,
    },
    data() {
        return {
            value: '',
            urlValue: '',
            resultList: [],
            isDecode: false,
        };
    },
    watch: {
        value(val) {
            if (!val) {
                this.urlValue = '';
                this.resultList = [];
            }
        },
    },
    methods: {
        parse() {
            if (this.urlReg()) {
                const _val = this.isDecode ? decodeURIComponent(this.value) : this.value;
                let result = [];
                this.urlValue = _val.split('?')[0];
                const values = _val.split('?')[1];
                if (values) {
                    const arr = values.split('&');
                    arr.forEach(item => {
                        const name = item.split('=')[0];
                        const val = item.split('=')[1];
                        result.push({
                            name,
                            val,
                        });
                    });
                    this.resultList = result;
                    TipSuccess('参数解析成功！');
                }
            }
        },
        urlReg() {
            const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g;
            const flag = reg.test(this.value);
            if (!flag) {
                TipError('不是正确的url地址');
            }
            return flag;
        },
        changeEncodeFlag(flag) {
            this.isDecode = flag;
        },
    },
};
</script>

<style lang="less">
.v-url-parse {
    .font-size();
    .parse-btn {
        .m-t(@gap);
    }
    .parse-result-list {
        .parse-item {
            .flex();
            .m-v(@gap-sm);
            .item-name {
                .m-r(@gap);
                font-weight: bold;
                width: 80px;
                text-align: left;
                word-break: break-all;
                color: @primary;
            }
            .item-val {
                flex: 1;
                word-break: break-all;
            }
        }
    }
}
</style>
