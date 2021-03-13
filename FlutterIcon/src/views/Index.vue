<template>
    <div class="v-index-page">
        <Divider orientation="left">命名</Divider>
        <div class="">
            <Input placeholder="输入字体文件命名" v-model="fontFamily" />
        </div>
        <Divider orientation="left">选择IconFont</Divider>
        <div class="desc">选择从 iconfont 下载的文件中的 iconfont.json 文件。</div>
        <Button type="primary" @click="selectJsonFile">选择JSON文件</Button>
        <Divider orientation="left">生成结果</Divider>
        <Button @click="copyResult">复制代码</Button>
        <div v-highlight>
            <pre>
                <code v-html="resultValue"></code>
            </pre>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button, Divider, Icon, Input } from 'ant-design-vue';
import { apiSelectFile, apiGetFileContent, apiCopyText } from '@common/itoolbox';
import { dealJsonFile, createDartClass } from '@biz/file';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css'; //样式文件

Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() =>{
        blocks.forEach((block)=>{
            hljs.highlightBlock(block);
        });
    }, 200);
});
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
        Input,
    },
    data() {
        return {
            fontFamily: 'fontFamily',
            resultValue: '',
        };
    },
    methods: {
        fontFamilyChange(e) {
            console.log(e);
            console.log(this.fontFamily);
        },
        async selectJsonFile() {
            const filePath = await apiSelectFile();
            const fileContent = await apiGetFileContent(filePath.data);
            console.log('获取的内容', fileContent);
            const list = dealJsonFile(fileContent.data);
            console.log('list =>', list);
            this.resultValue = createDartClass(list, this.fontFamily);
        },
        copyResult() {
            apiCopyText(this.resultValue);
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
}
</style>
