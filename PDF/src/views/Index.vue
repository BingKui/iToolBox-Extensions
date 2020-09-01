<template>
    <div class="v-index-page">
        <div class="desc">本项目为iView模板项目，主要包含基本的框架。</div>
        <Divider>iView 组件演示</Divider>
        <Button>按钮</Button>
        <Icon type="ios-checkmark" size="30" />
        <PdfView ref="pdfView" @onPdfHeightChange="getPdfHeight" />
        <PdfViewTwo ref="two" />
    </div>
</template>

<script>
import { Button, Icon, Divider } from 'view-design';
import PdfView from './PdfView';
import PdfViewTwo from './PdfViewTwo';
export default {
    name: 'Index',
    components: {
        Button,
        Icon,
        Divider,
        PdfView,
        PdfViewTwo,
    },
    data(){
        return{
            url: 'http://image.uiseed.cn/test.pdf'
            // url: 'http://39.103.131.85:8014/mobile/export/download?code=F1LD5SRRAXRGAC2G'
        };
    },
    mounted(){
        this.$refs.pdfView.initPDF(this.url);
        // this.$refs.two.initView(this.url);
    },
    methods: {
        getPdfHeight() {},
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
}
</style>
