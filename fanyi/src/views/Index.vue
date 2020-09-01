<template>
    <div class="v-index-page">
        <Divider orientation="center">示例项目</Divider>
        <div class="desc">本项目为示例项目，主要包含基本的框架封装。可以零基础直接进行插件的开发。内置包含 "ant-design-vue" 组件库，方便快速构建界面。</div>
        <Divider orientation="left">AntdV基础组件展示</Divider>
        <div class="components-list">
            <Button>按钮</Button>
            <Icon type="smile" theme="twoTone" style="fontSize: 25px;" />
        </div>
    </div>
</template>

<script>
import { Button, Divider, Icon } from 'ant-design-vue';
import PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.js');
const url = 'http://image.uiseed.cn/python.pdf';
var USE_ONLY_CSS_ZOOM = true;
var TEXT_LAYER_MODE = 0; // DISABLE
var MAX_IMAGE_SIZE = 1024 * 1024;
var CMAP_URL = '../../node_modules/pdfjs-dist/cmaps/';
var CMAP_PACKED = true;
export default {
    name: 'Index',
    components: {
        Button,
        Divider,
        Icon,
    },
    created() {
        const loadingTask = PDFJS.getDocument({
            url: url,
            maxImageSize: MAX_IMAGE_SIZE,
            cMapUrl: CMAP_URL,
            cMapPacked: CMAP_PACKED,
        });
        console.log(loadingTask);
        loadingTask.promise.then(
            function (pdfDocument) {
                // Document loaded, specifying document for the viewer.
                self.pdfDocument = pdfDocument;
                self.pdfViewer.setDocument(pdfDocument);
                self.pdfLinkService.setDocument(pdfDocument);
                self.pdfHistory.initialize({ fingerprint: pdfDocument.fingerprint });

                self.loadingBar.hide();
                self.setTitleUsingMetadata(pdfDocument);
            },
            function (exception) {
                var message = exception && exception.message;
                var l10n = self.l10n;
                var loadingErrorMessage;

                if (exception instanceof PDFJS.InvalidPDFException) {
                    // change error message also for other builds
                    loadingErrorMessage = l10n.get(
                        'invalid_file_error',
                        null,
                        'Invalid or corrupted PDF file.'
                    );
                } else if (exception instanceof PDFJS.MissingPDFException) {
                    // special message for missing PDFs
                    loadingErrorMessage = l10n.get(
                        'missing_file_error',
                        null,
                        'Missing PDF file.'
                    );
                } else if (exception instanceof PDFJS.UnexpectedResponseException) {
                    loadingErrorMessage = l10n.get(
                        'unexpected_response_error',
                        null,
                        'Unexpected server response.'
                    );
                } else {
                    loadingErrorMessage = l10n.get(
                        'loading_error',
                        null,
                        'An error occurred while loading the PDF.'
                    );
                }

                loadingErrorMessage.then(function (msg) {
                    self.error(msg, { message: message });
                });
                self.loadingBar.hide();
            }
        );
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
    .components-list {
        .flex();
        align-items: center;
    }
}
</style>
