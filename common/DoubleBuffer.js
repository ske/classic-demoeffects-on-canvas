"use strict";
var DoubleBuffer = (function () {
    function DoubleBuffer(w, h) {
        this.visibleIndex = 0;
        this.activeIndex = 0;
        this.w = w;
        this.h = h;
        this.buffer1 = new ImageData(w, h);
        this.buffer2 = new ImageData(w, h);
    }
    DoubleBuffer.prototype.setVisible = function (idx) {
        this.visibleIndex = idx;
    };
    DoubleBuffer.prototype.setActive = function (idx) {
        this.activeIndex = idx;
    };
    DoubleBuffer.prototype.SwapBuffers = function () {
        var idx = this.visibleIndex;
        this.visibleIndex = this.activeIndex;
        this.activeIndex = idx;
    };
    DoubleBuffer.prototype.clearBuffer = function () {
        if (this.activeIndex == 0) {
            this.buffer1 = new ImageData(this.w, this.h);
        }
        else {
            this.buffer2 = new ImageData(this.w, this.h);
        }
    };
    DoubleBuffer.prototype.getActive = function () {
        if (this.activeIndex == 0) {
            return this.buffer1;
        }
        else {
            return this.buffer2;
        }
    };
    DoubleBuffer.prototype.getVisible = function () {
        if (this.visibleIndex == 0) {
            return this.buffer1;
        }
        else {
            return this.buffer2;
        }
    };
    return DoubleBuffer;
}());
//# sourceMappingURL=DoubleBuffer.js.map