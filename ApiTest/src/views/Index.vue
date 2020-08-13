<template>
    <div>
        API 测试
        <button @click="addDbItem">添加项</button>
    </div>
</template>

<script>
const iTools = window.iTools;
export default {
    name: 'Index',
    methods: {
        addDbItem() {
            iTools.addItem('test-db', {
                title: '新数据',
                name: 'hehe',
            }).then(flag => {
                if (flag) {
                    alert('添加成功！');
                } else {
                    alert('添加失败');
                }
            });
        },
    },
};
</script>

<style lang="less">

</style>
