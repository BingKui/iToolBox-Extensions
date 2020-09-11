<template>
    <div class="v-run">
        <Input type="textarea" :rows="3" v-model="command" placeholder="输入要执行的命令" />
        <Button class="margin-top margin-bottom" type="primary" @click="runCommand">执行命令</Button>
        <div class="info" v-if="commandResult">{{commandResult}}</div>
        <div class="request-container">
            <div class="request-param">
                <div class="label">地址(url)</div>
                <div class="value">
                    <Input v-model="url" placeholder="输入请求地址" />
                </div>
            </div>
            <div class="request-param">
                <div class="label">参数(param)</div>
                <div class="value">
                    <Input v-model="param" type="textarea" :rows="4" placeholder="输入参数对象" />
                </div>
            </div>
            <div class="request-param">
                <div class="label">请求类型(method)</div>
                <div class="value">
                    <Select v-model="method" placehoder="选择请求方式">
                        <Option value="get">GET</Option>
                        <Option value="post">POST</Option>
                        <Option value="delete">DELETE</Option>
                        <Option value="put">PUT</Option>
                    </Select>
                </div>
            </div>
            <div class="request-param">
                <div class="label">请求头(headers)</div>
                <div class="value">
                    <Input v-model="headers" type="textarea" :rows="4" placeholder="输入请求头对象" />
                </div>
            </div>
        </div>
        <Button class="margin-top margin-bottom" type="primary" @click="runRequest">发送请求</Button>
        <div class="info" v-if="requestResult">{{requestResult}}</div>
    </div>
</template>

<script>
import { Button, Input, Select } from 'ant-design-vue';
import { apiCommand, apiRequest } from '@common/itoolbox';
export default {
    name: 'Run', // 执行类
    components: {
        Button,
        Input,
        Select,
        Option: Select.Option,
    },
    data() {
        return {
            command: '',
            commandResult: '',
            url: '',
            param: '',
            method: 'get',
            headers: '',
            requestResult: '',
        };
    },
    methods: {
        async runCommand() {
            const res = await apiCommand(this.command);
            console.log(res);
            this.commandResult = res;
        },
        async runRequest() {
            const res = await apiRequest({
                url: this.url,
                param: this.param ? JSON.parse(this.param) : {},
                method: this.method,
                headers: this.headers ? JSON.parse(this.headers) : {},
            });
            console.log(res);
            this.requestResult = JSON.stringify(res);
        },
    },
};
</script>

<style lang="less">
.v-run {
    .request-container {
        .request-param {
            .flex();
            .m-b(@gap);
            .label {
                display: block;
                width: 140px;
            }
            .value {
                flex: 1;
            }
        }
    }
}
</style>
