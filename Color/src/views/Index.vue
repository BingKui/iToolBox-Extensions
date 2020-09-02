<template>
    <div class="v-index-page">
        <Tabs default-active-key="transform">
            <TabPane tab="颜色转换" key="transform">
                <Transform />
            </TabPane>
            <TabPane tab="UI库颜色" key="libtheme">
                <LibTheme />
            </TabPane>
            <TabPane tab="中国色" key="china">
                <China />
            </TabPane>
            <!-- <TabPane label="主题色生成" name="theme">主题色生成</TabPane> -->
            <!-- <TabPane label="渐变色" name="gradient">渐变色</TabPane> -->
        </Tabs>
    </div>
</template>

<script>
import { Tabs, TabPane } from 'ant-design-vue';
import Transform from './Transform';
import LibTheme from './LibTheme';
import China from './China';
export default {
    name: 'Index',
    components: {
        Tabs,
        TabPane: Tabs.TabPane,
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
