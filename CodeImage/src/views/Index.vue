<template>
    <div class="v-index-page">
        <!-- <div class="desc">本项目为iView模板项目，主要包含基本的框架。</div>
        <Divider>iView 组件演示</Divider>
        <Button>按钮</Button>
        <Icon type="ios-checkmark" size="30" /> -->
        <div id="code-editor">
            <div class="header"></div>
            <VueCodeHighlight :lang="type">
                <pre>{{ code }}</pre>
            </VueCodeHighlight>
        </div>
    </div>
</template>

<script>
import { Button, Icon, Divider } from 'view-design';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import 'vue-code-highlight/themes/duotone-sea.css';
export default {
    name: 'Index',
    components: {
        Button,
        Icon,
        Divider,
        VueCodeHighlight,
    },
    data() {
        return {
            type: 'text',
            code: 'code',
        };
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
