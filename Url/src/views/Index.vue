<template>
    <div class="v-index-page">
        <Tabs default-active-key="parse">
            <TabPan key="parse" tab="参数解析">
                <UrlParse />
            </TabPan>
            <TabPan key="enorde" tab="Encode / Decode">
                <EncodeOrDecode />
            </TabPan>
        </Tabs>
    </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import UrlParse from './UrlParse';
import EncodeOrDecode from './EncodeOrDecode';
export default {
    name: 'Index',
    components: {
        Tabs,
        TabPan: Tabs.TabPane,
        UrlParse,
        EncodeOrDecode,
    },
};
</script>

<style lang="less">
.v-index-page {
    .p-h(@gap-md);
}
</style>
