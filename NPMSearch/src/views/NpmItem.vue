<template>
    <div class="npm-item">
        <div class="npm-name">{{info.name}}<Tag class="npm-version" color="blue">{{info.version}}</Tag></div>
        <div class="npm-desc">{{info.description}}</div>
        <div class="npm-keywords" v-if="info.keywords">
            <Tag class="keywords-item" v-for="(item, index) in info.keywords" :key="index">{{item}}</Tag>
        </div>
        <!-- <div class="npm-version">version:{{info.version}}</div> -->
        <div class="npm-update-date"><Icon class="date-icon" type="calendar" />{{dateValue}}</div>
        <div class="action-container">
            <Button class="action-item" type="primary" icon="copy" @click.stop="copyInstallCommand" />
            <!-- <Icon type="github" @click.stop="openInGithub" /> -->
            <!-- <Icon type="link" @click.stop="openInBrowser" /> -->
        </div>
    </div>
</template>

<script>
import { Button, Tag, Icon } from 'ant-design-vue';
import { formatData } from '@common/format';
import { copyText } from '@common/itoolbox';
import { TipSuccess, TipError } from '@common/tip';
export default {
    name: 'NpmItem', // npm 单项
    components: {
        Button,
        Tag,
        Icon,
    },
    props: {
        info: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        dateValue() {
            return formatData(this.$props.date);
        },
    },
    methods: {
        async copyInstallCommand() {
            const { info } = this.$props;
            const flag = await copyText(`npm i ${info.name}`);
            flag ? TipSuccess('复制安装命令成功') : TipError('复制安装命令失败');
        },
        async openInBrowser() {},
    },
};
</script>

<style lang="less">
.npm-item {
    border-radius: @border-radius;
    box-shadow: 0 2px 8px rgba(0,0,0,.09);
    .p(@gap-md);
    .m(@gap-md);
    position: relative;
    .npm-name {
        font-size: 20px;
        font-weight: 600;
        color: rgba(0,0,0,.9);
        .flex();
        align-items: center;
        .npm-version {
            .m-l(@gap-md);
            font-weight: 400;
        }
    }
    .npm-desc {
        font-size: @font-size;
        color: rgba(0,0,0,.6)
    }
    .npm-keywords {
        .m-t(@gap-sm);
        .keywords-item {
            .m-b(@gap-sm);
        }
    }
    .npm-update-date {
        .flex();
        align-items: center;
        height: 24px;
        line-height: 24px;
        color: @text-color;
        .date-icon {
            height: 24px;
            .m-r(@gap);
            .m-t(4px);
        }
    }
    .action-container {
        position: absolute;
        right: @gap;
        top: @gap;
        display: none;
    }
    &:hover {
        .action-container {
            display: block;
        }
    }
}
</style>
