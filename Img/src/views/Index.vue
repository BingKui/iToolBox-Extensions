<template>
    <div class="v-index-page">
        <Tabs default-active-key="encode">
            <TabPan key="encode" tab="图片转Base64">
                <ImgToBase64 />
            </TabPan>
            <TabPan key="encodeurl" tab="图片Url转Base64">
                <ImgUrlToBase64 />
            </TabPan>
            <!-- <TabPan key="decode" tab="Base64转图片">
                <Base64ToImage />
            </TabPan> -->
        </Tabs>
    </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import ImgToBase64 from './ImgToBase64';
import ImgUrlToBase64 from './ImgUrlToBase64';
import Base64ToImage from './Base64ToImage';
export default {
    name: 'Index',
    components: {
        Tabs,
        TabPan: Tabs.TabPane,
        ImgToBase64,
        ImgUrlToBase64,
        Base64ToImage
    },
};
</script>

<style lang="less">
.v-index-page {
    .p(@gap-md);
}
</style>
