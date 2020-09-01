<template>
    <div>
        <pdf :src="url" :page="1"></pdf>
    </div>
</template>

<script>
import pdf from 'vue-pdf';
export default {
    name: 'PdfViewTwo',
    components: {
        pdf,
    },
    data() {
        return {
            url: '',
        };
    },
    methods: {
        initView(url) {
            this.url = url;
        },
    },
};
</script>

<style lang="less" scoped>

</style>
