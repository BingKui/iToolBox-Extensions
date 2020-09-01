<template>
  <div class="pdf-view" id="wrapper">
    <!--功能按钮区-->
    <div class="text-center pdf-toolbar" style="flex: 0 1 auto;">
        <Button @click="onPrevPage">上一页</Button>
        <Button @click="onNextPage">下一页</Button>
        <Button @click="onZoomIn">放大</Button>
        <Button @click="onZoomOut">缩小</Button>
        <Button @click="onZoomFit">还原</Button>
        <span>{{pageNum}} / {{pageCount}}</span>
      <div class="btn-group">
        <!-- <button id="prev" class="btn btn-white">
          <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
          <span class="hidden-xs">上一页</span>
        </button>
        <button id="next" class="btn btn-white">
          <span class="hidden-xs">下一页</span>
          <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
        </button>
        <button id="zoomin" class="btn btn-white">
          <i class="ivu-icon ivu-icon-ios-add-circle-outline"></i>
          <span class="hidden-xs">放大</span>
        </button>
        <button id="zoomout" class="btn btn-white">
          <i class="ivu-icon ivu-icon-ios-remove-circle-outline"></i>
          <span class="hidden-xs">缩小</span>
        </button>
        <button id="zoomfit" class="btn btn-white">
          <i class="ivu-icon ivu-icon-md-locate" style="font-size: 17px;"></i>
          <span class="hidden-xs">还原</span>
        </button> -->
        <!-- <div class="input-group">
          <input type="text" class="form-control" id="page_num" />
          <div class="input-group-btn">
            <button type="button" class="btn btn-white" id="page_count">/</button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="content-container">
      <div id="pdf-mark-wrapper" style="display: inline-block;position: relative;">
        <canvas id="the-canvas" class="pdfcanvas border-left-right border-top-bottom"></canvas>
      </div>
    </div>
    <!--PDF显示区-->
    <div class="text-center m-t-md pdf-div" style="flex: 1 1 auto;overflow: scroll;">
    </div>
  </div>
</template>

<script>
import { Button } from 'view-design';
import PDFJS from 'pdfjs-dist';
PDFJS.disableWorker = true;
export default {
    name: 'PdfView',
    components: {
        Button,
    },
    data() {
        return {
            pdfDoc: null, //PDF文档
            pageNum: 1, //当前页数
            pageCount: 1,
            pageRendering: false, //加载开关
            pageNumPending: null, //分页
            scale: 1.5, //缩放比例
            zoomRange: 0.2 //比例变化范围
        };
    },
    mounted() {
        // document.getElementById('prev').addEventListener('click', this.onPrevPage);
        // document.getElementById('next').addEventListener('click', this.onNextPage);
        // document
        //     .getElementById('page_num')
        //     .addEventListener('change', this.onChangePage);
        // document.getElementById('zoomin').addEventListener('click', this.onZoomIn);
        // document
        //     .getElementById('zoomout')
        //     .addEventListener('click', this.onZoomOut);
        // document
        //     .getElementById('zoomfit')
        //     .addEventListener('click', this.onZoomFit);
    },
    methods: {
    /**
     * 异步加载 PDF.
     */
        initPDF(pdfPath) {
            const self = this;
            PDFJS.getDocument(pdfPath).then(function(pdfDoc_) {
                self.pdfDoc = pdfDoc_;
                this.pageCount = pdfDoc_.numPages;
                self.renderPage(self.pageNum, self.scale);
            });
        },
        /**
     * 解析 PDF.
     */
        renderPage(num, scale) {
            const self = this;
            this.pageRendering = true;
            // Using promise to fetch the page
            this.pdfDoc.getPage(num).then(function(page) {
                const canvas = document.getElementById('the-canvas');
                const ctx = canvas.getContext('2d');
                let viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                let renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                let renderTask = page.render(renderContext);

                // Wait for rendering to finish
                renderTask.promise.then(function() {
                    let pdfHeight = document.getElementById('the-canvas').offsetHeight;
                    self.$emit('onPdfHeightChange', pdfHeight);
                    self.pageRendering = false;
                    if (self.pageNumPending !== null) {
                        // New page rendering is pending
                        self.renderPage(this.pageNumPending);
                        self.pageNumPending = null;
                    }
                });
            });
            // Update page counters
            // document.getElementById('page_num').value = num;
        },

        /**
     * 等待一个页面加载完成, 否则立即加载
     */
        queueRenderPage(num) {
            if (this.pageRendering) {
                this.pageNumPending = num;
            } else {
                this.renderPage(num, this.scale);
            }
        },

        /**
     * Displays previous page.
     */
        onPrevPage() {
            if (this.pageNum <= 1) {
                return;
            }
            this.pageNum--;
            let scale = this.pdfDoc.scale;
            this.queueRenderPage(this.pageNum, scale);
        },

        /**
     * Displays next page.
     */
        onNextPage() {
            if (this.pageNum >= this.pdfDoc.numPages) {
                return;
            }
            this.pageNum++;
            let scale = this.pdfDoc.scale;
            this.queueRenderPage(this.pageNum, scale);
        },
        /**
     * Zoom in page.
     */
        onZoomIn() {
            if (this.scale >= this.pdfDoc.scale) {
                return;
            }
            this.scale += this.zoomRange;
            let num = this.pageNum;
            this.renderPage(num, this.scale);
        },

        /**
     * Zoom out page.
     */
        onZoomOut() {
            if (this.scale >= this.pdfDoc.scale) {
                return;
            }
            this.scale -= this.zoomRange;
            let num = this.pageNum;
            this.queueRenderPage(num, this.scale);
        },
        /**
     * Zoom fit page.
     */
        onZoomFit() {
            if (this.scale >= this.pdfDoc.scale) {
                return;
            }
            this.scale = 1.5;
            let num = this.pageNum;
            this.queueRenderPage(num, this.scale);
        },
        /**
     * change num page.
     */
        onChangePage() {
            let value = document.getElementById('page_num').value;
            this.pageNum = parseInt(value);
            if (this.pageNum > 0 && this.pageNum <= this.pdfDoc.numPages) {
                this.queueRenderPage(this.pageNum, this.scale);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.pdf-view {
    width: 100%;
    // height: 100vh;
    // position: fixed;
    top: 0;
    background-color: #eee;
    overflow: hidden;
    .pdf-toolbar {
        height: 100px;
        overflow: hidden;
        .flex();
    }
    .content-container {
        .flex-center();
    }
    // #the-canvas {
    //     width: 100%;
    //     height: 100%;
    // }
}
</style>
