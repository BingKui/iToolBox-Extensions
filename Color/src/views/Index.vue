<template>
    <div class="v-index-page">
        <Tabs value="transform">
            <TabPane label="颜色转换" name="transform">
                <Transform />
            </TabPane>
            <TabPane label="UI库颜色" name="libtheme">
                <LibTheme />
            </TabPane>
            <TabPane label="中国色" name="china">
                <China />
            </TabPane>
            <!-- <TabPane label="主题色生成" name="theme">主题色生成</TabPane> -->
            <!-- <TabPane label="渐变色" name="gradient">渐变色</TabPane> -->
        </Tabs>
    </div>
</template>

<script>
import { Tabs, TabPane } from 'view-design';
import Transform from './Transform';
import LibTheme from './LibTheme';
import China from './China';
export default {
    name: 'Index',
    components: {
        Tabs,
        TabPane,
        Transform,
        LibTheme,
        China,
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
