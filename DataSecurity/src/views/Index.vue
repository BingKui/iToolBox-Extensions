<template>
    <div class="v-index-page">
        <Tabs value="base64">
            <TabPane label="Base64" name="base64">
                <Base64 />
            </TabPane>
            <TabPane label="MD5" name="md5">
                <MD5 />
            </TabPane>
            <TabPane label="Sha1" name="sha1">
                <Sha1 />
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { Tabs, TabPane } from 'view-design';
import Base64 from './Base64';
import MD5 from './MD5';
import Sha1 from './Sha1';
export default {
    name: 'Index',
    components: {
        Tabs,
        TabPane,
        Base64,
        MD5,
        Sha1,
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
